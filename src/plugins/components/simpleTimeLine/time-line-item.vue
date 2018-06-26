<template>
  <div  class="time-line-item">
    <div class="title"><small><slot name="title"></slot></small></div>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'TimeLineItem'
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  .time-line-item{
    .content {
      margin-left: 20px;
      margin-right: 20px;
      padding: 10px;
      background: #f2f2f2;
      /*border-radius: 3px;*/
      font-size: 12px;
      position: relative;
      &:before{
        position: absolute;
        width: 0px;
        height: 0px;
        border-width: 10px 0px 0px 10px;
        border-color: transparent transparent transparent #f2f2f2;
        border-style: solid;
        content: '';
        top:-5px;
        left: 0px;
      }
    }
    position: relative;
    margin-bottom: 20px;
    .title {
      position: relative;
      height: 30px;
      line-height: 31px;
      padding-left: 20px;
      &:before{
        content: '';
        width: 11px;
        height: 11px;
        border: 1px solid $primary-color;
        border-radius: 50%;
        background: #fff;
        position:absolute;
        left: -6px;
        top: 10px;
      }
    }
  }
</style>


