<template>
  <pl-layout class="layout-contianer abrazine">
    <pl-menu slot="left" :menus="subMenus">
      <div class="menu-top">
        <div>
          <div class="icon" v-tooltip="'公告'" @click="go('bsp.biz.mynotice-list')">
            <i class="anticon icon-notification rotateY"></i>
            <el-badge class="menu-top-badge" :value="noticeCount" :max="10"/>
          </div>
        </div>
        <div>
          <div class="icon" v-tooltip="'消息'" @click="go('bsp.biz.msg-mgt')">
            <i class="anticon icon-message"></i>
            <el-badge class="menu-top-badge" :value="msgCount" :max="10"/>
          </div>
        </div>
        <div v-if="showHome">
          <div class="icon" v-tooltip="'首页'" @click="goHome"><i class="anticon icon-home"></i></div>
        </div>
      </div>
    </pl-menu>
    <router-view slot="right"></router-view>
  </pl-layout>
</template>

<script>
  import constantUtil from '../../../core/utils/constant-util';

  const outerLinks = constantUtil.getConstantByKey('Constants.OuterLinks');
  export default {
    computed: {
      subMenus() {
         console.info(this.$store.state.curMenu);
        // return this.$store.state.curMenu.children;

        return [
          {
            resName: '相关说明', stateName: 'example.components.illustration'
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
    },
    msgCount() {
      return this.getMsgTip('notReadedMsgCount');
    },
    noticeCount() {
      return this.getMsgTip('noticeCount');
    },
    showHome() {
      /* let authApps = this.$store.state.contextData.user.extension.authApps;
      let flag = false;
      for (let i = 0, len = authApps.length; i < len; i++) {
        if (authApps[i].appCode === 'CHAINBILL') {
          flag = true;
          break;
        }
      }
      return flag; */
      return true;
    }
  },
  methods: {
    goHome()
    {
      window.location.href = outerLinks['home_link'];
    }
  ,
    go(path)
    {
      this.$router.push({name: path});
    }
  }
  }
  ;
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../assets/scss/variables";

  .abrazine {
    .main-wrapper {
      background: transparent !important;
      .main-left {
        background: rgba(255, 255, 255, 0.8);
      }
      .main-content {
        background: #fff;
      }
    }
    .menu-wrapper {
      > ul > li.menu-item {
        border-top: 0px solid $border-color !important;
      }
      a {
        &.active {
          background: #ffffff;
          border-left: 3px solid $primary-color !important;
          background: #ffffff;
          /* margin-right: -1px;*/
          border: 1px solid $border-color;
          border-right: 0px;
          line-height: 38px;
        }
        &:hover {
          background: #ffffff !important;
          border-left-color: #fff;
        }
      }
    }
  }

  .menu-top {
    /*height: 61px;*/
    /*line-height: 60px;*/
    padding: 10px;
    border-bottom: 1px solid $border-color;
    margin-bottom: -1px;
    display: flex;
    > div {
      flex: 1;
      > a.router-link {
        padding: 0px !important;
        background: transparent !important;
      }
    }
    .home-active .icon {
      width: 62px;
      padding-right: 21px;
      float: right;
      margin-right: -12px;
      border-radius: 20px 0px 0px 20px;
      border-right: #fff;
      background: #fff;
      &:after {
        content: '首页';
        position: absolute;
        top: 0px;
        left: 30px;
        height: 40px;
        padding: 9px 0px;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .icon {
      width: 40px;
      height: 40px;
      margin: 0px auto;
      line-height: 38px;
      text-align: center;
      border: 1px solid $border-color;
      border-radius: 50%;
      font-size: 16px;
      position: relative;
      &:hover {
        background: #fff;
        cursor: pointer;
      }
      .rotateY {
        transform: rotateY(180deg);
      }
    }
    .text {
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      color: $muted-color;
      display: none;
    }
  }

  .menu-top-badge {
    position: absolute;
    top: -17px;
    right: -10px;
  }
</style>


