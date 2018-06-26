import DictionarySelect from './dictionary-select.vue';
import DictionaryRadio from './dictionary-radio.vue';
import DictionaryCheckbox from './dictionary-checkbox.vue';

DictionarySelect.install = function (Vue) {
  Vue.component(DictionarySelect.name, DictionarySelect);
  Vue.component(DictionaryRadio.name, DictionaryRadio);
  Vue.component(DictionaryCheckbox.name, DictionaryCheckbox);
};

export default {
  DictionaryRadio,
  DictionarySelect,
  DictionaryCheckbox
};
