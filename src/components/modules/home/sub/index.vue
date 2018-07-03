<template>
  <div v-loading="loading">
    <banner id="banner"></banner>
    <div class="container">
      <block>
        <common-title slot="title">解决方案</common-title>
        <block-card :can-scale="true">
          <img slot="pic" src="static/images/index/pay.png" style="height: 150px;width: 150px;"/>
          <div class="block-card-content">
            <p class="block-card-title no-indent text-bold">创新支付与清结算体系</p>
            <p class="block-card-desc no-indent">重塑传统供应链金融，帮助核心企业零人力零投入打造“商票、银票”体系外的创新支付和清结算体系</p>
          </div>
        </block-card>
        <block-card :can-scale="true">
          <img slot="pic" src="static/images/index/return.png" style="height: 150px;width: 150px;"/>
          <div class="block-card-content">
            <p class="block-card-title no-indent text-bold">纯线上随借随还体系</p>
            <p class="block-card-desc no-indent">纯线上、便捷高效、随借随还的创新保理体系，为中小企业解决融资难、融资贵难题</p>
          </div>
        </block-card>
        <block-card :can-scale="true">
          <img slot="pic" src="static/images/index/industry.png" style="height: 150px;width: 150px;"/>
          <div class="block-card-content">
            <p class="block-card-title no-indent text-bold">真正落地的区块链技术</p>
            <p class="block-card-desc no-indent">整个账本和账户体系是基于区块链的分布式账本，资产的发行从源头开始，防止超发和双花，全流程可追溯，并且信息不可篡改</p>
          </div>
        </block-card>
      </block>

      <block v-if="notices.length >  0">
        <common-title slot="title">最新动态</common-title>
        <!--<news-card class="news-card" @click.native="goNews">
          <img src="static/images/news1.png" style="max-width: 100%;" slot="pic">
          <div class="block-card-content">
            <p class="block-card-title no-indent">
              <span class="news-title pull-left" title="区块链：爆红“概念”下的野蛮生长">区块链：爆红“概念”下的野蛮生长</span>
              <span class="news-date pull-right">2018/03/18</span>
            </p>
            <p class="block-card-desc no-indent">区块链成为很多人讨论的热门话题，在这一时刻，不管是欢迎还是讨厌，大家都需要在直面未来经济的同时准确评估区块链的价值。</p>
          </div>
        </news-card>-->
        <news-card class="news-card" @click.native="goNews(item.noticeId, index)" v-for="(item,index) in notices" :key="index">
          <img :src="picPath(item.noticeId)" style="max-width: 100%;" slot="pic">
          <div class="block-card-content">
            <p class="block-card-title no-indent" >
              <span class="news-title pull-left" :title="item.title">{{item.title}}</span>
              <span class="news-date pull-right">{{item.createTime.substring(0,10)}}</span>
            </p>
            <p class="block-card-desc no-indent mult-ellipsis" v-html="item.content"></p>
          </div>
        </news-card>
        <!--<news-card class="news-card" @click.native="goNews">
          <img src="static/images/news1.png" style="max-width: 100%;" slot="pic">
          <div class="block-card-content">
            <p class="block-card-title no-indent" >
              <span class="news-title pull-left" title="区块链：爆红“概念”下的野蛮生长">区块链：爆红“概念”下的野蛮生长</span>
              <span class="news-date pull-right">2018/03/18</span>
            </p>
            <p class="block-card-desc no-indent">区块链成为很多人讨论的热门话题，在这一时刻，不管是欢迎还是讨厌，大家都需要在直面未来经济的同时准确评估区块链的价值。</p>
          </div>
        </news-card>-->
      </block><br>
      <p class="text-center news-more" v-if="hasMore" @click="more">更多动态&nbsp;>></p>
      <block>
        <common-title slot="title">合作伙伴</common-title>
        <coop-partner></coop-partner>
      </block>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  import banner from './ui/banner.vue';
  import block from './ui/block.vue';
  import blockCard from './ui/block-card.vue';
  import coopPartner from './ui/coop-partner.vue';
  import uiHeader from './ui/header.vue';
  import commonTitle from './ui/common-title.vue';
  import newsCard from './ui/news-card.vue';
  import httpUtil from 'core/utils/http-util';
  import {HttpPrefix} from 'core/constants';
  export default {
    components: {
      banner,
      block,
      blockCard,
      coopPartner,
      uiHeader,
      commonTitle,
      newsCard
    },
    data () {
      return {
        loading: true,
        position: 'absolute',
        headerShadow: false,
        background: 'transparent',
        notices: [],
        hasMore: false
      }
    },
    methods: {
      getPageScroll () {
        let xScroll, yScroll;
        if (self.pageYOffset) {
          yScroll = self.pageYOffset;
          xScroll = self.pageXOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
          yScroll = document.documentElement.scrollTop;
          xScroll = document.documentElement.scrollLeft;
        } else if (document.body) {// all other Explorers
          yScroll = document.body.scrollTop;
          xScroll = document.body.scrollLeft;
        }
        return new Array(xScroll,yScroll);
      },
      goNews (noticeId, index) {
        let prevId, nextId;
        if (this.notices.length > (index + 1)) {
          nextId = this.notices[index + 1].noticeId;
        }
        if (index > 0) {
          prevId = this.notices[index - 1].noticeId;
        }
        this.$router.push({'name': 'news', params: {noticeId, nextId, prevId}});
      },
      picPath (relateId) {
        return httpUtil.genPath(HttpPrefix.API + '/file/pub-file/echoPic?relateId=' + relateId + '&&fileType=2')
      },
      more () {
        this.$router.push({'name': 'news-list'});
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loading = false;
      });
      window.onscroll = () => {
        if (this.getPageScroll()[1] > document.querySelector('#banner').clientHeight) {
          this.position = 'fixed';
          this.headerShadow = true;
          this.background = '#293948';
        } else {
          this.position = 'absolute';
          this.headerShadow = false;
          this.background = 'transparent';
        }
      }
    },
    created () {/*
      this.$api.bsp.notice.getHomeNotices({topNum: 4}).then(ret => {
        if (ret && ret.data && ret.data.length > 3) {
          this.notices = ret.data.slice(0, 3);
          this.hasMore = true;
        }else {
          this.notices = ret.data;
        }
      });*/
    },
    destroyed () {
      // 跳转之后需要注销事件
      window.onscroll = null;
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .news-card{
    .news-title{
      max-width: 11em;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .news-date{
      font-size: 14px;
    }
  }
  .block-card-desc{
    color: #919191;
  }
  .news-more{
    font-size: 16px;
    color: grey;
    cursor: pointer;
  }
</style>


