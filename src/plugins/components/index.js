import PageNav from './pageNav';
import Header from './header';
import Menu from './menu';
import Layout from './layout';
import Affix from './affix';
import BackTop from './backTop';
import ApiTable from './apiTable';
import CodeBox from './codeBox';
import PageTable from './pageTable';
import DatePicker from './datePicker';
import Tooltip from './tooltip';
import EmptyTip from './emptyTip';
import TreeSelect from './treeSelect';
import Constant from './constant';
import Dictionary from './dictionary';
import Transfer from './transfer';
import PassStrength from './passStrength';
import InputNumber from './inputNumber';
import CitySelect from './citySelect';
import LoadMore from './loadMore';
import Emitter from '../mixins/emitter';
import Upload from './upload';
import Elinput from './input';
import SimpleTimeLine from './simpleTimeLine';
import SidePopup from './sidePopup';
import Autocomplete from './autocomplete';
import RemoteSelect from './remoteSelect';
const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;

  Vue.component(PageNav.name, PageNav);
  Vue.component(Header.name, Header);
  Vue.component(Menu.name, Menu);
  Vue.component(Affix.name, Affix);
  Vue.component(BackTop.name, BackTop);
  Vue.component(ApiTable.name, ApiTable);
  Vue.component(CodeBox.name, CodeBox);
  Vue.component(PageTable.name, PageTable);
  Vue.component(EmptyTip.name, EmptyTip);
  Vue.component(TreeSelect.name, TreeSelect);
  Vue.component(Transfer.name, Transfer);
  Vue.component(PassStrength.name, PassStrength);
  Vue.component(InputNumber.name, InputNumber);
  Vue.component(CitySelect.name, CitySelect);
  Vue.component(Elinput.name, Elinput);
  Vue.component(SidePopup.name, SidePopup);
  Vue.component(Autocomplete.name, Autocomplete);
  Vue.component(RemoteSelect.name, RemoteSelect);

  for (let key in LoadMore) {
    let component = LoadMore[key];
    Vue.component(component.name, component);
  }

  for (let key in Layout) {
    let component = Layout[key];
    Vue.component(component.name, component);
  }

  for (let key in DatePicker) {
    let component = DatePicker[key];
    Vue.component(component.name, component);
  }

  for (let key in Constant) {
    let component = Constant[key];
    Vue.component(component.name, component);
  }

  for (let key in Dictionary) {
    let component = Dictionary[key];
    Vue.component(component.name, component);
  }
  for (let key in Upload) {
    let component = Upload[key];
    Vue.component(component.name, component);
  }

  for (let key in SimpleTimeLine) {
    let component = SimpleTimeLine[key];
    Vue.component(component.name, component);
  }

  Vue.use(Tooltip);
  Vue.mixin(Emitter);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  PageNav,
  Header,
  Menu,
  ...Layout,
  ...DatePicker,
  ...Constant,
  ...Dictionary,
  ...LoadMore,
  ...Upload,
  Affix,
  BackTop,
  ApiTable,
  CodeBox,
  PageTable,
  Tooltip,
  EmptyTip,
  TreeSelect,
  Transfer,
  InputNumber,
  CitySelect
};
