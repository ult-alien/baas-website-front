import store from '../store';
import menuUtil from '../utils/menu-util';
import * as types from '../store/mutation-types';

export default {
  hasPermission (to) {
    let menusMap = store.state.menusMap;
    let paramsMatchFlag = true;
    // 如果菜单存在权限控制并且当前用户不拥有菜单，则不如许访问
    if (menusMap[to.name]) {
      let menu = menusMap[to.name];
      // 如果资源存在参数，则要匹配参数
      if (Object.keys(menu.stateParams).length > 0) {
        paramsMatchFlag = Object.keys(menu.stateParams).every((key) => {
          return to.params[key] && to.params[key] === menu.stateParams[key];
        });
      }

      return paramsMatchFlag && menu.checked;
    }

    return true;
  },
  // 导航到合适的路由
  navCorrectRoute (to, from, next) {
    if (to.matched && to.matched.length > 0 && to.matched[0].meta.dynamicMenus) {
      // 自动导航到路由最底层
      let menusMap = store.state.menusMap;
      let firstLinkMenus = null;
      if (menusMap[to.name]) { // 如果该路由匹配到菜单，则重菜单子节点选择要触发的路由
        firstLinkMenus = menuUtil.getFirstLinkMenusFun(menusMap[to.name].children);
      } else { // 如果没匹配到菜单，则从子路由选择菜单匹配
        // firstLinkMenus = menuUtil.getFirstLinkMenusFun(store.state.menus);
        let router = store.state.routerMap[to.name];
        if (router && router.children && router.children.length > 0) {
          for (let i = 0, len = router.children.length; i < len; i++) {
            if (menusMap[router.children[i].name]) {
              firstLinkMenus = menusMap[router.children[i].name];
              break;
            }
          }
        }
      }

      if (firstLinkMenus) {
        store.commit(types.SET_CUR_MENU, this.getTopMenu(firstLinkMenus.stateName));
        next({name: firstLinkMenus.stateName, params: firstLinkMenus.stateParams});
      } else {
        store.commit(types.SET_CUR_MENU, this.getTopMenu(to.name));
        store.commit(types.SET_CUR_ROUTER, to);
        next();
      }
    } else {
      store.commit(types.SET_CUR_ROUTER, to);
      next();
    }
    store.commit(types.SET_PREVIOUS_ROUTER, from);
  },
  // 获取当前菜单
  getTopMenu (value) {
    let menu = {};
    if (value) {
      let indexs = value.split('.');
      let indexStr = '';
      for (let i = 0, len = indexs.length; i < len; i++) {
        if (indexStr === '') {
          indexStr = indexs[i];
        } else {
          indexStr += '.' + indexs[i];
        }
        if (store.state.menusMap[indexStr]) {
          menu = store.state.menusMap[indexStr];
          break;
        }
      }
    }
    return menu;
  },
  getRouterMap (routes) {
    let map = {};
    routes.map(item => {
      map[item.name] = item;
      if (item.children && item.children.length) {
        map = {...map, ...this.getRouterMap(item.children)};
      }
    });
    return map;
  }
};
