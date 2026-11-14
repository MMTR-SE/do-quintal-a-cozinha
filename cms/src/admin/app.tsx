import ptBR from './extensions/translations/pt-BR.json';


export default {
  config: {
    locales: ['pt-BR'],
    translations: {
      'pt-BR': {
        ...ptBR,
        'plugin.name': 'Painel MMTR-SE',
        Users: "Companheiras",
        User: "Companheira",
      
        // Rótulos dos campos: as chaves seguem o formato
        // content-manager.content-types.<uid>.<campo> e precisam bater com os
        // nomes dos atributos em src/api/*/content-types/*/schema.json.
        // O campo site_id não é traduzido de propósito: é técnico (liga o item
        // ao Postgres do site) e não deve ser editado à mão.

        // Produtos
        'content-manager.content-types.api::produto.produto.Nome': 'Nome do produto',
        'content-manager.content-types.api::produto.produto.descricao': 'Descrição',
        'content-manager.content-types.api::produto.produto.preco': 'Preço',
        'content-manager.content-types.api::produto.produto.categoria': 'Categoria',
        'content-manager.content-types.api::produto.produto.produtora': 'Produtora',
        'content-manager.content-types.api::produto.produto.imagem': 'Imagens',
        'content-manager.content-types.api::produto.produto.telefone': 'Telefone para contato',

        // Produtoras
        'content-manager.content-types.api::produtora.produtora.nome': 'Nome da produtora',
        'content-manager.content-types.api::produtora.produtora.telefone': 'Telefone',
        'content-manager.content-types.api::produtora.produtora.instagram': 'Instagram',
        'content-manager.content-types.api::produtora.produtora.produtos': 'Produtos',

        // Histórias
        'content-manager.content-types.api::historia.historia.titulo': 'Título da história',
        'content-manager.content-types.api::historia.historia.nome': 'Nome da autora',
        'content-manager.content-types.api::historia.historia.descricao': 'Resumo da história',
        'content-manager.content-types.api::historia.historia.slug': 'Link',
        'content-manager.content-types.api::historia.historia.conteudo': 'Conteúdo da história',
        'content-manager.content-types.api::historia.historia.regiao': 'Região',
        'content-manager.content-types.api::historia.historia.imagem': 'Imagens',

        // Receitas
        'content-manager.content-types.api::receita.receita.titulo': 'Nome da receita',
        'content-manager.content-types.api::receita.receita.descricao': 'Descrição da receita',
        'content-manager.content-types.api::receita.receita.tempo_preparo': 'Tempo de preparo (minutos)',
        'content-manager.content-types.api::receita.receita.tempo_cozimento': 'Tempo de cozimento (minutos)',
        'content-manager.content-types.api::receita.receita.porcoes': 'Porções',
        'content-manager.content-types.api::receita.receita.dificuldade': 'Dificuldade',
        'content-manager.content-types.api::receita.receita.ingredientes': 'Ingredientes',
        'content-manager.content-types.api::receita.receita.passos': 'Modo de preparo (passos)',
        'content-manager.content-types.api::receita.receita.imagem': 'Imagens',

        // Traduzindo a página administrativa de usuárias
        'content-manager.content-types.plugin::users-permissions.user.username': 'Nome da Companheira',
        'content-manager.content-types.plugin::users-permissions.user.email': 'E-mail',
        'content-manager.content-types.plugin::users-permissions.user.password': 'Senha',
        'content-manager.content-types.plugin::users-permissions.user.confirmed': 'Confirmado',
        'content-manager.content-types.plugin::users-permissions.user.blocked': 'Bloqueado',
        'content-manager.content-types.plugin::users-permissions.user.role': 'Perfil',
        
      }
    },
  },
};
