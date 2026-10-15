export default ({ env }: { env: any }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: env.bool('IS_PROXIED', true),
  app: {
    keys: env.array('CMS_APP_KEYS', env.array('APP_KEYS')),
  },
  transfer: {
    remote: {
      // Habilita o servidor remoto de transferência de dados (strapi transfer).
      // Mantenha desligado em produção; ligue via TRANSFER_REMOTE_ENABLED=true apenas quando necessário.
      enabled: env.bool('TRANSFER_REMOTE_ENABLED', false),
    },
  },
});
