import type { StrapiApp } from '@strapi/strapi/admin';

import AuthLogo from './extensions/auth-logo.png';
import MenuLogo from './extensions/menu-logo.png';
import Favicon from './extensions/favicon.ico';

import ptBR from './extensions/translations/pt-BR.json';


const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&display=swap';

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
    auth: {
      logo: AuthLogo,
    },
    menu: {
      logo: MenuLogo,
    },
    head: {
      favicon: Favicon,
    },
    theme: {
      colors: {
        primary100: '#F3E9F7',
        primary200: '#E4C6F0',
        primary500: '#9B4FC4',
        primary600: '#6A1B9A',
        primary700: '#4E1373',
        buttonPrimary500: '#9B4FC4',
        buttonPrimary600: '#6A1B9A',
        secondary100: '#FBEFCB',
        secondary200: '#F5DA96',
        secondary500: '#EFC157',
        secondary600: '#E6A700',
        secondary700: '#B98400',
        warning100: '#FBEFCB',
        warning600: '#E6A700',
        warning700: '#B98400',
        neutral100: '#F3E9F7',
        neutral800: '#2A2230',
        neutral900: '#2A2230',
      },
    },
  },
  bootstrap(app: StrapiApp) {
    const FONT_STYLE_ID = 'mmtrse-admin-fonts';
    if (document.getElementById(FONT_STYLE_ID)) return;

    for (const href of ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']) {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = href;
      if (href.includes('gstatic')) preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
    }

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = GOOGLE_FONTS_HREF;
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.id = FONT_STYLE_ID;
    style.textContent = `
      body, input, textarea, select, button {
        font-family: 'Atkinson Hyperlegible', sans-serif !important;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Bricolage Grotesque', sans-serif !important;
      }
    `;
    document.head.appendChild(style);
  },
};
