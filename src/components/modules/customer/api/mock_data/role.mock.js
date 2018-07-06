// import Mock from 'mockjs';
// import { MsgType } from 'core/constants';
// 模拟列表数据
// Mock.mock(/\/authorization\/pub-role\/select-role/, {
//   'data|10': [
//     {
//       'roleId|+1': '0001',
//       'roleCode': '1000',
//       'roleName|+1': [
//         '蔗农',
//         '经办员',
//         '审核员',
//         '管理员'
//       ],
//       'terminalCode|+1': [
//         '1',
//         '0'
//       ],
//       'groupId|+1': [
//         '0',
//         '1',
//         '2'
//       ],
//       'inUse|+1': [
//         '1',
//         '0'
//       ],
//       'note': 'xxxxx',
//       'creatorId': '1',
//       'createTime': '@date("yyyy-MM-dd")',
//       'editorId': '12',
//       'editTime': '@date("yyyy-MM-dd")',
//       'checked': '1'
//     }
//   ],
//   'total|100': 100
// });
//
// 模拟单条数据
// Mock.mock(/\/example\/role\/getData/, {
//  'roleId': '0001',
//  'roleCode': '1000',
//  'roleName|+1': [
//    '蔗农',
//    '经办员',
//    '审核员',
//    '管理员'
//  ],
//  'terminalCode': [
//    '1',
//    '0'
//  ],
// 角色分组：0:运营端角色,糖网角色，
//           1：成员企业角色，糖厂角色
//           2：供应商企业角色'，蔗农角色
//  'groupId|+1': [
//    '0',
//    '1',
//    '2'
//  ],
// 是否使用：1：正常，2：禁用
//  'inUse|+1': [
//    '1',
//    '0'
//  ],
//  'note': 'xxxxx',
//  'creatorId': '1',
//  'createTime': '@date("yyyy-MM-dd")',
//  'editorId': '12',
//  'editTime': '@date("yyyy-MM-dd")',
//  'checked': '1'
// });
//
// 模拟保存数据
// Mock.mock(/\/example\/role\/saveData/, {
//  type: MsgType.SUCCESS, show: true, msg: '保存成功！', title: null, bean: null
// });
//
// 模拟删除数据
// Mock.mock(/\/example\/role\/delData/, {
//  type: MsgType.SUCCESS, show: true, msg: '删除成功！', title: null, bean: null
// });
//
