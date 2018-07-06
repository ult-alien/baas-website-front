/**
 * 相关配置请查阅vue-router的文档，https://router.vuejs.org/zh-cn/
 * 注意：1、要求一定要配置name,命名规则按照层次用'.'分开，比如路由1的name：'home',它的子节点的name: 'home.xxx'
 *      2、desc 不是vue-router的配置，是自动定义的，主要用来描述当前路由
 * @type {[*]}
 */
export default [
  {
    desc: '简介',
    path: 'example.components.illustration',
    name: 'example.components.illustration',
    component (resolve) {
      require.ensure([], () => resolve(require('components/modules/home/sub/about.vue')), 'example.components.illustration');
    }
  },
  {
    desc: '图标',
    path: 'example.components.icons',
    name: 'example.components.icons',
    component (resolve) {
      require.ensure([], () => resolve(require('components/modules/home/sub/index.vue')), 'example.components.icons');
    }
  }
];
