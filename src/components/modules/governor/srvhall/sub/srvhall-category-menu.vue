<template>
  <div class="menu-wrapper">
    <ul>
      <li class="menu-item" v-for="item in menus" >
        <a class="disabled" @click="toggle(item)"
           :class="{'active': item.expanded }"    v-if="item.subCat && item.subCat.length > 0">
          {{item.catName}}
          <span class="arrow" :class="{'up': item.expanded}" >
            <i class="el-icon-arrow-down"></i>
          </span>
        </a>
        <a class="disabled"  @click="querySrvhallItem(item)" v-else>
          {{item.catName}}
        </a>
        <ul class="sub-menu-item" v-for="subItem in item.subCat " v-show="item.expanded">
          <li @click="querySrvhallItem(subItem)">
            <a class="disabled" :class="{'selected': (selectedCat && subItem.catId === selectedCat.subCat)}">{{subItem.catName}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      selectedCat: {
        type: Object
      },
      selectedItem: {
        type: Object
      }
    },
    data () {
      return {
        menus: []
      };
    },
    methods: {
      toggle (item) {
        item.expanded = !item.expanded;
      },
      querySrvhallItem (subCat) {
        this.$emit('querySrvhallItem', {'subCat': subCat.catId});
      },
      loadMenus () {
        // 查询分类
        this.$api.bsp.srvhall.getSrvhallCat().then(ret => {
          this.menus = ret.map(item => {
            item.expanded = true;
            return item;
          });
          window.setTimeout(() => {
            this.$emit('loaded');
          }, 200);
        });
      }
      /* expandMenu (selected, oldVal) {
        this.menus.forEach((item, index) => {
          if (selected.catId && selected.catId === item.catId) {
            item.expanded = true;
          }
        });
      } */
    },
    beforeMount () {
      this.loadMenus();
    }
    /* watch: {
      selectedItem: {
        handler (val, oldVal) {
          if (this.menus && this.menus.length > 0) {
            this.expandMenu(val, oldVal);
          } else {
            // 监听menu
            this.$watch('menus', function (newVal, oldVal) {
              this.expandMenu(val, oldVal);
            });
          }
        },
        deep: true
      }
    } */
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/variables";
  @import "../../../../../assets/scss/mixin";

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
         /* width: 180px;*/
          @include text-ellipsis;
          &:hover, &.selected{
            color: $primary-color !important;
          }
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
      padding-left: $menu-padding-left - 3px;
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
