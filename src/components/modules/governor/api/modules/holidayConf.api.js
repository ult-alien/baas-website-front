import { HttpPrefix } from '../config';
import {http} from 'vue';
export default {
  queryHoliday: (obj) => {
    let url = HttpPrefix.API + '/pub-date/query-holiday';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  setHolidayStatus: (obj) => {
    let url = HttpPrefix.API + '/pub-date/set-holiday-status';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  cancelHoliday: (obj) => {
    let url = HttpPrefix.API + '/pub-date/cancel-holiday';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
