import config from '../../config';
/**
 * 相关配置请查阅vue-router的文档，https://router.vuejs.org/zh-cn/
 * 注意：1、要求一定要配置name,命名规则按照层次用'.'分开，比如路由1的name：'home',它的子节点的name: 'home.xxx'
 *      2、desc 不是vue-router的配置，是自动定义的，主要用来描述当前路由
 * @type {[*]}
 */
export default [
  {
    desc: '',
    name: '',
    path: '/',
    redirect () {
      // return config.emptyRoute() || config.defaultRoute();
      return config.emptyRoute();
    }
  },
  {
    desc: '',
    name: '',
    path: '/admin',
    redirect () {
      return '/admin/login';
    }
  },
  {
    desc: '注册',
    path: '/admin/register',
    name: 'register',
    component (resolve) {
      require.ensure([], () => resolve(require('components/register/register.vue')), 'register');
    }
  },
  {
    desc: '登录',
    path: '/admin/login',
    name: 'login',
    component (resolve) {
      require.ensure([], () => resolve(require('components/login/login.vue')), 'login');
    }
  },
  {
    desc: '没有权限访问',
    path: '/permission',
    name: 'permission',
    component (resolve) {
      require.ensure([], () => resolve(require('components/no-permission.vue')), 'permission');
    }
  },
  {
    desc: '页面未找到',
    path: '*',
    name: 'not-found',
    component (resolve) {
      require.ensure([], () => resolve(require('components/not-found.vue')), 'not-found');
    }
  }
];
