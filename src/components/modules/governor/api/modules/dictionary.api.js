import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  save: (obj) => {
    let url = HttpPrefix.API + '/pub-dictionary/save';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  update: (obj) => {
    let url = HttpPrefix.API + '/pub-dictionary/update-dictionary';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  find: (id) => {
    let url = HttpPrefix.API + '/pub-dictionary/find-dictionary';
    return http.post(url, {dicId: id}).then(resp => {
      return resp.body;
    });
  },
  getResourceTreeData: (obj) => {
    let url = HttpPrefix.API + '/pub-dictionary/select-dictionarys';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  updateState: (dicId, parentId, inUse) => {
    let url = HttpPrefix.API + '/pub-dictionary/update-dictionary-state-with-cascade';
    return http.post(url, {dicId, parentId, inUse}).then(resp => {
      return resp.body;
    });
  },
  checkCode: (dicId, dicCode) => {
    let url = HttpPrefix.API + '/pub-dictionary/check-code';
    return http.post(url, {dicId, dicCode}).then(resp => {
      return resp.body;
    });
  }
};
