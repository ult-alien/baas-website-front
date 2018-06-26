<template>
  <div class="no-permission-wrapper" ref="wrapper">
    <pl-header :show-home="true"></pl-header>
      <div class="no-permission-content" ref="content">
        <div class="no-permission-img">
          <img src="../assets/img/no-permission.png" height="392" width="572">
        </div>
        <div class="permission-info text-center">
          <p>抱歉...当前您没有访问权限!</p>
          <el-row>
            <el-col class="text-center">
              <el-button icon=" anticon icon-arrowleft" type="primary" @click="back">返回</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
  </div>
</template>
<script type="text/javascript">
export default {
  methods: {
    setLoginHeight () {
      let h = document.documentElement.clientHeight;
      let wrapper = this.$refs.wrapper;
      let content = this.$refs.content;
      if (wrapper) {
        wrapper.style.height = (h - wrapper.offsetTop) + 'px';
        content.style.marginTop = ((h - wrapper.offsetTop - content.clientHeight) / 2) + 'px';
      }
    },
    back () {
      this.$api.core.logout();
      // this.$router.push({name: '/'});
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
  .no-permission-wrapper {
    display: block;
    background: url("../assets/img/bg.jpg") repeat;
    overflow: hidden;
    .no-permission-content { 
      width: 572px;
      margin: 0 auto;
      .permission-info {
        width: 400px;
        margin: 0 auto;
        padding-left: 90px;
        p {
          font-size: 18px;
          color: $primary-color;
          // margin-bottom: 20px;
        }
      }   
    }
  }
</style>
