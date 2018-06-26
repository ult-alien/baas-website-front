
import ConstantSelect from './constant-select.vue';
import ConstantRadio from './constant-radio.vue';
import ConstantCheckbox from './constant-checkbox.vue';

ConstantSelect.install = function (Vue) {
  Vue.component(ConstantSelect.name, ConstantSelect);
  Vue.component(ConstantRadio.name, ConstantRadio);
  Vue.component(ConstantCheckbox.name, ConstantCheckbox);
};

export default {
  ConstantSelect,
  ConstantRadio,
  ConstantCheckbox
};
