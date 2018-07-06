import { HttpPrefix } from '../config';
import { http } from 'vue';
import sysUtil from 'core/utils/sys-util';
import httpUtil from 'core/utils/http-util';

export default {
  save (obj) {
    let url = HttpPrefix.API + '/authorization/pub-resource/add-resource';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  update (obj) {
    let url = HttpPrefix.API + '/authorization/pub-resource/update-resource';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  find (id) {
    let url = HttpPrefix.API + '/authorization/pub-resource/find-resource';
    return http.post(url, {resId: id}).then(resp => {
      return resp.body;
    });
  },
  getResourceTreeData (obj) {
    let url = HttpPrefix.API + '/authorization/pub-resource/select-resource-tree';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  updateState (resId, inUse) {
    let url = HttpPrefix.API + '/authorization/pub-resource/update-resource-state-with-cascade';
    return http.post(url, {resId, inUse}).then(resp => {
      return resp.body;
    });
  },
  checkCode (resId, resCode) {
    let url = HttpPrefix.API + '/authorization/pub-resource/check-code';
    return http.post(url, {resId, resCode}).then(resp => {
      return resp.body;
    });
  },
  genSql (resId) {
    let url = HttpPrefix.API + '/authorization/pub-resource/gen-sql';
    url = httpUtil.genPath(url);
    sysUtil.download(url, resId);
  },
  getResourceTreeData4Role (roleId) {
    let url = HttpPrefix.API + '/authorization/pub-resource/select-resource-tree4-role';
    return http.post(url, {roleId}).then(resp => {
      return resp.body;
    });
  },
  getResourceTreeData4User (roleIds, userId, appIds) {
    let url = HttpPrefix.API + '/authorization/pub-resource/select-resource-tree4-user';
    return http.post(url, {roleIds, userId, appIds}).then(resp => {
      return resp.body;
    });
  },
  authResourceToRole (roleId, resIds, type) {
    let url = HttpPrefix.API + '/authorization/pub-resource/auth-resource-to-role';
    return http.post(url, {roleId, resIds, type}).then(resp => {
      return resp.body;
    });
  },
  authResourceToUser (userId, entId, roleIds, resIds) {
    let url = HttpPrefix.API + '/authorization/pub-resource/auth-resource-to-user';
    return http.post(url, {userId, entId, roleIds, resIds}).then(resp => {
      return resp.body;
    });
  },
  selectAllRes (resName) {
    let url = HttpPrefix.API + '/authorization/pub-resource/select-all-res';
    return http.post(url, {resName}).then(resp => {
      return resp.body;
    });
  }
};
