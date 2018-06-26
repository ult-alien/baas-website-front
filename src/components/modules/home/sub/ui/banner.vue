<template>
  <div :style="{height: height}" class="banner-wrapper">
    <el-carousel trigger="click" :height="height">
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <img :src="item.imgUrl" alt="首页轮播图" :style="{'width': '100%', 'height': height}" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        height: 780 / (1920 / window.screen.availWidth) + 'px',
        images: [
          {imgUrl: 'static/images/index/banner/1.jpg'},
          {imgUrl: 'static/images/index/banner/2.jpg'}
        ]
      };
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/variables";
  .banner-wrapper{
    margin-top: 60px;
  }
</style>


