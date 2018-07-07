import { HttpPrefix } from '../../constants';
import { http } from 'vue';

export default {
  checkUserExist: (obj) => {
    let url = HttpPrefix.API + '/accreditation/accreditation/check-user-exist';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findUserByPhone: (obj) => {
    let url = HttpPrefix.API + '/accreditation/accreditation/find-user-by-phone';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
