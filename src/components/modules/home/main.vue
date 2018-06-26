<template>
  <div class="wrapper">
    <ui-header v-if="$route.meta.needHeader !== false"></ui-header>
    <router-view @click.native="hideMobileNav"></router-view>
    <ui-footer></ui-footer>
  </div>
</template>

<script>
  import uiFooter from './sub/ui/footer.vue';
  import uiHeader from './sub/ui/header.vue';
  export default {
    data () {
      return {
        mobileNav: false
      };
    },
    components: {
      uiFooter,
      uiHeader
    },
    methods: {
      hideMobileNav () {
        this.$store.dispatch('toggleMobileNav', false);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~assets/scss/variables";
  @import "~assets/scss/portal";
  .wrapper{
    .news-card{
      cursor: pointer;
    }
    .block-card-content{
      p{
        line-height: 24px;
        margin: 0;
      }
      padding: 10px;
      .block-card-title{
        text-align: center;
        font-size: 1.2em;
        line-height: 40px;
        height: 40px;
      }
    }
  }
</style>


