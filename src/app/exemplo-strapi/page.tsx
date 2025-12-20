/**
 * Exemplo de página que consome dados do Strapi CMS
 * 
 * Esta página demonstra como integrar o Strapi com Next.js.
 * Para testá-la:
 * 
 * 1. Inicie o Strapi: npm run cms:dev
 * 2. Crie um Content Type chamado "produto" com os campos:
 *    - nome (Text)
 *    - descricao (Rich Text)
 *    - preco (Number - Decimal)
 * 3. Adicione alguns produtos no painel admin
 * 4. Em Settings → API Tokens, crie um token e adicione ao .env.local
 * 5. Acesse http://localhost:3000/exemplo-strapi
 */

import { getCollection } from '@/lib/strapi';

// Força revalidação a cada 60 segundos (ISR)
export const revalidate = 60;

interface Produto {
  id: number;
  documentId: string;
  nome: string;
  descricao: string | Record<string, unknown>; // Rich text pode ser string ou objeto
  preco: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default async function ExemploStrapiPage() {
  let produtos: Produto[] = [];
  let error: string | null = null;

  try {
    // Busca produtos do Strapi
    produtos = await getCollection('produtos');
  } catch (err) {
    error = err instanceof Error ? err.message : 'Erro ao buscar produtos';
    console.error('Erro ao buscar produtos do Strapi:', err);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Exemplo de Integração com Strapi</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Erro:</strong> {error}
          <p className="mt-2 text-sm">
            Certifique-se de que o Strapi está rodando (<code>npm run cms:dev</code>) 
            e que você criou o Content Type &quot;produto&quot;.
          </p>
        </div>
      )}

      {!error && produtos.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          <strong>Atenção:</strong> Nenhum produto encontrado.
          <p className="mt-2 text-sm">
            Acesse o painel administrativo do Strapi em{' '}
            <a href="http://localhost:1337/admin" className="underline" target="_blank" rel="noopener">
              http://localhost:1337/admin
            </a>{' '}
            e adicione alguns produtos.
          </p>
        </div>
      )}

      {produtos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{produto.nome}</h2>
              
              {produto.descricao && (
                <p className="text-gray-600 mb-4">
                  {typeof produto.descricao === 'string' 
                    ? produto.descricao 
                    : JSON.stringify(produto.descricao)}
                </p>
              )}
              
              {produto.preco && (
                <p className="text-lg font-bold text-green-600">
                  R$ {produto.preco.toFixed(2)}
                </p>
              )}
              
              <div className="mt-4 text-xs text-gray-400">
                ID: {produto.documentId}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Personalize os Content Types no Strapi conforme suas necessidades</li>
          <li>Configure permissões de acesso em Settings → Roles → Public</li>
          <li>Implemente busca, filtros e paginação usando a API do Strapi</li>
          <li>Adicione upload de imagens aos produtos</li>
          <li>Crie relações entre Content Types (ex: Produto → Categoria)</li>
        </ul>
      </div>

      <div className="mt-6 text-center">
        <a
          href="http://localhost:1337/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Abrir Painel Administrativo do Strapi
        </a>
      </div>
    </div>
  );
}
