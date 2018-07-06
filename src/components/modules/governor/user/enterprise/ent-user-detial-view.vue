<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <div v-if="loading" v-loading="loading" element-loading-text="加载中..."  style="padding: 30px"></div>
    <div v-else>
      <ent-user-detial  :data="userData"></ent-user-detial>
      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="default" icon=" anticon icon-arrowleft" @click="goBack">返回</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    </div>
  </pl-content-box>

</template>
<script>
  import entUserDetial from './ent-user-detial.vue';
  export default {
    components: {
      entUserDetial
    },
    data () {
      return {
        userData: null,
        loading: false
      };
    },
    methods: {
      goBack () {
        let back = 'bsp.biz.enterprise-user';
        if (this.$route.params && this.$route.params.back) {
          back = this.$route.params.back;
        }
        this.$router.push({name: back});
      }
    },
    created () {
      let params = this.$route.params;
      if (!params || !params.userId || !params.entId) {
        this.goBack();
        return;
      }
      this.loading = true;
      this.$api.bsp.user.getEntUserInfo(params.userId, params.entId).then(ret => {
        this.userData = ret;
        this.loading = false;
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


