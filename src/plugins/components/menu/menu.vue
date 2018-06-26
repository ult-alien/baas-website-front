<template>
  <div class="menu-wrapper">
    <div><slot></slot></div>
    <ul>
      <li class="menu-item" v-for="item in menusTree">
        <a v-if = '!item.stateName' class="disabled" @click="toggle(item)"
           :class="{'active': parentMenu && parentMenu.expanded === false && parentMenu.resCode === item.resCode }" >
          <span class="menu-icon"><i :class="item.extension1"></i>&nbsp;</span>
          {{item.resName}} <el-badge :value="item.msgTip" :max="99" class="item" v-show="!item.expanded"/>
          <span class="arrow" :class="{'up': item.expanded}"  v-if="item.children && item.children.length > 0">
            <i class="el-icon-arrow-down"></i>
          </span>
        </a>
        <router-link  v-if = 'item.stateName'
                      active-class="active"
                      :to="{name: item.stateName, params: item.stateParams}">
          <span class="menu-icon"><i :class="item.extension1"></i>&nbsp;</span>
          {{item.resName}} <el-badge :value="item.msgTip" :max="99" class="item" v-show="!item.expanded"/>
          <span class="arrow" v-if="item.children && item.children.length > 0">
            <i class="anticon icon-down"></i>
          </span>
        </router-link>
        <ul class="sub-menu-item" v-for="subItem in item.children " v-show="item.expanded">
          <li>
            <a v-if = '!subItem.stateName' class="disabled"> {{subItem.resName}}</a>
            <template v-if="subItem.openMode=='target_blank'">
              <template v-if="routerBlank(subItem.stateName)">
                <a v-if = 'subItem.stateName'  target="_blank" :href="subItem.stateName">{{subItem.resName}} <el-badge :value="subItem.msgTip" :max="99" class="item"/></a>
              </template>
              <template v-esle>
                <router-link v-if = 'subItem.stateName' active-class="active" target="_blank" :to="{name: subItem.stateName, params: subItem.stateParams}">{{subItem.resName}}<el-badge :value="subItem.msgTip" :max="99" class="item"/></router-link>
              </template>
            </template>
            <template v-else>
              <template v-if="routerBlank(subItem.stateName)">
                <a v-if = 'subItem.stateName' :href="subItem.stateName">{{subItem.resName}} <el-badge :value="subItem.msgTip" :max="99" class="item"/></a>
              </template>
              <template v-else>
                <router-link
                  v-if = 'subItem.stateName'
                  active-class="active"
                  :to="{name: subItem.stateName, params: subItem.stateParams}">
                  {{subItem.resName}} <el-badge :value="subItem.msgTip" :max="99" class="item"/>
                </router-link>
              </template>
            </template>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import config from '../config';
  import menuUtil from '../../../core/utils/menu-util';
  export default {
    name: config.prefix + 'Menu',
    props: {
      menus: {
        default () {
          return [];
        },
        type: Array
      }
    },
    data () {
      return {
        menuDatas: [],
        curRouter: '',
        menusMap: {}
      };
    },
    computed: {
      parentMenu () {
        let curRouter = this.$store.state.curRouter;
        let pmenu;
        if (this.menusMap[curRouter.name]) {
          let menu = this.menusMap[curRouter.name];
          pmenu = menuUtil.findParentMenu(null, this.menuDatas, menu.resCode);
          if (this.curRouter !== curRouter) {
            this.curRouter = curRouter;
            if (pmenu && pmenu.expanded !== undefined) {
              pmenu.expanded = true;
            }
          }
        }
        return pmenu;
      },
      menusTree () {
//        let msgTip = {
//          'sugarcane-payment-review': 3,
//          'sugarcane-money-fill-review': 4
//        };
        let msgTip = this.$store.state.msgTip;
        this.menuDatas.forEach(item => {
          if (msgTip[item.resCode] && msgTip[item.resCode] > 0) {
            item.msgTip = msgTip[item.resCode];
          } else {
            item.msgTip = 0;
          }

          if (item.children && item.children.length > 0) {
            item.children.forEach(subItem => {
              if (msgTip[subItem.resCode] && msgTip[subItem.resCode] > 0) {
                subItem.msgTip = msgTip[subItem.resCode];
              } else {
                subItem.msgTip = 0;
              }
              item.msgTip += subItem.msgTip;
            });
          }
        });

        return this.menuDatas;
      }
    },
    created () {
      let menus = JSON.parse(JSON.stringify(this.menus));
      menus.forEach(item => {
        if (item.expanded === undefined) {
          this.$set(item, 'expanded', true);
        }
      });
      this.menusMap = this.getMenusMap(menus);
      this.menuDatas = menus;
    },
    methods: {
      getMenusMap (menus, level = 0, menusMap = {}) {
        for (let i = 0, len = menus.length; i < len; i++) {
          if (menus[i].resCode === undefined) {
            menus[i].resCode = level + '_' + i;
          }

          menusMap[menus[i].stateName] = menus[i];
          if (menus[i].children && menus[i].children.length > 0) {
            this.getMenusMap(menus[i].children, level + 1, menusMap);
          }
        }
        return menusMap;
      },
      toggle (item) {
        item.expanded = !item.expanded;
      },
      go (item) {
        this.$router.push({name: item.stateName, params: item.stateParams});
      },
      routerBlank (stateName) {
        if (stateName) {
          return stateName.indexOf('http') !== -1;
        }
        return false;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixin";

  .menu-wrapper {
    $menu-padding-left: 30px;
    > ul > li.menu-item {
      cursor: pointer;
      &.item-padding {
        padding: 6px 0px;
      }
      border-top: 1px solid $border-color;
      &:first-child {
        > a{
          height: 60px;
          line-height: 60px;
          .arrow {
            line-height: 62px;
          }
          .menu-icon{
            line-height: 60px;
          }
        }
        border-top: 0px solid $border-color;
      }
      .sub-menu-item {
        a {
          padding-left: $menu-padding-left * 2 - 3px;
          cursor: pointer;
          transition: background 1s;
        }
      }
      > a {
        height: 52px;
        line-height: 52px;
      }
    }

    a {
      height: 40px;
      line-height: 40px;
      position: relative;
      width: auto;
      @include text-ellipsis;
      display: block;
      text-decoration: none;
      padding-left: $menu-padding-left*2 - 3px;
      border-left: 3px solid transparent;
      position: relative;
      .menu-icon{
        position: absolute;
        display: block;
        left: 20px;
        width: 40px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        font-size: 22px;
        color: $font-color-light !important;
      }
      &.active{
        background: $primary-color-light;
        border-left: 3px solid $primary-color !important;
      }
      &.disabled{
        color: $font-color-light !important;
      }
      &:hover {
        background: $dark-white;
        border-left-color: $dark-white;
      }
      .arrow{
        line-height: 52px;
        position: absolute;
        right: 0px;
        top: 0px;
        padding-right: 10px;
        font-size: 12px;
        > i {
          transition: all 1s;
          transform: rotate(0deg);
        }
        &.up > i {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
