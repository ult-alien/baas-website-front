import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getCooperationAgencyList: (obj) => { // 查询合作机构列表
    let url = HttpPrefix.API + '/operation/cooperation-agency/get-cooperation-agency-list';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getCooperationAgencyVo: (obj) => { // 查询合作机构详情
    let url = HttpPrefix.API + '/operation/cooperation-agency/get-cooperation-agency-vo';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  saveCooperationAgencyData: (obj) => { // 保存合作机构
    let url = HttpPrefix.API + '/operation/cooperation-agency/save-cooperation-agency-data';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  deleteAcct: (obj) => { // 删除合作机构银行账户
    let url = HttpPrefix.API + '/operation/cooperation-agency/delete-acct';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
