import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  save: (obj) => {
    let url = HttpPrefix.API + '/organization/pub-organ/save-organ-record';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  update: (obj) => {
    let url = HttpPrefix.API + '/organization/pub-organ/update-organ-record';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getOrganTreeData: (obj) => {
    let url = HttpPrefix.API + '/organization/pub-organ/select-organ-tree';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 转移到customer
  updateState: (organId, parentId, organState) => {
    let url = HttpPrefix.API + '/organization/pub-organ/update-organ-state-with-cascade';
    return http.post(url, {organId, parentId, organState}).then(resp => {
      return resp.body;
    });
  },
  find: (id) => {
    let url = HttpPrefix.API + '/organization/pub-organ/select-organ-by-id';
    return http.post(url, {organId: id}).then(resp => {
      return resp.body;
    });
  },
  checkCode: (organId, organCode) => {
    let url = HttpPrefix.API + '/organization/pub-organ/check-code';
    return http.post(url, {organId, organCode}).then(resp => {
      return resp.body;
    });
  },
  selectByOrganName: (organName) => {
    let url = HttpPrefix.API + '/organization/pub-organ/select-by-organ-name';
    return http.post(url, organName).then(resp => {
      return resp.body;
    });
  },
  selectByOrganId: (id) => {
    let url = HttpPrefix.API + '/organization/pub-organ/select-organ-by-id';
    return http.post(url, {organId: id}).then(resp => {
      return resp.body;
    });
  },
  selectOrganTypeList: (obj) => {
    let url = HttpPrefix.API + '/organization/pub-organ/select-organ-type-list';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  saveOrganType: (obj) => {
    let url = HttpPrefix.API + '/organization/pub-organ/save-organ-type';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  updateOrganType: (obj) => {
    let url = HttpPrefix.API + '/organization/pub-organ/update-organ-type';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  updateOrganTypeState: (organType, typeState) => {
    let url = HttpPrefix.API + '/organization/pub-organ/update-organ-type-state';
    return http.post(url, {organType, typeState}).then(resp => {
      return resp.body;
    });
  },
  checkOrganType: (organType, parentType) => {
    let url = HttpPrefix.API + '/organization/pub-organ/check-organ-type';
    return http.post(url, {organType, parentType}).then(resp => {
      return resp.body;
    });
  },
  selectAllType: (organTypes) => {
    let url = HttpPrefix.API + '/organization/pub-organ/select-all-type';
    return http.post(url, {organTypes}).then(resp => {
      return resp.body;
    });
  },
  selectByOrganType: (organType) => {
    let url = HttpPrefix.API + '/organization/pub-organ/select-by-organ-type';
    return http.post(url, {organType}).then(resp => {
      return resp.body;
    });
  },
  checkOrganTypeState: (organType, typeState) => {
    let url = HttpPrefix.API + '/organization/pub-organ/check-organ-type-state';
    return http.post(url, {organType, typeState}).then(resp => {
      return resp.body;
    });
  }
};
