#!/usr/bin/env node
/**
 * Gera conhecimento a partir das conversas capturadas (data/conversas.jsonl).
 *
 * Roda: npm run knowledge
 * - Lê as mensagens novas (desde a última execução, controlado por
 *   data/knowledge-offset.txt), envia para o Groq (llama-3.3-70b-versatile) e
 *   anexa o resumo em data/conhecimento.md.
 *
 * Requer GROQ_API_KEY no ambiente (ou whatsapp-extractor/.env).
 */
require("dotenv").config({ quiet: true });

const fs = require("fs");
const path = require("path");
const { Groq } = require("groq-sdk");

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const INPUT = path.join(DATA_DIR, "conversas.jsonl");
const OUTPUT = path.join(DATA_DIR, "conhecimento.md");
const OFFSET = path.join(DATA_DIR, "knowledge-offset.txt");
const MAX_CONTEXT_CHARS = 12000;

if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY não definida. Configure em whatsapp-extractor/.env (ou export GROQ_API_KEY=...).");
  process.exit(1);
}
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function loadMessages() {
  if (!fs.existsSync(INPUT)) return [];
  return fs
    .readFileSync(INPUT, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try { return JSON.parse(l); } catch { return null; }
    })
    .filter(Boolean);
}

async function main() {
  const messages = loadMessages();
  if (!messages.length) {
    console.log(`Nenhuma mensagem em ${INPUT}. Rode o extrator (npm start) primeiro.`);
    return;
  }

  const offset = fs.existsSync(OFFSET) ? Number(fs.readFileSync(OFFSET, "utf8")) || 0 : 0;
  const novas = messages
    .filter((m) => new Date(m.ts).getTime() > offset)
    .sort((a, b) => a.ts.localeCompare(b.ts));

  if (!novas.length) {
    console.log("Nenhuma mensagem nova desde a última geração de conhecimento.");
    return;
  }

  let contexto = "";
  for (const m of novas) {
    const quem = String(m.sender || "").split("@")[0] || "?";
    const conteudo = (m.transcript || m.text || "").slice(0, 500);
    const linha = `[${m.ts}] ${m.chat} · ${quem}: ${conteudo}`;
    if (contexto.length + linha.length > MAX_CONTEXT_CHARS) break;
    contexto += linha + "\n";
  }

  const prompt =
    "Você é um analista de um grupo de WhatsApp de mulheres agricultoras (movimento rural). " +
    "Abaixo estão as mensagens capturadas. Extraia o CONHECIMENTO gerado: temas discutidos, " +
    "decisões tomadas, pedidos/necessidades, nomes de pessoas citadas, datas/eventos e " +
    "próximos passos. Responda em português, em tópicos objetivos, SEM inventar informações. " +
    "Se não houver conteúdo relevante, diga isso explicitamente.\n\n" +
    "Mensagens:\n" + contexto;

  console.log(`Gerando conhecimento a partir de ${novas.length} mensagens...`);
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "Analista de conhecimento de grupo de WhatsApp." },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  const resumo = completion.choices?.[0]?.message?.content || "(sem resposta)";
  const ultimaTs = novas[novas.length - 1].ts;
  const bloco = `\n## Conhecimento gerado em ${new Date().toISOString()}\nMensagens consideradas: até ${ultimaTs}\n\n${resumo}\n`;

  fs.appendFileSync(OUTPUT, bloco);
  fs.writeFileSync(OFFSET, String(new Date(ultimaTs).getTime()));
  console.log(`✓ Conhecimento anexado em ${OUTPUT}`);
  console.log(`\n--- Resumo ---\n${resumo.slice(0, 600)}${resumo.length > 600 ? "..." : ""}`);
}

main().catch((e) => { console.error("Erro:", e.message); process.exit(1); });
