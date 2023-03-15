module.exports = {
    apps: [
      {
        name: 'auth-apis',
        script: './dist/apps/auth-apis/src/main.js',
        env_development: {
          APP_PORT: 5002
        },
        watch: true
      },
      {
        name: 'user-apis',
        script: './dist/apps/user-apis/src/main.js',
        env_development: {
          APP_PORT: 5003
        },
        watch: true
      }
    ],
  };
  
  
  
  
  