<template>
  <div>
    <header class="header-wrapper" :class="{'header-shadow':headerShadow}" :style="{'background-color': background, 'position': position}">
      <div class="header-content">
        <div class="logo" @click="logoClick">
          <logo>
            <span style="color: #000;" slot="companyName">GBaaS</span>
          </logo>
        </div>
        <div class="nav-bar">
          <ul ref="headerNav" :class="[$store.state.showMobileNav ? 'mobileNav' : '' ]">
            <li v-for="item in menus">
              <template v-if="item.openMode=='target_blank'">
                <template v-if="routerBlank(item.stateName)">
                  <a target="_blank" :href="item.stateName">{{item.resName}}</a>
                </template>
                <template v-else>
                  <router-link active-class="active" target="_blank" :to="{name: item.stateName, params: item.stateParams}">{{item.resName}}</router-link>
                </template>
              </template>
              <template v-else>
                <template v-if="routerBlank(item.stateName)">
                  <a  :href="item.stateName">{{item.resName}}</a>
                </template>
                <template v-else>
                  <router-link active-class="active" @click.native="toggleMobileNav(false)" :to="{name: item.stateName, params: item.stateParams}">
                    {{item.resName}}
                </router-link>
                </template>
              </template>
            </li>
          </ul>
        </div>
        <div class="account" v-if="isLogin">
          <span class="msg" @click="iconClick">
            <el-badge :value="msgCount" :max="99" class="item"/>
            <img src="./img/male.png">
          </span>
          <span class="name" style="color: black;">
            <span>{{user.userName}}</span>
            &nbsp;<i class="anticon icon-down text-muted"></i>
          </span>
          <div class="account-down">
            <div class="item">
              <span class="item-icon" style="color: black"><i class="plicon plicon-xiangqing"></i></span><span style="color: black">基本信息</span>
            </div>
            <div class="item" @click="logout">
              <span class="item-icon" style="color: black"><i class="plicon plicon-tuichu"></i></span><span style="color: black">退出</span>
            </div>
          </div>

          <span class="name" v-if="isLogin">
            <span @click="nameClick">{{user.userName}}</span>
            &nbsp;|&nbsp;
            <span @click="logout">退出</span>
          </span>
        </div>
        <div class="pull-right">
          <slot name="action"></slot>
          <i class="portal portal-menu" id="menuIcon" @click="toggleMobileNav()"></i>
        </div>
      </div>
    </header>
    <change-ent ref="changeEnt"></change-ent>
  </div>
