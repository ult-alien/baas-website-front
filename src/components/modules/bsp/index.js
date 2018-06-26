import routes from './routes.config';
import api from './api';
const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;

  Vue.routesConfig = [...Vue.routesConfig, ...routes]; // 配置本业务模块的路由
  Vue.api['bsp'] = api; // 配置本业务模块的api,本模块的api 可以通过 this.$api.bsp.xxx 获取
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
