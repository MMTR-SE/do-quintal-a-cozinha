import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
<<<<<<< HEAD
<<<<<<< HEAD
    locales: ['pt-BR'],
=======
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
>>>>>>> 85889231 (feat: adicionar Strapi CMS ao projeto)
=======
    locales: ['pt-BR'],
>>>>>>> adf2e4f6 (feat: integrar produtos do Strapi em /nossa-producao)
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
