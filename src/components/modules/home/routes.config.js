/**
 * 相关配置请查阅vue-router的文档，https://router.vuejs.org/zh-cn/
 * 注意：1、要求一定要配置name,命名规则按照层次用'.'分开，比如路由1的name：'home',它的子节点的name: 'home.xxx'
 *      2、desc 不是vue-router的配置，是自动定义的，主要用来描述当前路由
 * @type {[*]}
 */
import apidocRoutes from './apidocRoutes-config';

export default [
  {
    desc: '门户',
    path: '/home',
    redirect: '/home/index',
    name: 'home',
    component (resolve) {
      require.ensure([], () => resolve(require('components/modules/home/main.vue')), 'home');
    },
    children: [
      {
        desc: '首页',
        path: 'index',
        name: 'index',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/home/sub/index.vue')), 'index');
        },
        meta: {
          needHeader: true
        }
      },
      {
        desc: '新闻详情',
        path: 'news',
        name: 'news',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/home/sub/news.vue')), 'news');
        }
      },
      {
        desc: '新闻列表',
        path: 'news-list',
        name: 'news-list',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/home/sub/news-list.vue')), 'news-list');
        }
      },
      {
        desc: '关于我们',
        path: 'about',
        name: 'about',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/home/sub/about.vue')), 'about');
        }
      },
      {
        desc: '区块链',
        path: 'block-chain',
        name: 'block-chain',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/home/sub/block-chain.vue')), 'block-chain');
        }
      },
      {
        desc: '菜单',
        path: 'api-menu',
        name: 'api-menu',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/home/sub/ui/apidoc-menu.vue')), 'api-menu');
        },
        children: apidocRoutes
      },
      {
        desc: '产品',
        path: 'product',
        name: 'product',
        component: () => import(/* webpackChunkName: 'product' */ 'components/modules/home/sub/product.vue')
      },
      {
        desc: '合作洽谈',
        path: 'negotiate',
        name: 'negotiate',
        component: () => import(/* webpackChunkName: 'negotiate' */'components/modules/home/sub/negotiate.vue')
      },
      {
        desc: 'API',
        path: 'baas-api',
        name: 'baas-api',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/apidoc/index.vue')), 'baas-api');
        }
      }
    ]
  }
];
