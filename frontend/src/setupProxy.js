const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/beer_data',
    createProxyMiddleware({
      target: 'https://jsonbeerdata.s3.ap-south-1.amazonaws.com/',
      changeOrigin: true,
    })
  );

  app.use(
    '/authenticate',
    createProxyMiddleware({
      target: 'https://login-service-xwdp.onrender.com',
      changeOrigin: true,
    })
  );
};