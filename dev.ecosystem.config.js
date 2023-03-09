module.exports = {
    apps: [
      {
        name: 'control-panel',
        script: './dist/apps/control-panel/src/main.js',
        env_development: {
          APP_PORT: 5001,
        },
        watch: true,
      },
      {
        name: 'auth-apis',
        script: './dist/apps/auth-apis/src/main.js',
        env_development: {
          APP_PORT: 5002
        },
        watch: true
      }
    ],
  };
  
  
  
  
  