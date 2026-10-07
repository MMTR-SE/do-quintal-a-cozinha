/**
 * Normaliza o campo `ingredients` da receita.
 *
 * O campo e `Json` no banco e a convencao do site e guardar a lista como string
 * JSON (`JSON.stringify(array)`) — e o que o seed, a API e a sincronizacao com o
 * CMS fazem. Conteudo antigo, porem, aparece em outros formatos: a string JSON
 * de uma string (codificacao dupla, que fazia a tela renderizar um caractere por
 * linha) ou o texto com um ingrediente por linha. Aceitar todos eles evita que a
 * tela quebre por causa de um registro gravado errado.
 */

const listaDeTexto = (valor: unknown): string[] => {
  if (valor === null || valor === undefined) return [];

  if (Array.isArray(valor)) {
    return valor
      .flatMap((item) => (Array.isArray(item) ? listaDeTexto(item) : [String(item)]))
      .map((item) => item.trim())
      .filter((item) => item !== "");
  }

  if (typeof valor === "object") {
    return listaDeTexto(Object.values(valor as Record<string, unknown>));
  }

  // Texto: um ingrediente por linha (ou separado por `;`).
  return String(valor)
    .split(/\r?\n|;/)
    .map((item) => item.trim())
    .filter((item) => item !== "");
};

/**
 * Devolve sempre uma lista de ingredientes, seja qual for o formato gravado:
 * array, string JSON de array, string JSON de string (dupla codificacao) ou
 * texto com um ingrediente por linha.
 */
export function parseIngredients(valor: unknown): string[] {
  let atual: unknown = valor;

  // Desembrulha strings JSON (inclusive quando ha mais de uma codificacao).
  for (let volta = 0; volta < 4 && typeof atual === "string"; volta++) {
    const texto = atual.trim();
    if (!texto.startsWith("[") && !texto.startsWith('"')) break;

    try {
      const decodificado: unknown = JSON.parse(texto);
      if (decodificado === atual) break;
      atual = decodificado;
    } catch {
      break;
    }
  }

  return listaDeTexto(atual);
}

/**
 * Formato canonico gravado no banco: string JSON com a lista de ingredientes.
 * Usar sempre esta funcao ao gravar evita a codificacao dupla.
 */
export function serializeIngredients(valor: unknown): string {
  return JSON.stringify(parseIngredients(valor));
}
