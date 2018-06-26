import loadMore from './load-more.vue';
import pullMore from './pull-more.vue';

loadMore.install = function (Vue) {
  Vue.component(loadMore.name, loadMore);
  Vue.component(pullMore.name, pullMore);
};

export default {
  loadMore,
  pullMore
};
