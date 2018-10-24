import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.config';

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

  // 如果是进入home路由，则判断是否登录，如果没有登录跳转登录页面
  router.instance.beforeEach((to, from, next) => {
    next();
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
