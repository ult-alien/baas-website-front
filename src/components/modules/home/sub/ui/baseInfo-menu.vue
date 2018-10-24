<template>
  <pl-layout class="layout-contianer">
    <pl-menu slot="left" :menus="subMenus"></pl-menu>
    <router-view slot="right"></router-view>
  </pl-layout>
</template>

<script>
  //路由配置
  export default {
    computed: {
      subMenus() {
        return [
          {
            resName: '个人信息', stateName: 'example.components.illustration'
          },
          {
            resName: '账户信息', stateName: 'example.components.icons'
          },
          {
            resName: 'API-key',
            children: [
              {resName: '页头(header)', stateName: 'example.components.header'},
              {resName: '基本布局组件', stateName: 'example.components.layout'}
            ]
          }
        ];
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


