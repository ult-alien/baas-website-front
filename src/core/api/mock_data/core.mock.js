import {MsgType, SystemMode} from '../../constants';
import Mock from 'mockjs';

// 模拟登录数据
Mock.mock(/\/x\/auth\/login/, {
  type: MsgType.SUCCESS, show: true, msg: '登录成功！', title: null, bean: null
});

// 模拟注销数据
Mock.mock(/\/x\/auth\/logout/, {
  type: MsgType.TOLOGIN, show: true, msg: '未登录或者登录超时'
});

// 模拟获取上下文数据
Mock.mock(/\/common\/context-data\/get-context-data/, {
  systemMode: SystemMode.DEVELOPMENT,
  user: {
    userName: '小明',
    oginName: '0000001',
    id: '1',
    menuTree: [
      {
        id: '1000',
        resName: '业务办理',
        resCode: '1000',
        resValue: 'home.biz',
        checked: true,
        children: [
          {
            id: '1100',
            resName: '系统管理',
            resCode: '1100',
            resValue: '',
            checked: true,
            children: [
              {
                id: '1101',
                resName: '资源管理',
                resCode: '0001',
                resValue: 'home.biz.resoure-mgt',
                checked: true,
                children: []
              },
              {
                id: '1102',
                resName: '机构管理',
                resCode: '0001',
                resValue: 'home.biz.organ-mgt',
                checked: true,
                children: []
              },
              {
                id: '1102',
                resName: '角色管理',
                resCode: '0001',
                resValue: 'home.biz.role-mgt',
                checked: true,
                children: []
              },
              {
                id: '1102',
                resName: '用户管理',
                resCode: '0001',
                resValue: 'home.biz.user-mgt',
                checked: true,
                children: []
              },
              {
                id: '1112',
                resName: '字典管理',
                resCode: '0011',
                resValue: 'home.biz.dictionary',
                checked: true,
                children: []
              },
              {
                id: '1112',
                resName: '授权模板',
                resCode: '0011',
                resValue: 'home.biz.auth-tmpl',
                checked: true,
                children: []
              },
              {
                id: '1113',
                resName: '消息管理',
                resCode: '1113',
                resValue: 'home.biz.msg-mgt',
                checked: true,
                children: []
              }
            ]
          },
          {
            id: '1200',
            resName: '安全中心',
            resCode: '1100',
            resValue: '',
            checked: true,
            children: [
              {
                id: '1201',
                resName: '重置密码',
                resCode: '0001',
                resValue: 'home.biz.reset-pwd',
                checked: true,
                children: []
              },
              {
                id: '1202',
                resName: '修改登录密码',
                resCode: '0002',
                resValue: 'home.biz.modify-login-pwd',
                checked: true,
                children: []
              },
              {
                id: '1203',
                resName: '修改预留验证信息',
                resCode: '0003',
                resValue: 'home.biz.modify-reserved-info',
                checked: true,
                children: []
              },
              {
                id: '1204',
                resName: '修改支付密码',
                resCode: '0004',
                resValue: 'home.biz.modify-payment-pwd',
                checked: true,
                children: []
              },
              {
                id: '1205',
                resName: '修改密保信息',
                resCode: '0005',
                resValue: 'home.biz.modify-security-info',
                checked: true,
                children: []
              },
              {
                id: '1206',
                resName: '操作日志',
                resCode: '0006',
                resValue: 'home.biz.log-list',
                checked: true,
                children: []
              },
              {
                id: '1207',
                resName: '交互审计',
                resCode: '0007',
                resValue: 'home.biz.remote-list',
                checked: true,
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
});
