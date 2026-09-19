/**
 * Notifica o site para sincronizar o conteudo do CMS com o Postgres.
 *
 * O site le apenas o Postgres; quando algo muda no CMS (criado/atualizado/
 * publicado/removido), este hook avisa o site para sincronizar.
 */
const SITE_URL = process.env.SITE_SYNC_URL;
const SITE_KEY = process.env.SITE_SYNC_API_KEY || process.env.API_KEY || "";

export async function notificarSite(): Promise<void> {
  if (!SITE_URL) return;

  try {
    const res = await fetch(`${SITE_URL.replace(/\/$/, "")}/api/cms-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json", API_KEY: SITE_KEY },
      body: JSON.stringify({}),
    });
    if (!res.ok) {
      strapi.log.warn(`[cms-sync] site respondeu ${res.status}`);
    }
  } catch (error) {
    strapi.log.warn(
      `[cms-sync] nao foi possivel avisar o site: ${error instanceof Error ? error.message : error}`
    );
  }
}

/**
 * Agenda a sincronizacao com um pequeno atraso: o hook roda dentro do fluxo de
 * escrita do Strapi e o item pode ainda nao estar visivel na API REST quando o
 * evento dispara (o site acabava nao vendo o item recem-criado).
 */
export function agendarSincronizacao(delayMs = 2500): void {
  if (!SITE_URL) return;
  setTimeout(() => {
    void notificarSite();
  }, delayMs);
}
