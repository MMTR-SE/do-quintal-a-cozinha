export default ({ env }: { env: any }) => ({
  auth: {
    secret: env('CMS_ADMIN_JWT_SECRET', env('ADMIN_JWT_SECRET')),
  },
  apiToken: {
    salt: env('CMS_API_TOKEN_SALT', env('API_TOKEN_SALT')),
  },
  transfer: {
    token: {
      salt: env('CMS_TRANSFER_TOKEN_SALT', env('TRANSFER_TOKEN_SALT')),
    },
  },
  secrets: {
    encryptionKey: env('CMS_ENCRYPTION_KEY', env('ENCRYPTION_KEY')),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
