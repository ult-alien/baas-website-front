<template>
  <div class="step-block" >
    <div class="step-icon">{{step}}</div>
    <div class="content" :class="type">
      <div class="title">{{title}}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      step: String,
      title: String,
      type: {
        type: String,
        default: 'left' // left, right
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .step-block{
    position: relative;
    padding-bottom: 30px;
    .content {
      min-height: 66px;
      .title{
        line-height: 66px;
        font-size: 20px;
        font-weight: bold;
      }
      &.left{
        padding-right: calc(50% + 50px);
        .title{
          text-align: right;
        }
      }
      &.right{
        padding-left: calc(50% + 50px);
        /*mobile*/
        @media only screen and (max-device-width: 1024px) {
          padding-left: 0;
        }
        .title{
          text-align: left;
        }
      }
    }
    .step-icon{
      position: absolute;
      top: 3px;
      left: 50%;
      margin-left: -30px;
      width: 60px;
      height: 63px;
      background-image: url("step-num-bg.png");
      line-height: 63px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
    }
    &:before{
      content: "";
      position: absolute;
      width: 5px;
      height: calc(100% - 69px);
      background: #0ae;
      left: 50%;
      top: 69px;
      margin-left: -2px;
    }
  }
</style>
