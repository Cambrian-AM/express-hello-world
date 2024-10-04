const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3001;

const targetUrl = 'https://devnet.helius-rpc.com';

const proxyOptions = {
  target: targetUrl,
  changeOrigin: true,
  secure: false,
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
};

app.use('/', createProxyMiddleware(proxyOptions));

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});