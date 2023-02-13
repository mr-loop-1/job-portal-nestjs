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
     
    ],
  };
  
  
  
  
  