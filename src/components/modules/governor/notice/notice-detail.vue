<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true"></pl-page-nav>
    <div class="content">
      <div class="text-center">
        <h3>{{form.title}}</h3>
      </div>
      <br>
      <!--<div class="align-center">
          发布时间:{{form.createTime}}
        </div>-->
      <div class="ql-editor">
        <span v-html="form.content"></span>
      </div>
    </div>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="primary" @click="back">&nbsp;&nbsp;返回&nbsp;&nbsp;</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </pl-content-box>
</template>
<script>
  import config from '../../../../config';
  export default {
    data () {
      return {
        form: {
          title: '',
          content: '',
          front: '',
          noticeState: ''
        }
      };
    },
    methods: {
      show (row) {
        let vm = this;
        vm.form = row;
      },
      back () {
        // this.$router.back();
        let previousRouter = this.$store.state.previousRouter;
        let previousRouterUrl = config.defaultRoute();
        if (previousRouter && previousRouter.name) {
          previousRouterUrl = previousRouter.name;
        }
        this.$router.push({name: previousRouterUrl});
      }
    },
    mounted () {
      let params = this.$route.params;
      if (!params.noticeId) {
        this.$router.push(config.defaultRoute());
      } else {
        this.$api.bsp.notice.getNoticeDetail(params.noticeId).then(ret => {
          this.form = ret;
        });
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .content {
    padding: 15px 70px;
    word-wrap: break-word;
    word-break: break-all;
    .text-indent {
      text-indent: 2em;
    }
    .ql-editor {
      line-height: 1.5;
    }
  }

  .button-footer {
    padding-top: 5px;
  }
</style>
