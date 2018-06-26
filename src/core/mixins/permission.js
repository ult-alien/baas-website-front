import Vue from 'vue';
Vue.mixin({
  methods: {
    hasPermission (code) {
      let menusCodeMap = this.$store.state.menusCodeMap;
      if (menusCodeMap[code] && menusCodeMap[code].checked) {
        return true;
      }
      return false;
    }
  }
});
