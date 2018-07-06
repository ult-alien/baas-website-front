<template>
  <div class="layout-contianer">
    <pl-header :show-srvhall="true"></pl-header>
    <router-view></router-view>
    <pl-footer></pl-footer>
  </div>
</template>

<script>
  import plFooter from '../uiComponents/footer/footer-w.vue';
  export default {
    data () {
      return {
        params: {
          searchStr: ''
        }
      };
    },
    components: {
      plFooter
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
