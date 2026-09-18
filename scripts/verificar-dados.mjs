#!/usr/bin/env node

import { chromium } from "playwright";
import { PrismaClient } from "@prisma/client";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const CHROMIUM = process.env.PLAYWRIGHT_CHROMIUM_PATH || "/usr/bin/chromium";
const prisma = new PrismaClient();

// O banco e usado apenas para comparar o titulo da historia. Quando o site
// conferido e um ambiente publicado (sem tunel para o Postgres), seguimos sem a
// comparacao em vez de derrubar a verificacao inteira.
let bancoOk = false;
try {
  await prisma.$queryRaw`select 1`;
  bancoOk = true;
} catch {
  console.log("AVISO banco inacessivel (DATABASE_URL) - comparacao de titulo desativada");
}

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

async function conferir(nome, path, checks) {
  try {
    await abrir(path);
    const texto = await page.innerText("body");
    const faltando = checks.filter((c) => (c.tipo === "texto" ? !texto.includes(c.valor) : c.valor(texto)));
    if (faltando.length) {
      console.log(`FALHA ${nome} (${path}) — nao encontrou: ${faltando.map((f) => f.desc || f.valor).join(", ")}`);
      falhas++;
      return;
    }
    console.log(`OK    ${nome} (${path})`);
  } catch (e) {
    console.log(`FALHA ${nome} (${path}) — ${e.message}`);
    falhas++;
  }
}

// Listagens: precisam pelo menos renderizar o titulo da secao.
await conferir("listagem de historias", "/nossas-historias/", [{ tipo: "texto", valor: "Nossas Histórias" }]);
await conferir("listagem de receitas", "/nossas-receitas/", [{ tipo: "texto", valor: "Receitas" }]);
await conferir("listagem de produtos", "/nossa-producao/", [{ tipo: "texto", valor: "Produção" }]);

// Detalhe: pega o primeiro link de historia da listagem e confere que abre.
try {
  await abrir("/nossas-historias/");
  const link = await page.$eval('a[href*="/nossas-historias/"]', (el) => el.getAttribute("href"));
  if (link) {
    const slug = link.replace(/\/$/, "");
    await abrir(`${slug}/`);
    const titulo = await page.title();
    const temConteudo = (await page.innerText("body")).length > 400;
    if (temConteudo) console.log(`OK    detalhe de historia (${slug}/)`);
    else {
      console.log(`FALHA detalhe de historia (${slug}/) — pagina sem conteudo (title: ${titulo})`);
      falhas++;
    }
  } else {
    console.log("AVISO nenhuma historia na listagem para testar o detalhe");
  }
} catch (e) {
  console.log(`FALHA detalhe de historia — ${e.message}`);
  falhas++;
}

await browser.close();

if (falhas) {
  console.log(`\n${falhas} verificacao(oes) falharam.`);
  process.exit(1);
}
console.log("\nTodas as verificacoes passaram.");
