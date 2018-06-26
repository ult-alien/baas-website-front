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
        /* if (this.isLogin) { /// 如果已经登录
          let authApps = this.$store.state.contextData.user.extension.authApps;
          let appsLinks = authApps.map((item) => {
            return {resName: item.appAlias, stateName: item.appUrl};
          });
          return [{resName: '首页', stateName: 'home'}, ...appsLinks];
        } */
        if (this.isLogin) {
            this.$store.dispatch('logout');
        }
        return [
          {resName: '首页', stateName: 'index'},
         /* {resName: '产品', stateName: 'login'},*/
          {resName: '产品', stateName: 'product'},
          {resName: '区块链', stateName: 'block-chain'},
          {resName: '合作洽谈', stateName: 'negotiate'},
          {resName: '关于我们', stateName: 'about'}
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

</style>


