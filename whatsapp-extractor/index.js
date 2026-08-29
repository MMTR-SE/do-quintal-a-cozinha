#!/usr/bin/env node
/**
 * Extrator de conversas do WhatsApp (sem IA).
 *
 * Conecta no WhatsApp via Baileys (QR no primeiro uso), lista os grupos
 * participantes e salva as mensagens recebidas em data/conversas.jsonl.
 *
 * Variáveis de ambiente (opcionais):
 *   GROUP_ID     - jid exato do grupo (ex.: 5531999999999-1234567890@g.us)
 *   GROUP_NAME   - parte do nome do grupo (substring, case-insensitive)
 *   DATA_DIR     - pasta de dados (padrão: ./data)
 *   INCLUDE_SELF - "1" para salvar também as próprias mensagens do bot
 *   LOG_LEVEL    - nível do pino (padrão: info)
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

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const AUTH_DIR = path.join(DATA_DIR, "auth");
const OUTPUT = path.join(DATA_DIR, "conversas.jsonl");
const GROUP_ID = (process.env.GROUP_ID || "").trim();
const GROUP_NAME = (process.env.GROUP_NAME || "").trim();

fs.mkdirSync(AUTH_DIR, { recursive: true });
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

// jid -> nome do grupo (populado ao conectar)
const groupNames = new Map();

function messageText(msg) {
  const m = msg.message || {};
  if (m.audioMessage) return "[áudio]";
  return (
    m.conversation ||
    m.extendedTextMessage?.text ||
    m.imageMessage?.caption ||
    m.videoMessage?.caption ||
    m.documentMessage?.title ||
    ""
  );
}

function extractMessage(key, msg, subject) {
  const jid = key.remoteJid;
  const isGroup = jid.endsWith("@g.us");
  const sender = isGroup ? key.participant || jid : jid;
  const ts = Number(msg.messageTimestamp || Date.now());
  return {
    id: key.id,
    ts: new Date(ts * 1000).toISOString(),
    chat: subject,
    chatId: jid,
    isGroup,
    sender,
    type: Object.keys(msg.message || {})[0] || "unknown",
    text: messageText(msg),
    hasMedia: !!(msg.message?.imageMessage || msg.message?.videoMessage || msg.message?.audioMessage || msg.message?.documentMessage || msg.message?.stickerMessage),
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

  process.on("SIGINT", () => { sock.end(); process.exit(0); });
  process.on("SIGTERM", () => { sock.end(); process.exit(0); });

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
      console.log(`\nFiltro: ${filtro}\nSalvando mensagens em: ${OUTPUT}\n`);
      return;
    }
    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      const loggedOut = code === DisconnectReason.loggedOut;
      console.log(loggedOut
        ? "\nPareamento removido. Delete a pasta data/auth e rode de novo para gerar novo QR."
        : `\nConexão fechada (código ${code}) — reconectando...`);
      if (!loggedOut) start();
      else process.exit(0);
    }
  });

  sock.ev.on("messages.upsert", ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) {
      const key = msg.key;
      if (!key?.remoteJid || key.remoteJid === "status@broadcast") continue;
      if (key.fromMe && process.env.INCLUDE_SELF !== "1") continue;
      const isGroup = key.remoteJid.endsWith("@g.us");
      const subject = isGroup ? groupNames.get(key.remoteJid) || key.remoteJid : "DM";
      if (!shouldCapture(key.remoteJid, subject)) continue;

      const rec = extractMessage(key, msg, subject);
      fs.appendFileSync(OUTPUT, JSON.stringify(rec) + "\n");
      const who = rec.sender.split("@")[0];
      const suffix = rec.hasMedia ? " [mídia]" : "";
      console.log(`[${rec.ts}] ${rec.chat} · ${who}${suffix}: ${rec.text.slice(0, 150)}`);
    }
  });
}

start().catch((e) => { console.error(e); process.exit(1); });
