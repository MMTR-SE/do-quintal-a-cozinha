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
      
        //Traduzindo a página de produtos
        'content-manager.content-types.api::produto.produto.product_name': 'Nome do produto',
        'content-manager.content-types.api::produto.produto.description': 'Descrição',
        'content-manager.content-types.api::produto.produto.price': 'Preço',
        'content-manager.content-types.api::produto.produto.producer_name': 'Nome da produtora',
        'content-manager.content-types.api::produto.produto.gallery':'Galeria de imagens',
        'content-manager.content-types.api::produto.produto.slug':'Link',
        'content-manager.content-types.api::produto.produto.category':'Categoria',


        //Traduzindo a página de história
        'content-manager.content-types.api::nossa-historia.nossa-historia.title': 'Título da história',
        'content-manager.content-types.api::nossa-historia.nossa-historia.description': 'Resumo da história',
        'content-manager.content-types.api::nossa-historia.nossa-historia.content': 'Conteúdo da história',
        'content-manager.content-types.api::nossa-historia.nossa-historia.author': 'Autora',
        'content-manager.content-types.api::nossa-historia.nossa-historia.gallery':'Galeria',
        'content-manager.content-types.api::nossa-historia.nossa-historia.slug':'Link',

        //Traduzindo a página de receitas
        'content-manager.content-types.api::receita.receita.title': 'Nome da receita',
        'content-manager.content-types.api::receita.receita.description': 'Descrição da receita',
        'content-manager.content-types.api::receita.receita.ingredients': 'Ingredientes',
        'content-manager.content-types.api::receita.receita.instructions': 'Instruções',
        'content-manager.content-types.api::receita.receita.preparation_time_in_minutes': 'Tempo de preparo',
        'content-manager.content-types.api::receita.receita.cooking_time_in_minutes': 'Cozinhamento',
        'content-manager.content-types.api::receita.receita.number_of_servings': 'Porções',
        'content-manager.content-types.api::receita.receita.author_name': 'Autora da receita',
        'content-manager.content-types.api::receita.receita.steps': 'Passos',
        'content-manager.content-types.api::receita.receita.gallery': 'Galeria de imagens',
        'content-manager.content-types.api::receita.receita.difficulty': 'Dificuldade',
        
        //Traduzindo a página de categorias
        'content-manager.content-types.api::categoria.categoria.category_name': 'Nome da categoria',

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
