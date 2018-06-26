<template>
  <div class="not-found-wrapper" ref="wrapper">
    <pl-header :show-home="true"></pl-header>
     <div class="not-found-content" ref="notFoundContent">
      <div class="not-found-img">
        <img src="../assets/img/not-found.png" height="392" width="572">
      </div>
      <div class="not-found-info">
        <p><span>sorry...</span>页面没有找到，您可能键入了错误的网址！</p>
        <el-row class="text-center">
          <el-col :span="24"> 
            <el-button icon=" anticon icon-arrowleft" type="primary" @click="back">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    setLoginHeight () {
      let h = document.documentElement.clientHeight;
      let wrapper = this.$refs.wrapper;
      let notFoundContent = this.$refs.notFoundContent;
      if (wrapper) {
        wrapper.style.height = (h - wrapper.offsetTop) + 'px';
        notFoundContent.style.marginTop = ((h - wrapper.offsetTop - notFoundContent.clientHeight) / 2) + 'px';
      }
    },
    back () {
      if (this.$store.state.previousRouter.name) {
        this.$router.push({name: this.$store.state.previousRouter.name});
      } else {
        this.$api.core.logout();
      }
    }
  },
  mounted () {
    this.setLoginHeight();
    let _this = this;
    window.onresize = function () {
      _this.setLoginHeight();
    };
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/scss/index";
.not-found-wrapper {
  display: block;
  background: url("../assets/img/bg.jpg") repeat;
  overflow: hidden;
  .not-found-content {
    width: 572px;
    margin: 0 auto;
    .not-found-info {
      width: 440px;
      margin: 0 auto;
      padding-left: 20px;
      p {
        font-size: 18px;
        color: $primary-color;
        span {
          text-transform:capitalize;
          font-size: 20px;
        }
      }
    }
  }
  
}
</style>
