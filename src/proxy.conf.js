const PROXY_CONFIG = [
  {
    context: ['/'],
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/': '',
    },
  },
];
module.exports = PROXY_CONFIG;
