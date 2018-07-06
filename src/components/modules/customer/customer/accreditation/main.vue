<template>
  <div>
    <pl-header :show-srvhall="true"></pl-header>
    <pl-layout class="layout-contianer accreditation-main" style="margin-top: 90px;" :show-left="false"  >
      <router-view slot="right"></router-view>
    </pl-layout>
    <pl-footer></pl-footer>
  </div>
</template>

<script>
  import plFooter from '../../../governor/uiComponents/footer/footer-w.vue';
  export default {
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
    },
    components: {
      plFooter
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .accreditation-main{
    > .main-wrapper{
      min-height: 700px;
      >.main-content{
        min-height: 700px;
      }
    }
  }
</style>


