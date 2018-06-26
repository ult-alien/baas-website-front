import * as types from './mutation-types';
import Vue from 'vue';
import {MsgType} from '../constants';
// import sysUtil from '../utils/sys-util';
import menuUtil from '../utils/menu-util';

// 登录
export const login = ({commit, dispatch}, param) => {
  let data = {...param};
  // md5 加密
  // data.password = sysUtil.encryptor(data.password);
  return new Promise((resolve, reject) => {
    Vue.api.core.login(data).then(ret => {
      if (ret.type === MsgType.SUCCESS || ret.type === MsgType.INFO) {
        Vue.api.core.getContextData().then(ret2 => {
          setContextDataFun(commit, ret2);
          resolve({isLogin: true, msg: ret});
        });
        // dispatch('refershMsgTip');
      } else {
        resolve({isLogin: false, msg: ret});
      }
    });
  });
};

// 刷新缓存
export const refreshContextData = ({commit, state}) => {
  return new Promise((resolve, reject) => {
    Vue.api.core.refreshContextData().then(ret => {
      let contextData = {...state.contextData};
      if (ret && ret['dictionaryMap']) {
        contextData['dictionaryMap'] = ret['dictionaryMap'];
      }
      if (ret && ret['sysParamsMap']) {
        contextData['sysParamsMap'] = ret['sysParamsMap'];
      }
      commit(types.SET_CONTEXT_DATA, contextData);
      resolve(true);
    });
  });
};

// 设置上下文
export const setContextData = ({commit}, contextData) => {
  setContextDataFun(commit, contextData);
};

const setContextDataFun = (commit, contextData) => {
  let menusMap = {};
  let codeMap = {};
  let menus = menuUtil.findCheckedMenus(contextData.user.menuTree, menusMap, codeMap);
  commit(types.SET_LOGIN_STATE, true);
  commit(types.SET_MENUS, menus);
  commit(types.SET_MENUS_MAP, menusMap);
  commit(types.SET_CODE_MENUS_MAP, codeMap);
  commit(types.SET_CONTEXT_DATA, contextData);
};

// 注销
export const logout = ({commit}) => {
  commit(types.SET_LOGIN_STATE, false);
  commit(types.SET_CONTEXT_DATA, {});
  commit(types.SET_MENUS, []);
  commit(types.SET_CUR_MENU, []);
  commit(types.SET_MENUS_MAP, {});
  commit(types.SET_CODE_MENUS_MAP, {});
};

// 是否显示移动端菜单
export const toggleMobileNav = ({commit, state}, showMobileNav) => {
  commit(types.SET_MOBILENAV, showMobileNav);
};

// 刷新消息提示，
export const refershMsgTip = ({commit, state}, playload) => {
  let key, value;
  if (playload) {
    key = playload.key;
    value = playload.value;
  }
  let msgTipTemp = {...state.msgTip};
  if (key !== undefined && value !== undefined) {
    msgTipTemp[key] = value;
    commit(types.REFRESH_MSG_TIP, msgTipTemp);
  } else {
    Vue.api.core.getMsgTip(key).then(ret => {
      if (ret) {
        Object.keys(ret).forEach(key => {
          msgTipTemp[key] = ret[key];
        });
        commit(types.REFRESH_MSG_TIP, msgTipTemp);
      }
    });
  }
};
