export default {
  /**
   * 获取选中的菜单
   * @param menus
   * @returns {Array}
   */
  findCheckedMenus (menus, map, codeMap) {
    let menusTemp = [];
    if (menus && menus.length > 0) {
      menusTemp = [...menus];
      menusTemp = menusTemp.map(itemTemp => {
        let item = {...itemTemp};
        item.children = this.findCheckedMenus(item.children, map, codeMap);
        let state = this.getState(item.resValue);
        item.stateName = state.name;
        item.stateParams = state.params;

        if (item.stateName && map) {
          map[item.stateName] = item;
        }
        codeMap[item.resCode] = item;
        return item;
      }).filter(item => {
        return item.checked;
      });
    }
    return menusTemp;
  },
  /**
   * 解析路由的值
   * @param routerName
   * @returns {{}}
   */
  getState (routerName) {
    let ret = {};
    let regx = /\(\{(\S|\s)*\}\)/;
    if (routerName && regx.test(routerName)) {
      let rs = regx.exec(routerName);
      ret.name = routerName.replace(rs[0], '');

      let paramRegx = /\{(\S|\s)*\}/;
      if (paramRegx.test(rs)) {
        let paramStr = paramRegx.exec(rs);
        ret.params = JSON.parse(paramStr[0]);
      }
    } else {
      ret.name = routerName;
      ret.params = {};
    }
    return ret;
  },
  /**
   * 获取第个可以触发路由的菜单
   * @param menus
   * @returns {*}
   */
  getFirstLinkMenusFun (menus) {
    let firstLinkMenu = null;
    if (!(menus && menus.length > 0)) {
      return firstLinkMenu;
    }
    for (let i = 0, len = menus.length; i < len; i++) {
      let item = menus[i];
      if (item.children && item.children.length > 0) {
        return this.getFirstLinkMenusFun(item.children);
      } else if (item.resValue) {
        return item;
      }
    }
  },
  /**
   * 根据子菜单编码查找父节点
   * @param menus
   * @param subMenuCode
   */
  findParentMenu (parentMenu, menus, subMenuCode) {
    if (!menus || menus.length === 0) {
      return null;
    }
    for (let i = 0, len = menus.length; i < len; i++) {
      if (menus[i].resCode === subMenuCode) {
        return parentMenu;
      } else {
        let pmenu = this.findParentMenu(menus[i], menus[i].children, subMenuCode);
        if (pmenu) {
          return pmenu;
        }
      }
    }
    return null;
  }
};
