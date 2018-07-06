import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getMsgList: (message) => {
    let url = HttpPrefix.API + '/pub-message/get-my-messages-by-page';
    return http.post(url, message).then(resp => {
      return resp.body;
    });
  },
  setMsgReaded: (messageIds) => {
    let url = HttpPrefix.API + '/pub-message/set-pub-message-readed';
    return http.post(url, {messageIds}).then(resp => {
      return resp.body;
    });
  },
  saveTemplate: (message) => {
    let url = HttpPrefix.API + '/pub-message-template/save-template';
    return http.post(url, message).then(resp => {
      return resp.body;
    });
  },
  selectTemplates: (message) => {
    let url = HttpPrefix.API + '/pub-message-template/select-templates';
    return http.post(url, message).then(resp => {
      return resp.body;
    });
  },
  selectTemplate: (id) => {
    let url = HttpPrefix.API + '/pub-message-template/select-template';
    return http.post(url, {id}).then(resp => {
      return resp.body;
    });
  }
};
