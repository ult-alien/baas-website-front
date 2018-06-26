<template>
  <div class="content-box-toolbar-wrapper"
       :class="borderClass"><slot></slot></div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'ContentBoxToolbar',
    props: {
      border: {
        type: [Boolean, String],
        default: true
      }
    },
    computed: {
      borderClass () {
        let classObj = {
          top: 'border-top',
          bottom: 'border-bottom'
        };

        if (this.border === false) {
          return '';
        }

        return classObj[this.border] ? classObj[this.border] : 'border-bottom';
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixin";
  .content-box-toolbar-wrapper{
    padding: 12px 30px 0px;
    @include clearfix;
    &.border-top{
      border-top: 1px solid $border-color;
    }
    &.border-bottom{
      border-bottom: 1px solid $border-color;
    }
    .el-form-item{
      margin-bottom: 12px !important;
      .el-date-editor {
        width: 100% !important;
      }
      .el-select {
        width: 100% !important;
      }
      .el-input-number{
        width: 100% !important;
      }
    }
    /*.el-date-editor.el-input{*/
      /*width: auto !important;*/
    /*}*/
    /*.el-input-number{*/
      /*width: auto !important;*/
    /*}*/
    > .pull-left,
    > .pull-right,
    > .el-button,
    > .el-input,
    > .el-input-group{
      margin-bottom: 12px !important;
    }

  }
  .ivu-affix .content-box-toolbar-wrapper{
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px -2px 3px rgba(51, 51, 51, 0.25);
  }
</style>


