'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  mockData: false,// 是否开启模拟数据
  proxyTable: {
    '/api': {
      target: 'http://localhost:3020',//api代理服务器地址http://ip:port
      changeOrigin: true,
      projectName: 'bass-office',// 项目名称，配置该选项，请求的url会加上项目名称，比如/api/common/get-data => /api/projectName/common/get-data
      pathRewrite: {
        '^/api': ''
      }
    }
  }
});
