<template>
  <div id="app">
    <top-progress ref="topProgress" :height="2"></top-progress>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <!--<pl-back-top></pl-back-top>-->
  </div>
</template>

<script>
  // https://github.com/dalphyx/vue-top-progress
  import TopProgress from 'vue-top-progress';
  export default {
    name: 'app',
    components: {
      'top-progress': TopProgress
    },
    mounted () {
      let topProgress = this.$refs.topProgress;
      // 路由开始的时候，开启进度条
      this.$router.beforeEach((to, from, next) => {
        topProgress.start();
        next();
        window.scrollTo(0, 0);
      });

      // 路由加载后的时候，完成进度条
      this.$router.afterEach(() => {
        setTimeout(() => {
          topProgress.done();
        }, 250);
      });

//      this.$http.interceptors.push((request, next) => {
//        topProgress.start();
//        // 这里对请求体进行处理
//        next((response) => {
//          setTimeout(() => {
//           topProgress.done();
//          }, 250);
//        });
//      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "assets/scss/index";
</style>
