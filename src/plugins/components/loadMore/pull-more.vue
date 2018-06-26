<template>
  <div>
    <slot v-for="(item, index) in itemData" :item="item" :index="index"></slot>
    <div class="load-more-btn" ref="getStorllTop" v-show="!isShowEmpty">
      <el-button type="text"   @click="loadMore" :disabled="canNotClick" :loading="isLoading">
        {{btnText}} <!--{{listTotal}} {{remainTotal}}-->
      </el-button>
    </div>
    <div v-show="isShowEmpty">
      <slot name="empty" ></slot>
    </div>
  </div>
</template>
<script>
  import config from '../config';
  import loadMore from './load-more.vue';
  export default {
    name: config.prefix + 'PullMore',
    mixins: [loadMore],
    data () {
      return {
        btnOffsetTop: 0,
        bodyScrollTop: 0,
        clientHeight: 0
      };
    },
    methods: {
      handleScroll () {
        if (this.$refs.getStorllTop) {
          this.btnOffsetTop = this.$refs.getStorllTop.offsetTop;
          this.clientHeight = document.documentElement.clientHeight;
          if (document.documentElement && document.documentElement.scrollTop) {
            this.bodyScrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            this.bodyScrollTop = document.body.scrollTop;
          }
          if (this.bodyScrollTop + this.clientHeight >= this.btnOffsetTop && !this.isLoading) {
            this.loadMore();
          }
        }
      }
    },
    mounted () {
//      this.$nextTick(() => {
//        setTimeout(() => {
//          this.handleScroll();
//        }, 1000);
//      });
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll);
      // window.addEventListener('scroll', this.handleScroll);
    }
  };
</script>
