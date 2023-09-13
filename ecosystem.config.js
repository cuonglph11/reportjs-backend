module.exports = {
  apps: [
    {
      name: 'ill-connector-ATScada',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: '6000'
      }
    }
  ]
}
