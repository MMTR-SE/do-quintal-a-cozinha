/**
 * produto controller
 *
 * O campo `produtora` virou uma relacao (colecao Produtora) para dar o seletor
 * com criacao on-the-fly no admin. So que o site em PRODUCAO ainda roda uma
 * versao antiga, que faz `name: produtora || 'MMTR-SE'` e renderiza o objeto
 * direto - resultado: "Minified React error #31" e a listagem de produtos fora
 * do ar.
 *
 * Enquanto producao nao for atualizada, a API REST (e so ela: o admin usa o
 * content-manager, entao o seletor continua funcionando) devolve `produtora`
 * achatada no nome, que e o formato que os consumidores antigos esperam.
 *
 * Quando producao rodar o codigo novo, este shim pode sair.
 */

import { factories } from '@strapi/strapi';

const flattenProdutora = (data: any) => {
  const items = Array.isArray(data) ? data : [data];

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;

    const produtora = item.produtora;
    if (produtora && typeof produtora === 'object') {
      item.produtora = produtora.nome ?? produtora.name ?? null;
    }
  }

  return data;
};

export default factories.createCoreController('api::produto.produto', ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);
    flattenProdutora(response?.data);
    return response;
  },

  async findOne(ctx) {
    const response = await super.findOne(ctx);
    flattenProdutora(response?.data);
    return response;
  },
}));
