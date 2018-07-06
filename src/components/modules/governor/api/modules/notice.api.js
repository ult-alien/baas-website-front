import { HttpPrefix } from '../config';
import {http} from 'vue';

export default {
  getNotices: (obj) => {
    let url = HttpPrefix.API + '/pub-notice/get-notices';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getNoticeDetail: (noticeId) => {
    let url = HttpPrefix.API + '/pub-notice/get-notice-detail';
    return http.post(url, {noticeId}).then(resp => {
      return resp.body;
    });
  },
  addNotice: (obj) => {
    let url = HttpPrefix.API + '/pub-notice/save-or-update-notice';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  delNotice: (obj) => {
    let url = HttpPrefix.API + '/pub-notice/delete-notice';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getAllNotices: (obj) => {
    let url = HttpPrefix.API + '/pub-notice/get-all-notices';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  updateNoticeState: (noticeId, noticeState) => {
    let url = HttpPrefix.API + '/pub-notice/update-notice-state';
    return http.post(url, {noticeId, noticeState}).then(resp => {
      return resp.body;
    });
  }
};
