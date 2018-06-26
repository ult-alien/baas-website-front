<template>
  <div style="width: 100%;">
    <div class="Coops" style="margin-top: 0;margin-bottom: 0">
     <!-- <div class="title-block"><span class="title">已合作</span></div>-->
      <!--<div class="title-mobile"><span class="title">已合作</span></div>-->
     <!-- <el-carousel trigger="click" height="180px"  indicator-position="outside" :autoplay="false">
        <el-carousel-item v-for="(item, index) in hasCoop" :key="index">
          <div class="carouselItem">
            <div class="carouselItem-box" v-for="pic in item" :style="{'width': pic.width}">
            <div class="thum">
              <img :src="pic.url" width="120" height="80">
            </div>
            <h4>{{pic.name}}</h4>
            <div class="hover-layer">
              <div class="hover-inner">
                <div class="ver-in">
                  <p class="no-indent">{{pic.name}}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          &lt;!&ndash;<div class="img" v-for="pic in item" :style="{'background-image': 'url('+ pic.url +')'}" :class="[pic.hidden ? 'pic-hidden' : '']"></div>&ndash;&gt;
        </el-carousel-item>
      </el-carousel>-->

      <el-row :gutter="0" class="carousel">
        <el-col :xs="getXsSpan(index)" class="carouselItem-box" :md="getMdSpan(index)" v-for="(pic, index) in coops" :key="index">
          <img :src="pic.url">
          <div class="hover-layer">
            <p class="no-indent">{{pic.name}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--<common-title slot="title" style="padding: 0px;">即将合作</common-title>
    <div class="Coops">
      &lt;!&ndash;<div class="title-block"><span class="title">即将合作</span></div>&ndash;&gt;
      &lt;!&ndash;<div class="title-mobile"><span class="title">即将合作</span></div>&ndash;&gt;
      <el-carousel trigger="click" height="180px" indicator-position="outside" :autoplay="false">
        <el-carousel-item v-for="(item, index) in waitCoop" :key="index">
          <div class="carouselItem">
            <div class="carouselItem-box" v-for="pic in item">
              <div class="thum">
                <img :src="pic.url" width="120" height="80">
              </div>
              <h4>贝贝思</h4>
              <div class="hover-layer">
                <div class="hover-inner">
                  <div class="ver-in">
                    <h5>贝贝思</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          &lt;!&ndash;<div class="img" v-for="pic in item" :style="{'background-image': 'url('+ pic.url +')'}" :class="[pic.hidden ? 'pic-hidden' : '']"></div>&ndash;&gt;
        </el-carousel-item>
      </el-carousel>
    </div>-->
  </div>
</template>

<script>
  import commonTitle from '../ui/common-title.vue';
  export default {
    computed: {
      coops () {
        let screenWidth = window.parseInt(window.screen.availWidth);
        return [
          {
            url: 'static/images/index/hascoop/zhengxuan.png',
            hidden: false,
            name: '正轩投资',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/lianhe.png',
            hidden: false,
            name: '联合利丰',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/biya.png',
            hidden: false,
            name: '比亚迪',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/wanke.png',
            hidden: false,
            name: '万科采筑',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/jingke.png',
            hidden: false,
            name: '晶科能源',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/zhaoshang.png',
            hidden: false,
            name: '招商银行',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/pufa.png',
            hidden: false,
            name: '浦发银行',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/xingqi.png',
            hidden: false,
            name: '星期六',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/tianfeng.png',
            hidden: false,
            name: '天风证券',
            width: '300px'
          },
          {
            url: 'static/images/index/hascoop/xuhui.png',
            hidden: false,
            name: '旭辉地产',
            width: '300px'
          }
        ]
      }
    },
    methods: {
      getMdSpan (index) {
        if (index % 5 === 0) {
          return {span: 4}
        }
        return {span: 4, offset: 1};
      },
      getXsSpan (index) {
        if (index % 2 === 0) {
          return {span: 11}
        }
        return {span: 11, offset: 2};
      }
    },
    components: {
      commonTitle
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Coops{
  width: 100%;
  /*border: 1px solid #f1f1f1;*/
  margin: 20px auto;
  box-sizing: content-box;
  position: relative;
  overflow: hidden;
  > div{
    &.el-carousel{
      width: calc(100% - 60px);
      float: right;
    }
    &.title-mobile{
      display: none;
    }
    &.title-block{
      background: #f1f1f1;
      width: 60px;
      text-align: center;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .title{
        width: 1em;
        color: #606060;
        display: inline-block;
        font-size: 1.2em;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
}
.carousel {
  justify-content: center;
  .carouselItem-box {
    text-align: center;
    overflow: hidden;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    h4 {
      font-size: 14px;
      color: #73777a;
    }
    &:hover {
      .hover-layer {
        opacity: 1;
      }
    }
    .hover-layer {
      opacity: 0;
      position: absolute;
      background-color:#06b7e9;
      top: 0;
      left: 0;
      color:#fff;
      height: 100%;
      width: 100%;
      font-size: 18px;
      font-weight: 700;
      border-radius: 4px;
      p{
        height: 100%;
        align-items: center;
        display: flex;
        justify-content:center; 
      }
    }
  }
}


/**
*  mobile
*/
@media only screen
and (max-device-width: 1024px) {
  .Coops{
    border: none;
    > div{
      &.el-carousel{
        width: 100%;
        float: none;;
      }
      &.title-block{
        display: none;
      }
      &.title-mobile{
        display: block;
        position: relative;
        text-align: center;
        font-size: 1.2em;
        .title{
          background: #fff;
          padding: 0 30px;
          position: relative;
        }
        &:before{
          position: absolute;
          height: 1px;
          width: 60%;
          left: 20%;
          top: calc(50% - 0.5px);
          background: #ccc;
          content: '';
        }
      }
    }
  }
  .carouselItem{
    width: 88%;
    margin: 0 6%;
    .carouselItem-box {
      width: 15%;
      h4 {
        font-size: 12px;
      }
      p {
        font-size: 12px;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
<style lang="scss" rel="stylesheet/scss">
/**
*  mobile
*/
@media only screen
and (max-device-width: 1024px) {
  .Coops{
    .el-carousel__arrow--left {
        left: 0px;
        height: 20px;
        width: 20px;
    }
    .el-carousel__arrow--right {
        right: 0px;
        height: 20px;
        width: 20px;
    }
  }
}
</style>


