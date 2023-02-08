module.exports = {
  apps: [
    {
      name: 'vaibhav-fp-control-panel',
      script: './dist/apps/control-panel/src/main.js',
      env_production: {
        APP_PORT: 9909,
      },
    },
    {
      name: 'vaibhav-fp-auth-apis',
      script: './dist/apps/auth-apis/src/main.js',
      env_production: {
        APP_PORT: 9910,
      },
    },
  ],
};
