/**
 * Sincroniza o CMS com o site (Postgres).
 *
 * O site le apenas o Postgres; o CMS e a interface de edicao. Ao criar/atualizar
 * o hook manda o site puxar o conteudo; ao apagar, manda o id do item removido
 * para o site apagar o registro correspondente.
 */
const SITE_URL = process.env.SITE_SYNC_URL;
const SITE_KEY = process.env.SITE_SYNC_API_KEY || process.env.API_KEY || "";

export type SincronizacaoPayload = {
  action?: "delete";
  collection?: "produtos" | "historias" | "receitas" | "produtoras";
  site_id?: string | null;
  documentId?: string | null;
};

export async function notificarSite(payload: SincronizacaoPayload = {}): Promise<void> {
  if (!SITE_URL) return;

  try {
    const res = await fetch(`${SITE_URL.replace(/\/$/, "")}/api/cms-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json", API_KEY: SITE_KEY },
      body: JSON.stringify(payload),
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
export function agendarSincronizacao(payload: SincronizacaoPayload = {}, delayMs = 2500): void {
  if (!SITE_URL) return;
  setTimeout(() => {
    void notificarSite(payload);
  }, delayMs);
}

/** Avisa o site que um item foi apagado no CMS (para apagar o registro la tambem). */
export function agendarRemocao(collection: SincronizacaoPayload["collection"], result: any): void {
  agendarSincronizacao(
    {
      action: "delete",
      collection,
      site_id: result?.site_id ?? null,
      documentId: result?.documentId ?? null,
    },
    1500
  );
}
