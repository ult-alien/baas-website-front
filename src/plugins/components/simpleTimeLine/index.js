import SimpleTimeLine from './simple-time-line.vue';
import TimeLineItem from './time-line-item.vue';

SimpleTimeLine.install = function (Vue) {
  Vue.component(SimpleTimeLine.name, SimpleTimeLine);
  Vue.component(TimeLineItem.name, TimeLineItem);
};

export default {SimpleTimeLine, TimeLineItem};
