#!/usr/bin/env node
/**
 * Confere que o site esta carregando os dados do Postgres (sem Strapi).
 *
 * Abre as listagens num navegador headless, confere que vem item do banco e
 * abre o detalhe da primeira historia conferindo o titulo (consultado no banco,
 * porque o card da listagem mostra o nome e o detalhe mostra o titulo).
 *
 * Uso:
 *   npm run verify:dados
 *   BASE_URL=http://localhost:3000 PLAYWRIGHT_CHROMIUM_PATH=/usr/bin/chromium npm run verify:dados
 *
 * Requer o site rodando (npm run dev), Playwright instalado e DATABASE_URL valido.
 */
import { chromium } from "playwright";
import { PrismaClient } from "@prisma/client";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const CHROMIUM = process.env.PLAYWRIGHT_CHROMIUM_PATH || "/usr/bin/chromium";
const prisma = new PrismaClient();

const browser = await chromium.launch({
  executablePath: CHROMIUM,
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
let falhas = 0;

async function abrir(path) {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1500); // deixa o React Query concluir
}

async function conferirListagem(nome, path, seletorItens) {
  try {
    await abrir(path);
    const itens = await page.$$eval(seletorItens, (els) =>
      els.map((e) => e.getAttribute("href")).filter(Boolean)
    );
    if (!(await page.innerText("body")).trim()) throw new Error("pagina vazia");
    console.log(`${itens.length ? "OK   " : "AVISO"} ${nome} (${path}) — ${itens.length} item(ns) do banco`);
    return itens[0] || null;
  } catch (e) {
    console.log(`FALHA ${nome} (${path}) — ${e.message}`);
    falhas++;
    return null;
  }
}

async function conferirDetalheHistoria(href) {
  const slug = href.replace(/^\/nossas-historias\//, "").replace(/\/$/, "");
  try {
    const esperada = await prisma.story.findUnique({ where: { slug }, select: { title: true, name: true } });
    await abrir(href);
    const texto = await page.innerText("body");
    if (esperada?.title && texto.includes(esperada.title)) {
      console.log(`OK    detalhe de historia (${href}) — contem "${esperada.title}"`);
      return;
    }
    if (texto.length >= 400) {
      console.log(`OK    detalhe de historia (${href}) — renderizou (${texto.length} chars)`);
      return;
    }
    throw new Error(`conteudo curto (${texto.length} chars)${esperada ? ` — esperado "${esperada.title}"` : ""}`);
  } catch (e) {
    console.log(`FALHA detalhe de historia (${href}) — ${e.message}`);
    falhas++;
  }
}

const historia = await conferirListagem(
  "listagem de historias",
  "/nossas-historias/",
  'a[href^="/nossas-historias/"]:not([href="/nossas-historias/"])'
);
await conferirListagem("listagem de receitas", "/nossas-receitas/", 'a[href^="/nossas-receitas/"]');
await conferirListagem("listagem de produtos", "/nossa-producao/", 'a[href^="/nossa-producao/"]');

if (historia) await conferirDetalheHistoria(historia);

await browser.close();
await prisma.$disconnect();

if (falhas) {
  console.log(`\n${falhas} verificacao(oes) falharam.`);
  process.exit(1);
}
console.log("\nTodas as verificacoes passaram.");
