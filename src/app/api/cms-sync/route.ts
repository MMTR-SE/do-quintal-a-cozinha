import { NextRequest, NextResponse } from "next/server";

import { removerDoPostgres, syncCmsContent, type CmsCollection } from "@/lib/cms-sync";

/**
 * Sincroniza o conteudo do CMS (Strapi) para o Postgres do site.
 *
 * POST /api/cms-sync                              -> sincroniza tudo
 * POST /api/cms-sync {collection: "produtos"}     -> sincroniza uma colecao
 * POST /api/cms-sync {action: "delete", ...}      -> remove do Postgres o item
 *                                                    apagado no CMS
 *
 * A autenticacao e feita pelo middleware (header API_KEY). Usado pelos
 * lifecycle hooks do CMS ao criar/atualizar/publicar/remover conteudo.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type CorpoSincronizacao = {
  collection?: CmsCollection;
  action?: "delete";
  site_id?: string | null;
  documentId?: string | null;
};

export async function POST(request: NextRequest) {
  let body: CorpoSincronizacao = {};

  try {
    const json = await request.json();
    if (json && typeof json === "object") body = json as CorpoSincronizacao;
  } catch {
    // sem corpo JSON: sincroniza tudo
  }

  const collection = body.collection;

  try {
    if (body.action === "delete") {
      if (!collection) {
        return NextResponse.json(
          { ok: false, error: "collection obrigatoria para remocao" },
          { status: 400 }
        );
      }

      const removidos = await removerDoPostgres(collection, {
        siteId: body.site_id ?? undefined,
        documentId: body.documentId ?? undefined,
      });

      console.log(`[cms-sync] remocao em ${collection}: ${removidos} registro(s)`);
      return NextResponse.json({ ok: true, action: "delete", collection, removidos });
    }

    const stats = await syncCmsContent(collection);
    return NextResponse.json({ ok: true, collection: collection ?? "all", stats });
  } catch (error) {
    console.error("[cms-sync] falha:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "erro desconhecido" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Use POST para sincronizar o CMS" }, { status: 405 });
}
