import home from './components/modules/home';
// import store from './core/store';
export default {
  defaultRoute () { // 登录后的默认跳转路径
    return '/home';
  },
  emptyRoute () { // 空路由的时候默认跳转
    return '/home';
  },
  modules: { // 配置要加载的业务模块
    home
  }
};
