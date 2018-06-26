<template>
  <div class="hexagon-container">
    <div class="hexagon">
      <div class="content"><slot></slot></div>
      <div class="inner-1"></div>
      <div class="inner-2"></div>
    </div>
    <div class="hexagon-title" v-if="title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $width: 78px;
  $height: 45px;
  .hexagon-container {
    display: inline-block;
    /*&:hover{
      cursor: pointer;
      box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
      transform: scale(1.1);
      transition: all 0.5s;
    }*/
    &.color1 .hexagon > div{
      background: #00acd7;
    }
    &.color2 .hexagon > div{
      background: #3bb746;
    }
    &.color3 .hexagon > div{
      background: #48b598;
    }
    &.color4 .hexagon > div{
      background: #fb8d60;
    }
    &.color5 .hexagon > div{
      background: #f8b64d;
    }
    &.color6 .hexagon > div{
      background: #d2ce27;
    }
    .hexagon {
      width: $width;
      height: $height;
      position: relative;
      margin: 25px 0px;
      .content{
        width: $width;
        height: $height;
        position: absolute;
        z-index: 2;
        top: 0px;
        left: 0px;
        line-height: $height;
        text-align: center;
        font-size: 40px;
        color: #fff;
      }
      .inner-1 {
        width: $width;
        height: $height;
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 0px;
        transform: rotate(60deg);
      }
      .inner-2 {
        width: $width;
        height: $height;
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 0px;
        transform: rotate(-60deg);
      }
    }
    .hexagon-title{
      font-size: 14px;
      line-height: 20px;
      padding-top: 5px;
      text-align: center;
    }
  }
</style>


