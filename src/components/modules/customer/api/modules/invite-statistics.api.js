import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getInviteStatisticsList: (obj) => {
    let url = HttpPrefix.API + '/invitation/invite-statistics/get-invite-statistics-list';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getInviteStatisticsDetail: (obj) => {
    let url = HttpPrefix.API + '/invitation/invite-statistics/get-invite-statistics-detail';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getInviteStatisticsTotal: (obj) => {
    let url = HttpPrefix.API + '/invitation/invite-statistics/get-invite-statistics-total';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
