import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui'; // element-ui 组件
import AMap from 'vue-amap';
import 'assets/fonts/iconFont/iconfont.css';// iconfont 图标
import 'assets/fonts/plIcon/iconfont.css';// iconfont 图标
import 'assets/fonts/portalIcon/iconfont.css';// iconfont 图标
import router from './core/router'; // 路由相关的配置
import store from './core/store'; // vuex配置
import api from './core/api'; // 系统及api
import PlComponents from './plugins/components'; // 自定义组件
import Filters from './plugins/filters'; // 自定义过滤器
import Vue2Filters from 'vue2-filters'; // 第三方过滤器，把vue1的过滤器移值到vue2 https://github.com/freearhey/vue2-filters
import config from './config';  // 项目配置
import './core/mixins/permission';
import './core/mixins/msg-tip';
import './assets/scss/element-variables.scss'; // element-ui 组件样式
import './assets/scss/theme-reset.scss'; // element-ui 组件样式覆盖
import './assets/scss/_index.scss'; // 项目自定义样式

// 使用业务模块 (注意不要随便移动位置，要放在安装api和路由之前)
if (config && config.modules) {
  Object.keys(config.modules).map((item) => {
    Vue.use(config.modules[item]);
  });
}

Vue.use(ElementUI, {size: 'medium'}); // 使用ElementUI组件
Vue.use(api); // 使用api插件
Vue.use(PlComponents); // 使用自定义组件
Vue.use(Filters); // 使用自定义过滤器
Vue.use(Vue2Filters); // 使用过滤器
Vue.use(router); // 使用路由
Vue.use(AMap); // 使用地图

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '31d7a67979b35b73f9d413c5415cac9a',
  // 插件集合
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  uiVersion: '1.0', // 版本号
  v: '1.4.4'
});

// 创建根组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router.router.instance,
  store // （缩写）相当于 store:store
});
