import Vue from 'vue';
import 'babel-polyfill';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  isLogin: false,
  contextData: {
    // constantsNameValueMap: {},
    // constantsValueMap: {},
    // dictionaryMap: {},
    // sysParamsMap: {},
    // systemMode: {},
    // user: {userId: '', userName: '', loginName: '', menuTree: [{resId,resCode,resName,resType,chlidren:[]}]}
  },
  menus: [], // 根据user的menuTree生成，指只包括checked == true 的菜单
  menusMap: {}, //  根据user的menuTree生成
  menusCodeMap: {}, // 根据user的menuTree生成
  routerMap: {}, // 系统启动的时候自动生成
  curMenu: {}, // 路由切换的时候生成
  previousRouter: {}, // 前路由； 路由切换的时候，自动生成
  curRouter: {}, // 当前路由； 路由切换的时候，自动生成
  msgTip: {}, // 消息提示
  showMobileNav: false // 是否显示移动端菜单
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug
});
