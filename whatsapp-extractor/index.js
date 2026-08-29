#!/usr/bin/env node
/**
 * Extrator de conversas do WhatsApp (grupo único) + transcrição de áudio.
 *
 * Conecta no WhatsApp via Baileys (QR no primeiro uso), escuta as mensagens de
 * um grupo (filtro GROUP_NAME/GROUP_ID) e salva em data/conversas.jsonl.
 * Áudios são transcritos com Groq Whisper (whisper-large-v3-turbo) e o texto
 * entra no registro (campo "transcript").
 *
 * Para gerar conhecimento do que é falado no grupo: npm run knowledge
 * (usa Groq — modelo llama-3.3-70b-versatile).
 *
 * Variáveis de ambiente:
 *   GROUP_NAME     - parte do nome do grupo (recomendado: escutar UM grupo)
 *   GROUP_ID       - jid exato do grupo (alternativa ao GROUP_NAME)
 *   GROQ_API_KEY   - chave do Groq (obrigatória para transcrição/conhecimento)
 *   DATA_DIR       - pasta de dados (padrão: ./data)
 *   INCLUDE_SELF   - "1" para salvar também as próprias mensagens do bot
 *   LOG_LEVEL      - nível do pino (padrão: info)
 */
require("dotenv").config({ quiet: true });

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestWaWebVersion,
} = require("baileys");
const pino = require("pino");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { Groq } = require("groq-sdk");

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const AUTH_DIR = path.join(DATA_DIR, "auth");
const TMP_DIR = path.join(DATA_DIR, "tmp");
const OUTPUT = path.join(DATA_DIR, "conversas.jsonl");
const GROUP_ID = (process.env.GROUP_ID || "").trim();
const GROUP_NAME = (process.env.GROUP_NAME || "").trim();

fs.mkdirSync(AUTH_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });
// Garante que o arquivo de saída exista desde o início (permite tail -f antes da 1ª mensagem)
fs.closeSync(fs.openSync(OUTPUT, "a"));
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

// jid -> nome do grupo (populado ao conectar)
const groupNames = new Map();
let currentSock = null;

// Handlers de encerramento registrados UMA vez (não acumulam a cada reconexão)
process.on("SIGINT", () => { currentSock?.end(); process.exit(0); });
process.on("SIGTERM", () => { currentSock?.end(); process.exit(0); });

function messageText(msg) {
  const m = msg.message || {};
  if (m.audioMessage) return "";
  return (
    m.conversation ||
    m.extendedTextMessage?.text ||
    m.imageMessage?.caption ||
    m.videoMessage?.caption ||
    m.documentMessage?.title ||
    ""
  );
}

function convertToMp3(inPath, outPath) {
  return new Promise((resolve, reject) => {
    const ff = spawn(
      "ffmpeg",
      ["-y", "-i", inPath, "-f", "mp3", outPath, "-loglevel", "error"],
      { stdio: ["ignore", "ignore", "pipe"] }
    );
    let err = "";
    ff.stderr.on("data", (c) => (err += c));
    ff.on("error", reject);
    ff.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error("ffmpeg: " + err.slice(0, 200)))
    );
  });
}

async function transcribeAudio(sock, msg) {
  if (!groq) return null; // sem GROQ_API_KEY: áudio fica sem transcrição
  const tmpIn = path.join(TMP_DIR, `audio-${Date.now()}-${Math.random().toString(36).slice(2)}.ogg`);
  const tmpOut = tmpIn.replace(/\.ogg$/, ".mp3");
  try {
    const buffer = await sock.downloadMediaMessage(msg, "buffer", { logger });
    if (!buffer?.length) return null;
    fs.writeFileSync(tmpIn, buffer);

    let file = tmpIn;
    const mime = msg.message?.audioMessage?.mimetype || "";
    // Groq Whisper não aceita ogg/opus (formato comum do WhatsApp) — converte para mp3
    if (!/mpeg|mp4|m4a|wav|webm/i.test(mime)) {
      try {
        await convertToMp3(tmpIn, tmpOut);
        file = tmpOut;
      } catch (e) {
        logger.warn({ err: e.message }, "ffmpeg indisponível/falhou; enviando original");
      }
    }
    const r = await groq.audio.transcriptions.create({
      model: "whisper-large-v3-turbo",
      file: fs.createReadStream(file),
      language: "pt",
    });
    return r.text || null;
  } catch (e) {
    logger.warn({ err: e.message }, "falha ao transcrever áudio");
    return null;
  } finally {
    for (const f of [tmpIn, tmpOut]) fs.rmSync(f, { force: true });
  }
}

