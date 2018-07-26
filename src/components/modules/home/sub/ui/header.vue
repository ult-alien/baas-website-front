<template>
  <div>
  <pl-header :menus="menus" :background="background" :header-shadow="headerShadow" :position="position">
  </pl-header>
  </div>

</template>

<script>
  import {MsgType} from 'core/constants';
  export default {
    computed: {
      menus () {
        if (this.isLogin) { /// 如果已经登录
          return [{resName: '首页', stateName: 'index'}];
        }
        // if (this.isLogin) {
        //     this.$store.dispatch('logout');
        // }
        return [
          {resName: '首页', stateName: 'index'},
          {resName: '产品概述', stateName: 'product'},
         // {resName: '菜单', stateName: 'api-menu'},
          {resName: 'API', stateName: 'baas-api'},
          {resName: '区块链', stateName: 'block-chain'},
          {resName: '合作洽谈', stateName: 'negotiate'},
          {resName: '关于我们', stateName: 'about'},
          {resName: '登录', stateName: 'login'}
        ];
      },
      isLogin () {
        return this.$store.state.isLogin;
      }
    },
    methods: {
      go (path) {
        this.$router.push({name: path});
      }
    },
    props: {
      background: {
        type: String
      },
      headerShadow: {
        type: Boolean,
        default: true
      },
      position: {
        type: String
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .copyright{
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #23282d;
    color: #fff;
    &.mobile{
      display: none;
      line-height: normal;
      height: auto;
      padding: 4px 0;
    }
  }
</style>


