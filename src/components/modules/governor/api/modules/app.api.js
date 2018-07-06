import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getPageData: (params) => {
    let url = HttpPrefix.API + '/pub-application/select-application';
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  saveData: (params) => {
    let url = HttpPrefix.API + '/pub-application/save-or-update-application';
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  delData: (params) => {
    let url = HttpPrefix.API + '/pub-application/delete-application';
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  getAppName: () => {
    let url = HttpPrefix.API + '/pub-application/get-application';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  updateState (appId, appState) { // 更新状态
    let url = HttpPrefix.API + '/pub-application/update-application-status';
    return http.post(url, {appId, appState}).then(resp => {
      return resp.body;
    });
  },
  getApplication: (params) => {
    let url = HttpPrefix.API + '/pub-application/get-application';
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  checkCode (appCode) { // 验证唯一性
    let url = HttpPrefix.API + '/pub-application/check-application-code';
    return http.post(url, {appCode}).then(resp => {
      return resp.body;
    });
  }
};

