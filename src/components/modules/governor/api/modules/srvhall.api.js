import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getSrvHallItemByPage: (obj) => {
    let url = HttpPrefix.API + '/srvhall/svrhall/get-srvhall-item-by-page';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  saveSrvhallItem: (obj) => {
    let url = HttpPrefix.API + '/srvhall/svrhall/save-srvhall-item';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getHotSrvhallItem: (obj) => {
    let url = HttpPrefix.API + '/srvhall/svrhall/get-hot-srvhall-item';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  delSrvhallItem: (obj) => {
    let url = HttpPrefix.API + '/srvhall/svrhall/del-srvhall-item';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getHotNum: (obj) => {
    let url = HttpPrefix.API + '/srvhall/svrhall/get-hot-num';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getSrvhallCategory: (obj) => {
    let url = HttpPrefix.API + '/srvhall/svrhall/get-srvhall-category';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getSrvhallItemByCategory: (obj) => {
    let url = HttpPrefix.API + '/srvhall/svrhall/get-srvhall-item-by-category';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getSrvhallCat: (obj) => { // 获取服务大厅分类
    let url = HttpPrefix.API + '/srvhall/svrhall/get-srvhall-cat';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
