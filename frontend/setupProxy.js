const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/api', '/auth'],
    createProxyMiddleware({
      target: 'https://khub-service.herokuapp.com/'
    })
  );
};
