<template>
  <div class="container-wrapper container" v-loading="loading" :style="{'min-height': minHeight+'px'}">
    <h2 style="margin-top: 45px;" class="text-center">{{data.title}}</h2>
    <div class="small text-center">{{data.createTime}}</div>
    <div class="ql-editor">
      <div class="news-header-img"><img :src="srcUrl" alt="新闻图片"></div>
      <p v-html="data.content"></p>
    </div>
    <pl-content-box-toolbar :border="false" style="margin-top: 50px;position: relative">
      <div  class="ext" v-if="prevId" @click="getPrev">
        <span>上一篇：</span><span>&nbsp;&nbsp;{{preTitle}}</span>
      </div>
      <div class="ext" v-if="nextId" @click="getNext">
        <span>下一篇：</span><span>&nbsp;&nbsp;{{nextTitle}}</span>
      </div>
      <div class="ext-back" @click="goBack">
        <!--<el-button type="primary">&nbsp;&nbsp;返回&nbsp;&nbsp;</el-button>-->
        <span class="back">【返回】</span>
      </div>
      <!--<el-button type="default" v-if="prevId" @click="getPrev">上一篇</el-button>
      <el-button type="primary" @click="toIndex">返回首页</el-button>
      <el-button type="primary" @click="toNewsList">更多新闻</el-button>
      <el-button type="default" v-if="nextId" @click="getNext">下一篇</el-button>-->
    </pl-content-box-toolbar>
  </div>
</template>

<script>
  import httpUtil from 'core/utils/http-util';
  import {HttpPrefix} from 'core/constants';
  import 'quill/dist/quill.core.css';
  export default {
    data () {
      return {
        loading: true,
        data: {},
        srcUrl: '',
        prevId: '',
        nextId: '',
        noticeId: '',
        nextTitle: '',
        preTitle: ''
      }
    },
    computed: {
      minHeight () {
        return document.documentElement.clientHeight-304;
      }
    },
    mounted: function () {
      let params = this.$route.params;
      // this.prevId = params.prevId;
      // this.nextId = params.nextId;
      if (!params.noticeId) {
        this.$router.push({name: 'home'});
      } else {
        this.noticeId = params.noticeId;
        this.getNews();
      }
    },
    methods: {
      getNews () {
        this.loading = true;
        this.$api.bsp.notice.getNoticeDetail(this.noticeId).then(ret => {
          this.data = ret;
          this.srcUrl = httpUtil.genPath(HttpPrefix.API + '/file/pub-file/echoPic?relateId=' + this.noticeId + '&&fileType=2');
          this.loading = false;
          this.prevId = ret.preNoticeId;
          this.nextId = ret.nextNoticeId;
          this.nextTitle = ret.nextTitle;
          this.preTitle = ret.preTitle;
        });
      },
      goBack () {
        this.$router.back();
      },
      /* toIndex () {
        this.$router.push({'name': 'home'});
      },
      toNewsList () {
        this.$router.push({'name': 'news-list'});
      }, */
      getPrev () {
        this.noticeId = this.prevId;
        this.getNews();
      },
      getNext () {
        this.noticeId = this.nextId;
        this.getNews();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .container-wrapper{
    padding: 0 20px;
    margin: 60px auto;
    .small{
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .ql-editor{
      .news-header-img{
        text-align: center;
        img{
          max-width: 50%;
          margin: 20px;
        }
      }
      p{
        line-height: 30px;
        /*text-align: left;*/
      }
    }
    .ext{
      cursor: pointer;
      margin-bottom: 10px;
      color: #696969;
    }
    .ext-back{
      position: absolute;
      left: 50%;
      top: -30px;
      cursor: pointer;
      .back{
        color: #696969;
        font-size: 18px;
      }
    }
  }
</style>


