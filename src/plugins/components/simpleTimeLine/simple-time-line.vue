<template>
  <div class="time-line-warrper">
    <slot></slot>
  </div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'SimpleTimeLine'
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  .time-line-warrper{
    position: relative;
    min-height: 100%;
    &:before{
      content: '';
      width: 1px;
      height: 100%;
      background: $border-color;
      position: absolute;
      left: 30px;
      top: 0px;
    }
    padding-left: 30px;
    padding-top: 30px;
  }
</style>


