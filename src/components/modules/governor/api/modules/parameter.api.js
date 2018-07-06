import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  select: (bizCode, parmRlatId) => {
    let url = HttpPrefix.API + '/pub-parameter/get-parameter-list';
    return http.post(url, {bizCode, parmRlatId}).then(resp => {
      return resp.body;
    });
  },
  update: (obj) => {
    let url = HttpPrefix.API + '/pub-parameter/save-param';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
