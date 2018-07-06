import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  checkCusCode: (cusId, cusCode) => { // 检查会员号
    let url = HttpPrefix.API + '/base/pub-customer-c/check-cus-code';
    return http.post(url, {cusId, cusCode}).then(resp => {
      return resp.body;
    });
  },
  checkCusName: (cusId, cusName) => { // 检查会员名称
    let url = HttpPrefix.API + '/base/pub-customer-c/check-cus-name';
    return http.post(url, {cusId, cusName}).then(resp => {
      return resp.body;
    });
  },
  selectCustomerList: (obj) => { // 查询会员信息列表
    let url = HttpPrefix.API + '/base/pub-customer-c/select-customer-list';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findMemberForFin: (obj) => { // 查找我的客户
    let url = HttpPrefix.API + '/base/customer/find-member-for-fin';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  saveCus: (obj) => { // 保存客户
    let url = HttpPrefix.API + '/base/customer/save-cus';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findSupplierForFin: (obj) => { // 运营商查找供应商
    let url = HttpPrefix.API + '/base/customer/find-supplier-for-fin';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getCustomer: (cusId) => { // 查看会员信息详情
    let url = HttpPrefix.API + '/base/pub-customer-c/get-customer';
    return http.post(url, {cusId}).then(resp => {
      return resp.body;
    });
  },
  selectEnterpriseInfo: (cusId) => { // 查看会员信息详情
    let url = HttpPrefix.API + '/base/customer/select-enterprise-info';
    return http.post(url, {cusId}).then(resp => {
      return resp.body;
    });
  },
  saveEnterpriseInfo: (obj) => { // 保存会员信息
    let url = HttpPrefix.API + '/base/customer/save-ent-info';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findAllCus: (obj) => { // 保理新增供应商查询平台所有的企业信息
    let url = HttpPrefix.API + '/base/customer/find-all-cus';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findCus: (obj) => { // 查询列表
    let url = HttpPrefix.API + '/base/customer/find-cus';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findCusByType: (cusType) => { // 查询列表
    let url = HttpPrefix.API + '/base/customer/find-cus-by-type';
    return http.post(url, {cusType}).then(resp => {
      return resp.body;
    });
  },
  checkAcctNo: (acctNo, cusId) => { // 校验银行卡卡号唯一性
    let url = HttpPrefix.API + '/base/pub-customer-c/check-acct-no';
    return http.post(url, {acctNo, cusId}).then(resp => {
      return resp.body;
    });
  },
  getAprvCus: (obj) => { // 查询待审批客户
    let url = HttpPrefix.API + '/base/customer/get-aprv-cus';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getModItems: (obj) => { // 查询变更项
    let url = HttpPrefix.API + '/base/customer/get-mod-items';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  trialPass: (obj) => { // 初审通过
    let url = HttpPrefix.API + '/base/customer/trial-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  finalPass: (obj) => { // 终审通过
    let url = HttpPrefix.API + '/base/customer/final-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  trialReject: (obj) => { // 初审驳回
    let url = HttpPrefix.API + '/base/customer/trial-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  finalReject: (obj) => { // 终审驳回
    let url = HttpPrefix.API + '/base/customer/final-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
