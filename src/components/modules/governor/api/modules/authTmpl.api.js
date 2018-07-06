import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  selectTmplByPage (params) {
    let url = HttpPrefix.API + '/authorization/pub-authorization-template/select-template-by-page';
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  updateTemplate (obj) {
    let url = HttpPrefix.API + '/authorization/pub-authorization-template/update-template';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findTemplate (id) {
    let url = HttpPrefix.API + '/authorization/pub-authorization-template/find-template';
    return http.post(url, {id: id}).then(resp => {
      return resp.body;
    });
  },
  addTemplate (obj) {
    let url = HttpPrefix.API + '/authorization/pub-authorization-template/add-template';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  selectAllTemplate () {
    let url = HttpPrefix.API + '/authorization/pub-authorization-template/select-all-template';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  deleteAuthTmpl (tmplId) {
    let url = HttpPrefix.API + '/authorization/pub-authorization-template/delete-tmpl';
    return http.post(url, {tmplId: tmplId}).then(resp => {
      return resp.body;
    });
  }
};
