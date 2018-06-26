import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.config';
import store from '../store';
import * as types from '../store/mutation-types';
import routerUtil from './router-util';

Vue.routesConfig = [];
let router = {instance: ''};

/**
 * 初始化路由方法
 */
function initRouter (Vue) {
  Vue.use(VueRouter);
  Vue.routesConfig = [...Vue.routesConfig, ...routes];
  // 创建 router 实例
  router.instance = new VueRouter({
    routes: Vue.routesConfig
  });

  // 把路由信息配置到vuex
  store.commit(types.SET_ROUTER_MAP, routerUtil.getRouterMap(Vue.routesConfig));

  // 如果是进入home路由，则判断是否登录，如果没有登录跳转登录页面
  router.instance.beforeEach((to, from, next) => {
    // 判断是否有权限访问
    if (!routerUtil.hasPermission(to)) {
      next({name: 'permission'});
      return;
    }
    // 判断是否存在需要授权的路由
    if (to.matched && to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.state.isLogin) {
        Vue.api.core.getContextData().then(ret2 => {
          store.dispatch('setContextData', ret2);
          routerUtil.navCorrectRoute(to, from, next);
        });
        return;
      } else {
        if (!store.state.contextData.user.extension.isHasAppPermission) {
          next({name: 'permission'});
          return;
        }
      }
    }
    routerUtil.navCorrectRoute(to, from, next);
  });
}

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  initRouter(Vue);// 执行初始化路由
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// export const router = (() => {
//   return router.instance;
// })();

export default {
  install,
  router
};
