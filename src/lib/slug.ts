/**
 * Normalizacao de texto para slug.
 *
 * Mantem o mesmo formato usado pelo backfill das historias
 * (prisma/scripts/backfill-slugs.js): minusculas, sem acentos e hifens no
 * lugar de qualquer caractere que nao seja letra ou numero.
 */
export function slugify(value: string | null | undefined): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Slug publico do produto: nome da produtora + nome do produto.
 *
 * Ex.: { produtora: "Dona Fatima", nome: "Mel de Engenho" }
 *      -> "dona-fatima-mel-de-engenho"
 *
 * Quando a produtora nao esta preenchida, o slug fica apenas com o nome do
 * produto.
 */
export function buildProductSlug({
  produtora,
  nome,
}: {
  produtora?: string | null;
  nome?: string | null;
}): string {
  return [slugify(produtora), slugify(nome)].filter(Boolean).join("-");
}
