let config = require('../../../config');
let apiRootMap = {};

if (process.env.NODE_ENV === 'production' && config.build.env.apiRootMap) {
  apiRootMap = config.build.env.apiRootMap;
} else {
  if (config.dev.proxyTable) {
    let proxyTable = config.dev.proxyTable;
    Object.keys(proxyTable).forEach(function (context) {
      apiRootMap[context] = context +
        (proxyTable[context]['projectName'] ? '/' + proxyTable[context]['projectName'] : '');
    });
  }
}

export default {
  genPath (path) {
    let rootPath = '/' + path.split('/')[1];
    if (apiRootMap[rootPath]) {
      return path.replace(rootPath, apiRootMap[rootPath]);
    } else {
      return '';
    }
  },
  getParams () {
    let url = window.location.search; // 获取url中"?"符后的字串
    let theRequest = {};
    if (url.indexOf('?') !== -1) {
      let str = url.substr(1);
      let strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
      }
    }
    return theRequest;
  }
};
