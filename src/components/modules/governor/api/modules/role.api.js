import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  // getPageData就是api接口
  getPageData: (params) => {
    let url = HttpPrefix.API + '/authorization/pub-role/select-role'; // 路径为/api/example/role/getPageData
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  getResourceRole (obj) {
    let url = HttpPrefix.API + '/authorization/pub-role/select-resource-role';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  saveData: (params) => {
    let url = HttpPrefix.API + '/authorization/pub-role/add-role';
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  delData: (params) => {
    let url = HttpPrefix.API + '/authorization/pub-role/delete-role';
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  updateState (roleId, roleState) { // 更新状态
    let url = HttpPrefix.API + '/authorization/pub-role/update-role-state-with-cascade';
    return http.post(url, {roleId, roleState}).then(resp => {
      return resp.body;
    });
  },
  selectRole4AuthUser (entId, userId) { // 查询用户可以授权的角色
    let url = HttpPrefix.API + '/authorization/pub-role/select-role4-auth-user';
    return http.post(url, {entId, userId}).then(resp => {
      return resp.body;
    });
  },
  checkCode (roleId, roleCode) { // 验证角色代码的唯一性
    let url = HttpPrefix.API + '/authorization/pub-role/check-role-code';
    return http.post(url, {roleId, roleCode}).then(resp => {
      return resp.body;
    });
  },
  authResourceToRole (roleId, roleIds) {
    let url = HttpPrefix.API + '/authorization/pub-role/auth-role-to-role';
    return http.post(url, {roleId, roleIds}).then(resp => {
      return resp.body;
    });
  },
  getResourceTreeData4User (roleId, type) {
    let url = HttpPrefix.API + '/authorization/pub-role/select-resource-tree-data4-role';
    return http.post(url, {roleId, type}).then(resp => {
      return resp.body;
    });
  },
  getApp4Admin () {
    let url = HttpPrefix.API + '/authorization/pub-role/get-app4-admin';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  selectAllRole (roleName) {
    let url = HttpPrefix.API + '/authorization/pub-role/select-all-role';
    return http.post(url, {roleName}).then(resp => {
      return resp.body;
    });
  }
};

