/**
 * 相关配置请查阅vue-router的文档，https://router.vuejs.org/zh-cn/
 * 注意：1、要求一定要配置name,命名规则按照层次用'.'分开，比如路由1的name：'home',它的子节点的name: 'bsp.xxx'
 *      2、desc 不是vue-router的配置，是自动定义的，主要用来描述当前路由
 * @type {[*]}
 */
export default [
  {
    desc: '',
    path: '/bsp',
    name: 'bsp',
    component (resolve) {
      // require(['components/modules/bsp/main.vue'], resolve);
      require.ensure([], () => resolve(require('components/modules/bsp/main.vue')), 'bsp');
    },
    meta: {requiresAuth: true, dynamicMenus: true},
    children: [
      {
        desc: '业务办理',
        name: 'bsp.biz',
        path: 'biz',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/bsp/layout.vue')), 'bsp.biz');
        },
        children: [
          {
            desc: '公告管理',
            name: 'bsp.biz.notice-list',
            path: 'notice-list',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/bsp/notice/notice-list.vue')), 'bsp.biz.notice-list');
            }
          },
          {
            desc: '公告详情',
            name: 'bsp.biz.notice-detail',
            path: 'notice-detail/:noticeId',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/bsp/notice/notice-detail.vue')), 'bsp.biz.notice-detail');
            }
          },
          {
            desc: '添加/编辑公告',
            name: 'bsp.biz.notice-add-edit',
            path: 'notice-add-edit',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/bsp/notice/notice-add-edit.vue')), 'bsp.biz.notice-add-edit');
            }
          }
        ]
      }
    ]
  }
];
