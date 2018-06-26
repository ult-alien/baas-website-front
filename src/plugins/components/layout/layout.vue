<template>
   <div>
    <div class="main-wrapper">
      <div class="main-left" v-if="showLeft">
        <slot name="left"></slot>
      </div>
      <div class="main-content">
        <slot name="right"></slot>
      </div>
      <slot></slot>
    </div>
   </div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'Layout',
    props: {
      showLeft: {
        default: true,
        type: Boolean
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/index";

  .main-wrapper {
    border: 1px solid $border-color;
    background-color: $main-background-color;
    padding: 0px;
    @include border-radius(0px);
    > .main-left {
      display: table-cell;
      border-right: 1px solid $border-color;
      min-width: $left-menu-bar-width;
    }
    > .main-content {
      display: table-cell;
      width: 3000px;
      vertical-align: top;
    /*  background: url("img/content-bg.png") no-repeat bottom left;*/
    }
  }
</style>


