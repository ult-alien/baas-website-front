import Vue from 'vue';
Vue.mixin({
  methods: {
    refershMsgTip (key) {
      this.$store.dispatch('refershMsgTip', {key});
    },
    getMsgTip (key) {
      return this.$store.state.msgTip[key];
    }
  }
});
