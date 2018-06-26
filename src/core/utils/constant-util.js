import store from '../store';
export default {
  getConstant (key) {
    if (key === undefined || store.state.contextData === undefined || store.state.contextData.constantsValueMap === undefined) {
      return [];
    }
    let constantsValueMap = store.state.contextData.constantsValueMap;
    let keys = key.split('.');

    if (keys.length === 2) {
      if (constantsValueMap[keys[0]] && constantsValueMap[keys[0]][keys[1]]) {
        return constantsValueMap[keys[0]][keys[1]];
      } else {
        return [];
      }
    } else {
      return [];
    }
  },
  getConstantByKey (key) {
    if (key === undefined || store.state.contextData === undefined || store.state.contextData.constantsNameValueMap === undefined) {
      return [];
    }
    let constantsValueMap = store.state.contextData.constantsNameValueMap;
    let keys = key.split('.');

    if (keys.length === 2) {
      if (constantsValueMap[keys[0]] && constantsValueMap[keys[0]][keys[1]]) {
        return constantsValueMap[keys[0]][keys[1]];
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
};
