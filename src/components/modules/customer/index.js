import routes from './routes.config';
import api from './api';
import routerUtil from '../../../core/router/router-util';
const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;

  /**
   * 配置路由，客户管理比较特殊，菜单直接挂在管理中心，所以把路由挂在bsp.biz下面
   */
  let bspBiz = routerUtil.findRouteByName(routes, 'bsp.biz', 0);
  let children = bspBiz.children;
  bspBiz.children = [...children, ...routes['bsp.biz']];
  Vue.routesConfig = [...Vue.routesConfig, ...routes['root']];// 配置根路由

  Vue.api['cust'] = api; // 配置本业务模块的api
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
