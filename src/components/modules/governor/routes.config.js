/**
 * 相关配置请查阅vue-router的文档，https://router.vuejs.org/zh-cn/
 * 注意：1、要求一定要配置name,命名规则按照层次用'.'分开，比如路由1的name：'home',它的子节点的name: 'governor.xxx'
 *      2、desc 不是vue-router的配置，是自动定义的，主要用来描述当前路由
 * @type {[*]}
 */
export default [
  {
    desc: '',
    path: '/bsp',
    name: 'bsp',
    component (resolve) {
      // require(['components/modules/governor/main.vue'], resolve);
      require.ensure([], () => resolve(require('components/modules/main.vue')), 'governor');
    },
    meta: {requiresAuth: true, dynamicMenus: true},
    children: [
      {
        desc: '业务办理',
        name: 'bsp.biz',
        path: 'biz',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/layout.vue')), 'governor.biz');
        },
        children: [
          {
            desc: '资源管理',
            name: 'bsp.biz.resoure-mgt',
            path: 'resoure-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/resource/resource-mgt.vue')), 'governor.biz.resoure-mgt');
            }
          },
          {
            desc: '角色管理',
            name: 'bsp.biz.role-mgt',
            path: 'role-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/role/role-mgt.vue')), 'governor.biz.role-mgt');
            }
          },
          {
            desc: '机构管理',
            name: 'bsp.biz.organ-mgt',
            path: 'organ-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/organization/organ-mgt.vue')), 'governor.biz.organ-mgt');
            }
          },
          {
            desc: '机构类型管理',
            name: 'bsp.biz.organ-type-mgt',
            path: 'organ-type-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/organization/organ-type-mgt.vue')), 'governor.biz.organ-type-mgt');
            }
          },
          {
            desc: '字典管理',
            name: 'bsp.biz.dictionary',
            path: 'dictionary',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/dictionary/dictionary-mgt.vue')), 'governor.biz.dictionary');
            }
          },
          {
            desc: '用户管理',
            name: 'bsp.biz.user-mgt',
            path: 'user-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/user/user-mgt.vue')), 'governor.biz.user-mgt');
            }
          },
          {
            desc: '应用管理',
            name: 'bsp.biz.app-mgt',
            path: 'app-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/app/app-mgt.vue')), 'governor.biz.app-mgt');
            }
          },
          {
            desc: '个人信息',
            name: 'bsp.biz.personal-info',
            path: 'personal-info',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/user/personal-info.vue')), 'governor.biz.personal-info');
            }
          },
          {
            desc: '我的消息',
            name: 'bsp.biz.msg-mgt',
            path: 'msg-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/message/message-list.vue')), 'governor.biz.msg-mgt');
            }
          },
          {
            desc: '我的公告',
            name: 'bsp.biz.mynotice-list',
            path: 'mynotice-list',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/notice/mynotice-list.vue')), 'governor.biz.mynotice-list');
            }
          },
          {
            desc: '系统参数',
            name: 'bsp.biz.parameter-mgt',
            path: 'parameter-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/parameter/parameter-mgt.vue')), 'governor.biz.parameter-mgt');
            }
          },
          {
            desc: '企业参数',
            name: 'bsp.biz.parameter-cus',
            path: 'parameter-cus',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/parameter/parameter-cus.vue')), 'governor.biz.parameter-cus');
            }
          },
          {
            desc: '重置密码',
            name: 'bsp.biz.reset-pwd',
            path: 'reset-pwd',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/reset-password.vue')), 'governor.biz.reset-pwd');
            }
          },
          {
            desc: '修改登录密码',
            name: 'bsp.biz.modify-login-pwd',
            path: 'modify-login-pwd',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/modify-login-password.vue')), 'governor.biz.modify-login-pwd');
            }
          },
          {
            desc: '修改预留信息',
            name: 'bsp.biz.modify-reserved-info',
            path: 'modify-reserved-info',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/modify-reserved-information.vue')), 'governor.biz.modify-reserved-info');
            }
          },
          {
            desc: '修改支付密码',
            name: 'bsp.biz.modify-payment-pwd',
            path: 'modify-payment-pwd',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/modify-payment-password.vue')), 'governor.biz.modify-payment-pwd');
            }
          },
          {
            desc: '身份验证',
            name: 'bsp.biz.modify-payment-steps',
            path: 'modify-payment-steps',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/modify-payment-steps.vue')), 'governor.biz.modify-payment-steps');
            }
          },
          {
            desc: '修改密保信息',
            name: 'bsp.biz.modify-security-info',
            path: 'modify-security-info',
            component (resolve) {
              require(['components/modules/governor/security/modify-security-information.vue'], resolve);
              require.ensure([], () => resolve(require('components/modules/governor/security/modify-security-information.vue')), 'governor.biz.modify-security-info');
            }
          },
          {
            desc: '密码级别管理',
            name: 'bsp.biz.security.security-rule-mgt',
            path: 'security-rule-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/security-rule-mgt.vue')), 'governor.biz.security.security-rule-mgt');
            }
          },
          {
            desc: '操作日志',
            name: 'bsp.biz.log-list',
            path: 'log-list',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/log-record-list.vue')), 'governor.biz.log-list');
            }
          },
          {
            desc: '交互审计',
            name: 'bsp.biz.remote-list',
            path: 'remote-list',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/security/remote-record-list.vue')), 'governor.biz.remote-list');
            }
          },
          {
            desc: '节假日设置',
            name: 'bsp.biz.holiday-conf',
            path: 'holiday-conf',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/holidayConf/holiday-conf.vue')), 'governor.biz.holiday-conf');
            }
          },
          {
            desc: '公告管理',
            name: 'bsp.biz.notice-list',
            path: 'notice-list',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/notice/notice-list.vue')), 'governor.biz.notice-list');
            }
          },
          {
            desc: '公告详情',
            name: 'bsp.biz.notice-detail',
            path: 'notice-detail/:noticeId',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/notice/notice-detail.vue')), 'governor.biz.notice-detail');
            }
          },
          {
            desc: '添加/编辑公告',
            name: 'bsp.biz.notice-add-edit',
            path: 'notice-add-edit',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/notice/notice-add-edit.vue')), 'governor.biz.notice-add-edit');
            }
          },
          {
            desc: '消息模板',
            name: 'bsp.biz.message-template-list',
            path: 'message-template-list',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/message/message-template-list.vue')), 'governor.biz.message-template-list');
            }
          },
          {
            desc: '服务大厅维护',
            name: 'bsp.biz.srvhall-list',
            path: 'srvhall-list',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/srvhall/srvhall-list.vue')), 'governor.biz.srvhall-list');
            }
          },
          { // api已修改  管理平台
            desc: '企业机构',
            name: 'bsp.biz.ent-organ-mgt',
            path: 'ent-organ-mgt',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/organization/ent-organ-mgt.vue')), 'governor.biz.ent-organ-mgt');
            }
          },
          { // api已修改 管理平台
            desc: '企业用户',
            name: 'bsp.biz.enterprise-user',
            path: 'enterprise-user',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/user/enterprise-user.vue')), 'governor.biz.enterprise-user');
            }
          },
          { // api已修改 管理平台
            desc: '新增用户',
            name: 'bsp.biz.ent-user-add',
            path: 'ent-user-add',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/user/enterprise/ent-user-add.vue')), 'bsp.biz.ent-user-add');
            }
          },
          { // api已修改 管理平台
            desc: '用户详情',
            name: 'bsp.biz.ent-user-detial-view',
            path: 'ent-user-detial-view',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/user/enterprise/ent-user-detial-view.vue')), 'bsp.biz.ent-user-detial-view');
            }
          },
          { // api已修改 管理平台
            desc: '用户详情',
            name: 'bsp.biz.ent-user-resubmit',
            path: 'ent-user-resubmit',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/user/enterprise/ent-user-resubmit.vue')), 'bsp.biz.ent-user-resubmit');
            }
          },
          { // api已修改 管理平台
            desc: '用户编辑',
            name: 'bsp.biz.ent-user-edit',
            path: 'ent-user-edit',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/user/enterprise/ent-user-edit.vue')), 'bsp.biz.ent-user-edit');
            }
          }
        ]
      }
    ]
  },
  {
    desc: '忘记密码',
    path: '/forgetPass',
    name: 'forgetPass',
    component (resolve) {
      require.ensure([], () => resolve(require('components/modules/governor/password/forgetPass.vue')), 'forgetPass');
    },
    redirect: {name: 'forgetPass.components'},
    children: [
      {
        desc: '找回密码',
        name: 'forgetPass.components',
        path: 'components',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/governor/password/components/step-components.vue')), 'forgetPass.components');
        }
      }
    ]
  },
  {
    desc: '服务大厅',
    path: '/srvhall',
    name: 'srvhall',
    meta: {requiresAuth: true},
    component (resolve) {
      require.ensure([], () => resolve(require('components/modules/governor/srvhall/main.vue')), 'srvhall');
    },
    children: [
      {
        desc: '服务大厅（主界面）',
        name: 'bsp.srvhall.srvhall-home',
        path: 'srvhall-home',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/governor/srvhall/srvhall-home.vue')), 'governor.srvhall.srvhall-home');
        }
      },
      {
        desc: '服务大厅（分类界面）',
        name: 'bsp.srvhall.srvhall-category',
        path: 'srvhall-category',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/governor/srvhall/srvhall-category.vue')), 'governor.srvhall.srvhall-category');
        },
        children: [
          {
            desc: '业务指引（如何开具链单）',
            name: 'bsp.srvhall.send',
            path: 'send',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/srvhall/pages/send/send.vue')), 'governor.srvhall.send');
            }
          },
          {
            desc: '业务指引（如何转让链单）',
            name: 'bsp.srvhall.transfer',
            path: 'transfer',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/srvhall/pages/transfer/transfer.vue')), 'governor.srvhall.transfer');
            }
          },
          {
            desc: '业务指引（如何使用链单融资）',
            name: 'bsp.srvhall.discount',
            path: 'discount',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/srvhall/pages/discount/discount.vue')), 'governor.srvhall.discount');
            }
          },
          {
            desc: '业务指引（如何签收链单）',
            name: 'bsp.srvhall.receive',
            path: 'receive',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/srvhall/pages/receive/receive.vue')), 'governor.srvhall.receive');
            }
          },
          {
            desc: '业务指引（如何回购链单）',
            name: 'bsp.srvhall.repurchase',
            path: 'repurchase',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/srvhall/pages/repurchase/repurchase.vue')), 'governor.srvhall.repurchase');
            }
          },
          {
            desc: '服务协议',
            name: 'bsp.srvhall.prot',
            path: 'protocol',
            component (resolve) {
              require.ensure([], () => resolve(require('components/modules/governor/srvhall/pages/protocol.vue')), 'governor.srvhall.protocol');
            }
          }
        ]
      }
    ]
  },
  {
    desc: '协议',
    name: 'protocol',
    path: '/protocol',
    component (resolve) {
      require.ensure([], () => resolve(require('components/modules/governor/protocol/protocol.vue')), 'protocol');
    },
    children: [
      {
        desc: '开单协议',
        name: 'protocol.send-prot',
        path: 'send-prot',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/governor/protocol/send-prot.vue')), 'protocol.send-prot');
        }
      },
      {
        desc: '转单协议',
        name: 'protocol.transfer-prot',
        path: 'transfer-prot',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/governor/protocol/transfer-prot.vue')), 'protocol.transfer-prot');
        }
      },
      {
        desc: '融资协议',
        name: 'protocol.discount-prot',
        path: 'discount-prot',
        component (resolve) {
          require.ensure([], () => resolve(require('components/modules/governor/protocol/discount-prot.vue')), 'protocol.discount-prot');
        }
      }
    ]
  }
];
