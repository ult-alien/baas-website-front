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
            resName: '简介', stateName: 'example.components.illustration'
          },
          {
            resName: '图标', stateName: 'example.components.icons'
          },
          {
            resName: '综合实列', stateName: 'example.components.integrate'
          },
          {
            resName: '布局组件',
            children: [
              {resName: '页头(header)', stateName: 'example.components.header'},
              {resName: '基本布局组件', stateName: 'example.components.layout'}
            ]
          },
          {
            resName: '数据组件',
            children: [
              {resName: '分页表格(pageTable)', stateName: 'example.components.pageTable'},
              {resName: '日期组件(datePicker)', stateName: 'example.components.datePicker'},
              {resName: '树型下拉组件(treeSelect)', stateName: 'example.components.tree-select'},
              {resName: '常量组件(constant)', stateName: 'example.components.constant'},
              {resName: '字典组件(dictionary)', stateName: 'example.components.dictionary'},
              {resName: '数字输入(inputNumber)', stateName: 'example.components.inputNumber'},
              {resName: '加载更多(loadMore)', stateName: 'example.components.loadMore'},
              {resName: '上传(upload)', stateName: 'example.components.upload'},
              {resName: '选中框(selectBox)', stateName: 'example.components.selectBox'},
              {resName: '远程搜索下拉框(remoteSelect)', stateName: 'example.components.remoteSelect'},
              {resName: '日期范围组件(dateRange)', stateName: 'example.components.dateRange'}
            ]
          },
          {
            resName: '其他组件',
            children: [
              {resName: '锚点(affix)', stateName: 'example.components.affix'},
              {resName: '返回顶部(backTop)', stateName: 'example.components.backTop'},
              {resName: '消息提示(empty-tip)', stateName: 'example.components.empty-tip'},
              {resName: '提示(tooltip)', stateName: 'example.components.tooltip'},
              {resName: '穿梭框组件(transfer)', stateName: 'example.components.transfer'},
              {resName: '密码强度(passStrength)', stateName: 'example.components.pass-strength'},
              {resName: '左右弹框(sidePopup)', stateName: 'example.components.side-popup'},
              {resName: '时间轴(roundTimeLine)', stateName: 'example.components.round-time-line'}
            ]
          },
          {
            resName: '文档组件',
            children: [
              {resName: '表格(apiTable)', stateName: 'example.components.apiTable'},
              {resName: '代码示例组件(codeBox)', stateName: 'example.components.codeBox'},
              {resName: '表单验证(form)', stateName: 'example.components.form'}
            ]
          }
        ];
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


