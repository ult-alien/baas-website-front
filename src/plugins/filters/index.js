import dictionary from './dictionary.filter';
import constant from './constant.filter';
import replace from './replace.filter';
import applicationsName from './applicationsName.filter';
import date from './date.filter';

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;

  Vue.filter('dictionary', dictionary);
  Vue.filter('constant', constant);
  Vue.filter('replace', replace);
  Vue.filter('applicationsName', applicationsName);
  Vue.filter('date', date);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  dictionary,
  constant,
  replace,
  applicationsName
};
