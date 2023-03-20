module.exports = {
  apps: [
    {
      name: 'abdul-fp-control-panel',
      script: './dist/apps/control-panel/src/main.js',
      env_production: {
        APP_PORT: 9201,
      },
    },
    {
      name: 'abdul-fp-auth-apis',
      script: './dist/apps/auth-apis/src/main.js',
      env_production: {
        APP_PORT: 9202,
      },
    },
    {
      name: 'abdul-fp-user-apis',
      script: './dist/apps/user-apis/src/main.js',
      env_production: {
        APP_PORT: 9203,
      },
    },
  ],
};
