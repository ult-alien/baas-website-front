<template>
  <div class="pk" v-if="showPk"></div>
</template>

<script>
  export default {
    data () {
      return {
        showPk: true
      };
    },
    mounted () {
      let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
      let isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
      let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; // 判断是否IE浏览器
      let isEdge = userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE; // 判断是否IE的Edge浏览器
      if (isEdge || isIE) {
        this.showPk = false;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .pk {
    height: 180px;
    opacity: .3;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: -1;
    -webkit-filter: blur(100px);
    -moz-filter: blur(100px);
    -o-filter: blur(100px);
    -ms-filter: blur(100px);
    filter: blur(100px);
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='100');
    background-image: url('img/pk.jpg');
  }
</style>


