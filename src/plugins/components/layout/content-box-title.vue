<template>
  <div class="content-box-title-wrapper" :class="{'min':min}">
    <div class="content-box-title">
      <span><slot></slot></span>
    </div>
    <div class="content-box-title-right">
      <div class="content-box-title-toolbar">
        <slot name="toolbar"></slot>
      </div>
      <div class="content-box-title-tip">
        <slot name="tip"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'ContentBoxTitle',
    props: {
      min: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixin";

  .content-box-title-wrapper {
    padding: $context-header-y-padding $context-header-x-padding;
    line-height: 36px;
    border-bottom: 1px solid $border-color;
    @include clearfix;
    .content-box-title {
      float: left;
      font-size: 17px !important;
      @include clearfix;
      /*> span {
        border-left: 5px solid $primary-color;
        padding: 5px 20px 5px 15px;
        background: $primary-color-light;
        border-radius: 0 15px 15px 0;
      }*/
    }

    > div{
      padding-right: 20px;
    }
    .content-box-title-right{
      float: right;
      padding-right:0px;
      .content-box-title-tip{
        float: right;
      }
      .content-box-title-toolbar{
        float: right;
        padding-left: 10px;
      }
    }
    &.min{
      padding: 10px 10px;
      .content-box-title {
        font-size: 14px !important;
        line-height: 20px;
      }
    }
  }
</style>
