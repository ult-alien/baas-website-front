<template>
  <div class="content-item-text" :class="{'single': !isMultiLine, 'multiLine': isMultiLine}"><slot></slot></div>
</template>

<script>
  import config from '../config';
  export default {
    props: {
      isMultiLine: {
        type: Boolean,
        default: false
      }
    },
    name: config.prefix + 'ContentItemText'
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  .content-item-text{
    padding: 0 10px;
    line-height: 36px;
    color: $font-color;
    &.single {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    &.multiLine {
      padding: 8px 10px;
      line-height: 20px;
    }
  }
</style>


