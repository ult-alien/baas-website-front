import Vue from 'vue';
import VueResource from 'vue-resource';
import {MsgType} from '../constants';
import router from '../router';
import Store from '../store';
import {Notification, MessageBox} from 'element-ui';
import httpUtil from '../utils/http-util';

//  在开发模式下并且开启模拟数据开关的时候才加载模拟数据
if (process.env.NODE_ENV === 'development' && process.mockData) {
  require('./mock_data');
}

Vue.use(VueResource);

// HTTP相关
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;

// 拦截器
Vue.http.interceptors.push((request, next) => {
  // 生成正在的url
  request.url = httpUtil.genPath(request.url);
  // 设置X-Requested-With = XMLHttpRequest 用于后端判断是是否ajax请求
  request.headers.set('X-Requested-With', 'XMLHttpRequest');
  request.credentials = true;
  let noReload = request.noReload;
  let params = request.params;
  request.params = {...httpUtil.getParams(), ...params};

  // 这里对请求体进行处理
  next((response) => {
    // 这里可以对响应的结果进行处理
    let ret = response.body;
    // console.info(ret);
    // 如果是模拟数据，把字符串转换成对象
    if (process.env.NODE_ENV === 'development' && process.mockData && ret && typeof ret === 'string') {
      ret = JSON.parse(ret);
      response.body = ret;
    }

    if (ret.type && ret.type === MsgType.TOLOGIN) {
      // 注销登录状态
      Store.dispatch('logout');
      if (!noReload) {
        router.router.instance.push({name: 'login'});
      }
      return {...response.body, ok: false};
    } if (ret.type && ret.type === MsgType.RELOAD) {
      if (ret.msg) {
        window.location.href = ret.msg;
      } else {
        window.location.reload();
      }
    } else if (ret.show === true) {
      if (ret.type === MsgType.SUCCESS || ret.type === MsgType.INFO) {
        Notification({
          title: ret.title,
          message: ret.msg,
          type: ret.type,
          duration: ret.time > 0 ? ret.time : 1000
        });
      } else {
        MessageBox.alert(ret.msg, ret.title || '提示', {
          confirmButtonText: '确定',
          type: ret.type
        });
      }
    }
  });
});
