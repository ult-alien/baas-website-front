import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getAccounts: (obj) => {
    let url = HttpPrefix.API + '/base/account/get-accounts';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  addAcct: (obj) => {
    let url = HttpPrefix.API + '/base/account/add-acct';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getAprvAccts: (obj) => {
    let url = HttpPrefix.API + '/base/account/get-aprv-accts';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  trialReject: (obj) => {
    let url = HttpPrefix.API + '/base/account/trial-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  trialPass: (obj) => {
    let url = HttpPrefix.API + '/base/account/trial-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  finalPass: (obj) => {
    let url = HttpPrefix.API + '/base/account/final-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  finalReject: (obj) => {
    let url = HttpPrefix.API + '/base/account/final-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  setDefault: (acctId) => {
    let url = HttpPrefix.API + '/base/account/set-default';
    return http.post(url, {acctId: acctId}).then(resp => {
      return resp.body;
    });
  },
  setInvalid: (acctId) => {
    let url = HttpPrefix.API + '/base/account/set-invalid';
    return http.post(url, {acctId: acctId}).then(resp => {
      return resp.body;
    });
  }
};
