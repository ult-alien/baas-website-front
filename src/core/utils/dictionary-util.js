import store from '../store';
export default {
  getDic (key) {
    if (key === undefined || store.state.contextData === undefined || store.state.contextData.dictionaryMap === undefined) {
      return;
    }
    let dictionaryMap = store.state.contextData.dictionaryMap;
    let keys = key.split('.');
    let curDic = dictionaryMap[keys[0]];

    if (keys.length === 1) {
      return curDic;
    } else {
      for (let i = 1, len = keys.length; i < len; i++) {
        let children = curDic.children;
        let subDic = null;
        if (children) {
          children.forEach(item => {
            if (item && item.dicCode === keys[i]) {
              subDic = item;
              return;
            }
          });
        }
        if (subDic) {
          curDic = subDic;
        } else {
          return;
        }
      }
    }

    return curDic;
  }
};
