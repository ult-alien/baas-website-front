import PassStrength from './password-strength.vue';

PassStrength.install = function (Vue) {
  Vue.component(PassStrength.name, PassStrength);
};

export default PassStrength;