</template>
<script>
  import config from '../config';
  import baseCofig from '../../../config';
  import {MsgType} from 'core/constants';
  import changeEnt from './change-ent.vue';
  import logo from '../../../components/modules/home/sub/ui/logo.vue';
  export default {
    name: config.prefix + 'Header',
    props: {
      menus: {
        default: () => {
          return [];
        },
        type: Array
      },
      logoUrl: '',
      headerTitle: {
        type: String,
        default: process.common.projectName
      },
      headerShadow: {
        default: true,
        type: Boolean
      },
      background: {
        type: String,
        default: '#fff'
      },
      position: {
        type: String,
        default: 'fixed'
      }
    },
    data () {
      return {
        showDev: process.env.NODE_ENV === 'development',
        member: ''
      };
    },
    computed: {
      msgCount () {
        return this.$store.state.msgTip['NotReadedCount'] || 0;
      },
      user () {
        return this.$store.state.contextData.user || {};
      },
      isLogin () {
        return this.$store.state.isLogin;
      }
    },
    methods: {
      logout () {
        // this.$emit('logout');
        this.$confirm('确定要退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }).then(() => {
          this.$api.core.logout();
          this.$store.dispatch('logout');
          this.$router.push({name: 'login'}); /// 加入
        });
      },
      iconClick () {
        this.$emit('iconclick');
      },
      nameClick () {
        this.$emit('nameclick');
      },
      entClick () {
        this.$refs['changeEnt'].show();
      },
      logoClick () {
        this.$router.push({path: baseCofig.defaultRoute()});
      },
      routerBlank (stateName) {
        if (stateName) {
          return stateName.indexOf('http') !== -1;
        }
        return false;
      },
      toggleMobileNav (val) {
        if (val!==undefined) {
          this.$store.dispatch('toggleMobileNav', val)
        } else {
          this.$store.dispatch('toggleMobileNav', !this.$store.state.showMobileNav);
        }
      }
    },
    components: {
      changeEnt,
      logo
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/index";

  .srvhall{
    position: relative;
    padding: 0 20px;
    @extend .pull-right;
    line-height: $header-height - 10px;
    font-size: 12px;
  }
  .gap{
    &:before{
      content: ' ';
      position: absolute;
      height: $header-height * 2 / 5;
      width: 1px;
      border-left: 1px solid #aaa;
      top: 50%;
      transform: translateY(-50%);
      left: 5px;
    }
  }

  .header-wrapper {
    z-index: 1000;
    $img-size: 44px;
    $img-margin: ($header-height - $img-size - 10px)/2 0px;
    height: $header-height;
    padding: 5px 0px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    color: #fff;
    &.header-shadow {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .header-content {
      @extend .container;
      height: $header-height - 10px;
      .portal-menu{
        opacity: 0;
        color: #000;
      }
      .logo {
        width: $left-menu-bar-width;
        height: $header-height - 10px;
        line-height: $header-height - 10px;
        @extend .pull-left;
        display: inline-block;
        text-align: left;
        cursor: pointer;
        > img {
          height: $img-size;
        /*  width: $img-size;*/
          margin: $img-margin;
          float: left;
        }
        > span {
          display: inline-block;
          height: $img-size;
          line-height: $img-size;
          float: left;
          padding-left: 15px;
          font-size: 20px;
          margin: $img-margin;
        }
      }
      .nav-bar {
        height: 100%;
        @extend .pull-right;
        display: inline-block;
        > ul {
          margin: 0;
          height: $header-height - 10px;
          list-style: none;
          > li {
            float: left;
            display: inline-block;
            height: 100%;
            > a {
              text-decoration: none;
              height: 100%;
              line-height: $header-height - 10px;
              padding: 0px 20px;
              display: block;
              cursor: pointer;
              color: #000;
              font-size: 16px;
              @include transition;
              &:active {
                position: relative;
                &:before {
                  width: 100%;
                }
              }
              position: relative;
              &:before{
                position: absolute;
                width: 0;
                content: "";
                height: 3px;
                background: #06b7e9;
                left: 50%;
                bottom: -5px;
                transition: all .2s;
                transform: translateX(-50%);
              }
              &.active, &:hover {
                position: relative;
                &:before {
                  width: 100%;
                }
              }
            }
          }
        }

      }
      .account {
        @extend .pull-right;
        display: inline-block;
        position: relative;
        &:hover {
          // border: 1px solid $border-color;
          border-bottom: 0px;
          padding: 0px 4px 5px;
          .account-down {
            display: block;
          }
          &:before {
            content: "";
            position: absolute;
            top: 54px;
            height: 2px;
            width: 100%;
            background: #fff;
            z-index: 2;
            right: 0px;
          }
          .name > i {
            transform: rotate(180deg);
          }
        }
        height: 55px;
        margin-bottom: -5px;
        padding: 1px 5px 5px;
        .account-down {
          z-index: 1;
          min-width: 150px;
          display: none;
          position: absolute;
          background: #fff;
          width: calc(100% + 2px);
          top: 54px;
          right: -1px;
          box-shadow: 5px 5px 5px #cccccc;
          border: 1px solid $border-color;
          /*border-top: 0px;*/
          .item {
            padding: 10px;
            line-height: 30px;
            border-bottom: 1px solid $border-color;
            @include clearfix;
            @include text-ellipsis;
            vertical-align: middle;
            cursor: pointer;
            > span {
              display: inline-block;
            }
            .item-icon {
              padding-left: 5px;
              width: 40px;
            }
            &:last-child {
              border-bottom: 0px;
            }
            &:hover {
              background: $dark-white;
            }
          }
        }
        .msg {
          position: relative;
          float: left;
          cursor: pointer;
          > .item {
            top: 0px;
            left: $img-size - 15px;
            position: absolute;
          }
        }
        img {
          @include border-radius;
          float: left;
          height: $img-size;
          width: $img-size;
          margin: $img-margin;
        }
        > .name {
          display: inline-block;
          float: left;
          line-height: $header-height - 11px;
          padding-left: 10px;
          vertical-align: middle;
          position: relative;
          > span {
            display: inline-block;
            cursor: pointer;
          }
          > i {
            display: inline-block;
            transition: all 1s;
            transform: rotate(0deg);
          }
        }
      }
      .dev {
        @extend .pull-right;
        line-height: $header-height - 10px;
        padding: 0px 10px;
        font-size: 12px;
      }
    }
  }





  /**
  *  mobile
  */
  @media only screen
  and (max-device-width: 1024px) {
    .header-wrapper {
      .header-content{
        line-height: 50px;
        .portal-menu{
          transition: all .2s;
          opacity: 1;
        }
        position: relative;
        .nav-bar{
          > ul {
            background: #666;
            transition: all .2s;
            height: auto;
            position: absolute;
            display: none;
            top: 55px;
            right: 0;
            overflow: hidden;
            &.mobileNav{
              display: block;
            }
            > li{
              float: none;
              display: block;
              text-align: left;
              > a{
                color: #fff;
                &:before{
                  bottom: 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>


