import { HttpPrefix } from '../config';
import { http } from 'vue';
import httpUtil from '../../../../../core/utils/http-util';
import sysUtil from '../../../../../core/utils/sys-util';

export default {
  getFinAndFocalCusList: (obj) => { // 查询保理商
    let url = HttpPrefix.API + '/invitation/invt-cus/get-fin-and-focal-cus-list';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findInvitations (obj) {
    let url = HttpPrefix.API + '/invitation/invt-cus/find-invitations';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  invite (invtIds) {
    let url = HttpPrefix.API + '/invitation/invt-cus/invite';
    return http.post(url, {invtIds}).then(resp => {
      return resp.body;
    });
  },
  findSuppliers (obj) {
    let url = HttpPrefix.API + '/invitation/invt-cus/find-suppliers';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getInviteCode: () => {
    let url = HttpPrefix.API + '/invitation/invt-cus/get-invite-code';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  editInvitation (obj) {
    let url = HttpPrefix.API + '/invitation/invt-cus/edit-invitation';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  impt (fileId, inviteeCusType) {
    let url = HttpPrefix.API + '/invitation/invt-cus/impt';
    return http.post(url, {fileId, inviteeCusType}).then(resp => {
      return resp.body;
    });
  },
  downloadTemplate (type) {
    let url = HttpPrefix.API + '/invitation/invt-cus/download-template';
    url = httpUtil.genPath(url);
    sysUtil.download(url, {type});
  }
};
