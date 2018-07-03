<template>
  <div>
    <top-background></top-background>
    <pl-header :menus="[]"    @iconclick="iconClick" @nameclick="nameClick">
      <!--<div slot="action" class="action">
        <span @click="toHome">主页</span>
        <span @click="toService">服务大厅</span>
      </div>-->
    </pl-header>
    <router-view></router-view>
    <!--<side-toolbar></side-toolbar>-->
    <pl-footer></pl-footer>
  </div>
</template>

<script>
 // import {MsgType} from 'core/constants';
  import plFooter from './uiComponents/footer/footer-w.vue';
  import sideToolbar from './uiComponents/sideToolbar/side-toolbar.vue';
  import topBackground from './uiComponents/topBackground/top-background.vue';
  export default {
    computed: {
      menus () {
        return this.$store.state.menus;
      }
    },
    components: {
      plFooter,
      sideToolbar,
      topBackground
    },
    methods: {
      nameClick () {
        this.$router.push({name: 'bsp.biz.personal-info'});
      },
      iconClick () {
        this.$router.push({name: 'bsp.biz.msg-mgt'});
      },
      toHome () {
        const {href} = this.$router.resolve({ name: 'home' });
        window.open(href, '_blank');
      },
      toService () {
        const {href} = this.$router.resolve({ name: 'bsp.srvhall.srvhall-home' });
        window.open(href, '_blank');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../assets/scss/variables";
  /*body{*/
    /*background: url(../../../assets/img/bg.jpg) repeat;*/
  /*}*/
  .action {
    line-height: 50px;
    > span {
      padding: 0px 10px;
      position: relative;
      cursor: pointer;
      &:hover{
        color: $primary-color;
      }
      &:first-child:before {
        content: '';
        position: absolute;
        width: 1px;
        height: 10px;
        top: 4px;
        right: 0px;
        background: $border-color;
      }
    }
  }
</style>