async function extractMessage(sock, key, msg, subject) {
  const jid = key.remoteJid;
  const isGroup = jid.endsWith("@g.us");
  const sender = isGroup ? key.participant || jid : jid;
  const ts = Number(msg.messageTimestamp || Date.now());
  const isAudio = !!msg.message?.audioMessage;

  let text = messageText(msg);
  let transcript = null;
  if (isAudio) {
    transcript = await transcribeAudio(sock, msg);
    text = transcript || "";
  }

  const media =
    msg.message?.imageMessage ||
    msg.message?.videoMessage ||
    msg.message?.audioMessage ||
    msg.message?.documentMessage ||
    msg.message?.stickerMessage;

  return {
    id: key.id,
    ts: new Date(ts * 1000).toISOString(),
    chat: subject,
    chatId: jid,
    isGroup,
    sender,
    type: Object.keys(msg.message || {})[0] || "unknown",
    text,
    transcript,
    hasMedia: !!media,
    fromMe: !!key.fromMe,
  };
}

function shouldCapture(jid, subject) {
  if (GROUP_ID && jid === GROUP_ID) return true;
  if (GROUP_NAME && subject && subject.toLowerCase().includes(GROUP_NAME.toLowerCase())) return true;
  return !GROUP_ID && !GROUP_NAME; // sem filtro: captura tudo
}

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestWaWebVersion({});

  const sock = makeWASocket({
    version,
    auth: state,
    logger: logger.child({ module: "baileys" }),
    browser: ["Extrator", "Desktop", "1.0"],
  });
  currentSock = sock;

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async ({ connection, qr, lastDisconnect }) => {
    if (qr) {
      console.clear();
      console.log("Escaneie o QR com o WhatsApp (Aparelhos conectados → Conectar um aparelho):\n");
      qrcode.generate(qr, { small: true });
      return;
    }
    if (connection === "open") {
      console.log("\n✓ Conectado!");
      try {
        const groups = await sock.groupFetchAllParticipating();
        console.log(`\nGrupos participantes (${Object.keys(groups).length}):`);
        for (const [jid, g] of Object.entries(groups)) {
          groupNames.set(jid, g.subject);
          const mark = shouldCapture(jid, g.subject) ? "  ← capturando" : "";
          console.log(`  - ${g.subject} (${jid})${mark}`);
        }
      } catch (e) {
        logger.warn({ err: e.message }, "Erro ao listar grupos");
      }
      const filtro = GROUP_ID || GROUP_NAME || "TODOS os grupos";
      console.log(`\nFiltro: ${filtro}`);
      console.log(`Salvando mensagens em: ${OUTPUT}`);
      if (!groq) console.log("GROQ_API_KEY não definida: áudios não serão transcritos (npm run knowledge também não funciona).");
      console.log("");
      return;
    }
    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      const loggedOut = code === DisconnectReason.loggedOut;
      console.log(loggedOut
        ? "\nPareamento removido. Delete a pasta data/auth e rode de novo para gerar novo QR."
        : `\nConexão fechada (código ${code}) — reconectando...`);
      if (!loggedOut) {
        sock.ev.removeAllListeners();
        start();
      } else process.exit(0);
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) {
      try {
        const key = msg.key;
        if (!key?.remoteJid || key.remoteJid === "status@broadcast") continue;
        if (key.fromMe && process.env.INCLUDE_SELF !== "1") continue;
        const isGroup = key.remoteJid.endsWith("@g.us");
        const subject = isGroup ? groupNames.get(key.remoteJid) || key.remoteJid : "DM";
        if (!shouldCapture(key.remoteJid, subject)) continue;

        const rec = await extractMessage(sock, key, msg, subject);
        fs.appendFileSync(OUTPUT, JSON.stringify(rec) + "\n");
        const who = rec.sender.split("@")[0];
        const suffix = rec.hasMedia ? " [mídia]" : "";
        const body = rec.transcript ? `(áudio) ${rec.transcript.slice(0, 150)}` : rec.text.slice(0, 150);
        console.log(`[${rec.ts}] ${rec.chat} · ${who}${suffix}: ${body}`);
      } catch (e) {
        logger.error({ err: e.message }, "erro ao processar mensagem");
      }
    }
  });
}

start().catch((e) => { console.error(e); process.exit(1); });
