import { NextRequest, NextResponse } from "next/server";

import { syncCmsContent, type CmsCollection } from "@/lib/cms-sync";

/**
 * Sincroniza o conteudo do CMS (Strapi) para o Postgres do site.
 *
 * POST /api/cms-sync            -> sincroniza tudo
 * POST /api/cms-sync {collection: "produtos"} -> sincroniza uma colecao
 *
 * A autenticacao e feita pelo middleware (header API_KEY). Usado pelos
 * lifecycle hooks do CMS ao criar/atualizar/publicar/remover conteudo.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  let collection: CmsCollection | undefined;

  try {
    const body = await request.json();
    if (body?.collection) collection = body.collection;
  } catch {
    // sem corpo JSON: sincroniza tudo
  }

  try {
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
