// import Mock from 'mockjs';
// import {MsgType} from '../../common/js/constants';
//
// // 模拟列表数据
// Mock.mock(/\/user\/pub-user\/select-users-by-page/, {
//   'data|10': [
//     {
//       'loginName|+1': [
//         '张学友',
//         '黎明',
//         '郭富城',
//         '刘德华'
//       ],
//       'userName|+1': [
//         'aaa',
//         'bbb',
//         'ccc',
//         'ddd'
//       ],
//       'roles|+1': ['经办员', '管理员'],
//       'userState|+1': ['冻结', '正常'],
//       'phoneNo|+1': ['20', '30', '40', '19'],
//       'certNo|+1': ['20', '30', '40', '19']
//     }
//   ],
//   'total|100': 100
// });
//
// // 模拟单条数据
// Mock.mock(/\/example\/user\/getData/, {
//   'loginName|+1': [
//     '张学友',
//     '黎明',
//     '郭富城',
//     '刘德华'
//   ],
//   'userName|+1': [
//     'aaa',
//     'bbb',
//     'ccc',
//     'ddd'
//   ],
//   'roles|+1': ['经办员', '管理员'],
//   'userState|+1': ['冻结', '正常'],
//   'phoneNo|+1': ['20', '30', '40', '19'],
//   'certNo|+1': ['20', '30', '40', '19']
// });
//
// // 模拟新增数据
// Mock.mock(/\/user\/pub-user\/add-user/, {
//   type: MsgType.SUCCESS, show: true, msg: '保存成功！', title: null, bean: null
// });
//
// // 模拟更新数据
// Mock.mock(/\/user\/pub-user\/update-user/, {
//   type: MsgType.SUCCESS, show: true, msg: '更新成功！', title: null, bean: null
// });
//
// // 模拟删除数据
// Mock.mock(/\/user\/pub-user\/delete-user/, {
//   type: MsgType.SUCCESS, show: true, msg: '删除成功！', title: null, bean: null
// });
