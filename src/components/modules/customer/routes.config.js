/**
 * 相关配置请查阅vue-router的文档，https://router.vuejs.org/zh-cn/
 * 注意：1、要求一定要配置name,命名规则按照层次用'.'分开，比如路由1的name：'home',它的子节点的name: 'home.xxx'
 *      2、desc 不是vue-router的配置，是自动定义的，主要用来描述当前路由
 * @type {[*]}
 */
export default {
  'bsp.biz': [
    { // api已修改、api无问题
      desc: '金融机构管理',
      name: 'bsp.biz.cooperation-agency-mgt',
      path: 'cooperation-agency-mgt',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/operation/cooperation-agency-mgt.vue')), 'customer.biz.cooperation-agency-mgt');
      }
    },
    { // api已修改、api无问题
      desc: '资金机构编辑',
      name: 'bsp.biz.cooperation-agency-edit',
      path: 'cooperation-agency-edit',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/operation/cooperation-agency-edit.vue')), 'customer.biz.cooperation-agency-edit');
      }
    },
    { // api已修改、api无问题
      desc: '资金机构详情',
      name: 'bsp.biz.cooperation-agency-detail',
      path: 'cooperation-agency-detail',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/operation/cooperation-agency-detail.vue')), 'customer.biz.cooperation-agency-detail');
      }
    },
    { // api已修改、api无问题
      desc: '邀请客户',
      name: 'bsp.biz.invite-customer',
      path: 'invite-customer',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/invitation/invite-customer.vue')), 'customer.biz.invite-customer');
      }
    },
    { // api已修改、api无问题
      desc: '邀请成员单位',
      name: 'bsp.biz.invite-member',
      path: 'invite-member',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/invitation/invite-member.vue')), 'customer.biz.invite-member');
      }
    },
    { // api已修改、api无问题
      desc: '邀请统计',
      name: 'bsp.biz.invite-statistics',
      path: 'invite-statistics',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/invitation/invite-statistics.vue')), 'customer.biz.invite-statistics');
      }
    },
    { // api已修改/未验证
      desc: '统计详情',
      name: 'bsp.biz.invite-statistics-details',
      path: 'invite-statistics-details',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/invitation/invite-statistics-details.vue')), 'customer.biz.invite-statistics-details');
      }
    },
    { // api已修改
      desc: '客户管理', // 链单
      name: 'bsp.biz.my-customer',
      path: 'my-customer',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/my-customer.vue')), 'customer.biz.my-customer');
      }
    },
    { // api已修改
      desc: '详情', // 链单
      name: 'bsp.biz.customer-info',
      path: 'customer-detail',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/customer-detail.vue')), 'customer.biz.customer-info');
      }
    },
    { // api已修改
      desc: '编辑',
      name: 'bsp.biz.customer-edit',
      path: 'customer-add',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/customer-edit.vue')), 'customer.biz.customer-edit');
      }
    },
    { // api已修改
      desc: '我的供应商', // 链单
      name: 'bsp.biz.supplier',
      path: 'my-supplier',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/invitation/my-supplier.vue')), 'customer.biz.supplier');
      }
    },
    { // api已修改
      desc: '认证初审',
      name: 'bsp.biz.first-trial',
      path: 'first-trial',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/first-trial.vue')), 'customer.biz.first-trial');
      }
    },
    { // api已修改
      desc: '认证终审',
      name: 'bsp.biz.last-trial',
      path: 'last-trial',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/last-trial.vue')), 'customer.biz.last-trial');
      }
    },
    { // api已修改
      desc: '审核页面',
      name: 'bsp.biz.accreditation-details',
      path: 'accreditation-details',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/accreditation-details.vue')), 'customer.biz.accreditation-details');
      }
    },
    { // api已修改
      desc: '审核详情',
      name: 'bsp.biz.accreditation-view',
      path: 'accreditation-view',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/accreditation-view.vue')), 'customer.biz.accreditation-view');
      }
    },
    { // api已修改
      desc: '企业信息',
      name: 'bsp.biz.mem-enterprise-info',
      path: 'mem-enterprise-info',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/user/mem-enterprise-info.vue')), 'customer.biz.mem-enterprise-info');
      }
    },
    {
      desc: '银行账户',
      name: 'bsp.biz.accounts',
      path: 'accounts',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/accounts.vue')), 'customer.biz.accounts');
      }
    },
    {
      desc: '客户信息变更初审',
      name: 'bsp.biz.cus-modify-trial',
      path: 'cus-modify-trial',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/modify/cus-modify-trial.vue')), 'customer.biz.cus-modify-trial');
      }
    },
    {
      desc: '客户信息变更终审',
      name: 'bsp.biz.cus-modify-final',
      path: 'cus-modify-final',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/modify/cus-modify-final.vue')), 'customer.biz.cus-modify-final');
      }
    },
    {
      desc: '企业信息变更详情',
      name: 'bsp.biz.cus-modify-detail',
      path: 'cus-modify-detail',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/modify/cus-detail.vue')), 'customer.biz.cus-detail');
      }
    },
    {
      desc: '用户详情',
      name: 'bsp.biz.user-first-trial-detail',
      path: 'user-first-trial-detail',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/modify/user/user-first-trial-detail.vue')), 'bsp.biz.user-first-trial-detail');
      }
    },
    {
      desc: '用户详情',
      name: 'bsp.biz.user-last-trial-detail',
      path: 'user-last-trial-detail',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/modify/user/user-last-trial-detail.vue')), 'bsp.biz.user-last-trial-detail');
      }
    },
    { // api已修改
      desc: '金融机构管理', // 链单
      name: 'bsp.biz.finner',
      path: 'finner',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/finner.vue')), 'customer.biz.finner');
      }
    },
    { // api已修改
      desc: '核心企业管理', // 链单
      name: 'bsp.biz.focalco',
      path: 'focalco',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/focalco.vue')), 'customer.biz.focalco');
      }
    }
  ],
  'root': [
    {
      desc: '企业注册',
      name: 'bsp.register',
      path: '/register',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/register/register.vue')), 'customer.register');
      }
    },
    {
      desc: '企业认证',
      path: '/accreditation',
      name: 'accreditation',
      component (resolve) {
        require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/main.vue')), 'customer.accreditation');
      },
      children: [
        {
          desc: '注册成功',
          name: 'bsp.accreditation.register-success',
          path: 'register-success',
          component (resolve) {
            require.ensure([], () => resolve(require('components/modules/customer/customer/register/register-success.vue')), 'customer.accreditation.register-success');
          }
        },
        {
          desc: '注册成功-再次登录',
          name: 'bsp.accreditation.wait',
          path: 'wait',
          component (resolve) {
            require.ensure([], () => resolve(require('components/modules/customer/customer/register/wait2accreditation.vue')), 'customer.accreditation.wait');
          }
        },
        {
          desc: '企业认证',
          name: 'bsp.accreditation.step',
          meta: {requiresAuth: true},
          path: 'step',
          component (resolve) {
            require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/accreditation-step.vue')), 'customer.accreditation.step');
          }
        },
        {
          desc: '企业认证-审核失败',
          name: 'bsp.authenticate.back',
          path: 'back',
          component (resolve) {
            require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/authenticate-back.vue')), 'customer.authenticate.back');
          }
        },
        {
          desc: '审核详情',
          name: 'bsp.accreditation.cus-view',
          path: 'cus-view',
          component (resolve) {
            require.ensure([], () => resolve(require('components/modules/customer/customer/accreditation/accreditation-view-for-customer.vue')), 'customer.accreditation.cus-view');
          }
        }
      ]
    }
  ]
};
