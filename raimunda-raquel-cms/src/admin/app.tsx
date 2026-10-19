import type { StrapiApp } from '@strapi/strapi/admin';
import AuthLogo from './extensions/auth-logo.png';
import MenuLogo from './extensions/menu-logo.png';
import Favicon from './extensions/favicon.ico';

const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&display=swap';

export default {
  config: {
    locales: ['pt-BR'],
    translations: {
      'pt-BR': {
         "plugin.name": "Painel de Conteúdo MMTR-SE",
        Users: "Companheiras",
        User: "Companheira", 
        // Tradução de Content Type Builder plugin 
        "content-type-builder.plugin.name": "Seções",
        "content-type-builder.components.ListView.empty": "Nenhuma seção encontrada",
        "content-type-builder.components.ListView.search": "Pesquisar seção",
        "content-type-builder.components.ListView.search.placeholder": "Pesquisar por nome da seção",
        "content-type-builder.components.ListView.search.no-results": "Nenhuma seção encontrada",
        "Auth.form.welcome.title": "Bem-vinda Companheira!",
        "Auth.form.welcome.subtitle": "Acesse sua conta",
        
        "app.components.LeftMenu.navbrand.title": "Painel de Controle",
        "global.content-manager": "Gerenciador de Conteúdo",

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
