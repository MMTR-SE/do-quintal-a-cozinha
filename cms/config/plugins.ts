export default ({ env }: { env: any }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('CMS_JWT_SECRET', env('JWT_SECRET')),
    },
  },
});
