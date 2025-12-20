/**
 * Cliente API do Strapi para integração com Next.js
 * 
 * Este módulo fornece funções para consumir a API REST do Strapi CMS.
 * Configure as variáveis de ambiente antes de usar:
 * - NEXT_PUBLIC_STRAPI_URL: URL base do Strapi (padrão: http://localhost:1337)
 * - STRAPI_API_TOKEN: Token de autenticação da API
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchAPIOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

/**
 * Função genérica para fazer requisições à API do Strapi
 * 
 * @param path - Caminho da API (ex: '/produtos', '/produtoras?populate=*')
 * @param options - Opções da requisição (método, body, cache, etc)
 * @returns Promise com os dados da resposta
 */
export async function fetchAPI(path: string, options: FetchAPIOptions = {}) {
  const { method = 'GET', body, cache, next } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Adiciona token de autenticação se disponível
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const url = `${STRAPI_URL}/api${path}`;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erro ao buscar dados do Strapi');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao fazer requisição para ${url}:`, error);
    throw error;
  }
}

/**
 * Funções helper para endpoints comuns
 */

/**
 * Busca múltiplos registros de uma collection
 */
export async function getCollection(
  collectionName: string,
  params: Record<string, string> = {}
) {
  const queryString = new URLSearchParams(params).toString();
  const path = `/${collectionName}${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetchAPI(path);
  return response.data;
}

/**
 * Busca um único registro por ID
 */
export async function getSingle(
  collectionName: string,
  id: string | number,
  params: Record<string, string> = {}
) {
  const queryString = new URLSearchParams(params).toString();
  const path = `/${collectionName}/${id}${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetchAPI(path);
  return response.data;
}

/**
 * Busca registros com populate automático de todas as relações
 */
export async function getCollectionPopulated(collectionName: string) {
  return getCollection(collectionName, { populate: '*' });
}

/**
 * Helper para formatar URLs de mídia do Strapi
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // Se já for uma URL completa, retorna como está
  if (url.startsWith('http')) {
    return url;
  }
  
  // Caso contrário, adiciona a URL base do Strapi
  return `${STRAPI_URL}${url}`;
}

/**
 * Exemplos de uso:
 * 
 * // Buscar todos os produtos
 * const produtos = await getCollection('produtos', { populate: '*' });
 * 
 * // Buscar produto específico
 * const produto = await getSingle('produtos', 1, { populate: '*' });
 * 
 * // Buscar com filtros
 * const produtosAtivos = await getCollection('produtos', {
 *   'filters[ativo][$eq]': true,
 *   populate: '*'
 * });
 * 
 * // URL de imagem
 * const imageUrl = getStrapiMedia(produto.attributes.imagem.data.attributes.url);
 */
