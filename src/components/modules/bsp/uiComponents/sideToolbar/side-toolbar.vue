<template>
  <div class="side-toolbar" :class="{'show-back-top': backTop}">
    <toolbar-item icon="anticon icon-scan" text="关注我们">
      <toolbar-layer title="扫一扫,关注我们">
        <div><img src="./img/QRcode.png" width="150px"/></div>
      </toolbar-layer>
    </toolbar-item>
   <!-- <toolbar-item icon="el-icon-service" text="咨询热线">
      <toolbar-layer title="咨询热线">
        <div style="white-space: nowrap">400-800-8888</div>
      </toolbar-layer>
    </toolbar-item>-->
    <toolbar-item icon="el-icon-service" text="在线咨询" @click.native="qq">
      <!--<toolbar-layer title="咨询热线">
        <div style="white-space: nowrap">400-800-8888</div>
      </toolbar-layer>-->
    </toolbar-item>
    <toolbar-item v-if="backTop" icon="el-icon-arrow-up" text="返回顶部" @click.native="toTop"></toolbar-item>
  </div>
</template>

<script>
  import toolbarItem from './toolbar-item.vue';
  import toolbarLayer from './toolbar-layer.vue';
  export default {
    data () {
      return {
        backTop: false,
        bottom: 30
      };
    },
    components: {
      toolbarItem,
      toolbarLayer
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('resize', this.handleScroll, false);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('resize', this.handleScroll, false);
    },
    methods: {
      toTop () {
        window.scrollTo(0, 0);
      },
      qq () {
        window.open('http://wpa.qq.com/msgrd?v=3&uin=3022377653&site=qq&menu=yes');
      },
      handleScroll () {
        this.backTop = window.pageYOffset >= this.bottom;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .side-toolbar{
    width: 45px;
    position: fixed;
    top: calc(50% - 45px);
    right: 10px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    .side-toolbar-item:last-child {
      margin-bottom: 0px;
    }
    &.show-back-top{
      /*bottom: 50px;*/
    }
    z-index: 10;
  }
</style>


