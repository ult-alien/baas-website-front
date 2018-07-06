<template>
  <pl-content-box>
    <div class="row-box">
      <div>
        <el-input placeholder="请输入需要查询的关键字" v-model="searchStr" @keyup.native.enter="search" style="width: 480px;"></el-input>
        <el-button type="primary" @click="search()">搜索</el-button>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="8" ref="intro-container">
        <div class="intro-guide">
          入门指引
        </div>
        <div class="notice">
          <div class="header">
            <i class="plicon plicon-notification1"></i>&ensp;<span class="notice-title">网站公告</span>
          </div>
          <ul class="item-list" v-if="noticeList.length > 0">
              <li v-for="(item, index) in noticeList" :key="index" @click="goNotice(item)"><span class="index">{{index + 1}}</span>{{item.title}}</li>
          </ul>
          <div v-else class="tips">
            暂无数据
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="com-pro" style="margin: 0;" v-loading="srvhallItemLoading">
          <div class="header">
            <i class="plicon plicon-xiaoxi1"></i>&ensp;<span class="notice-title">常见问题</span>
            <span class="pull-right" @click="showMoreProblem">更多>></span>
          </div>
          <ul class="item-list" v-if="srvhallItemList.length > 0">
            <li v-for="(item, index) in srvhallItemList" @click="showDetail(item)"><span class="index">{{index + 1}}</span>{{item.itemTitle}}</li>
          </ul>
          <div v-else class="tips">
            暂无数据
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <srvhall-block hover>
          <div class="serv-prot">
            <h3>服务协议</h3>
            <ul>
              <li>
                <router-link :to="{name: 'protocol.send-prot'}" target="_blank" style="color: #fff" >链单开具协议</router-link>
              </li>
              <li>
                <router-link :to="{name: 'protocol.transfer-prot'}" target="_blank" style="color: #fff" >链单转让协议</router-link>
              </li>
              <li>
                <router-link :to="{name: 'protocol.discount-prot'}" target="_blank" style="color: #fff" >链单商业保理融资业务协议</router-link>
              </li>
            </ul>
          </div>
        </srvhall-block>
      </el-col>
      <el-col :span="8">
        <srvhall-block @click.native="showItem('9')">
          <i class="icon el-icon-search"></i>&emsp;如何开具链单
        </srvhall-block>
      </el-col>
      <el-col :span="8">
        <srvhall-block @click.native="showItem('10')">
          <i class="icon anticon icon-retweet"></i>&emsp;如何转让链单
        </srvhall-block>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <srvhall-block @click.native="showItem('11')">
          <i class="icon anticon icon-paycircleo"></i>&emsp;如何使用链单融资
        </srvhall-block>
      </el-col>
      <el-col :span="8">
        <srvhall-block @click.native="showItem('12')">
          <i class="icon anticon icon-reload"></i>&emsp;如何回购链单
        </srvhall-block>
      </el-col>
      <el-col :span="8">
        <srvhall-block @click.native="showItem('13')">
          <i class="icon anticon icon-edit"></i>&emsp;如何签收链单
        </srvhall-block>
      </el-col>
    </el-row>
  </pl-content-box>
</template>
<script>
  import srvhallBlock from './sub/srvhall-block.vue';
  import constantUtil from 'core/utils/constant-util.js';
  export default {
    data () {
      return {
        noticeList: [],
        srvhallItemList: [],
        srvhallItemLoading: false,
        SrvHallCategory: constantUtil.getConstantByKey('GovernorConstants.SrvHallCategory'),
        searchStr: ''
      };
    },
    methods: {
      showMoreProblem () {
        this.$router.push({'name': 'bsp.srvhall.srvhall-category', params: {'openModule': this.SrvHallCategory['CommonProblem']}});
      },
      showDetail (row) {
        this.$router.push({'name': 'bsp.srvhall.srvhall-category', params: {'openModule': this.SrvHallCategory['CommonProblem'], 'openItem': row}});
      },
      showItem (item) {
        this.$router.push({'name': 'bsp.srvhall.srvhall-category', params: {'subCat': item}});
      },
      search () {
        this.$router.push({'name': 'bsp.srvhall.srvhall-category', params: {'searchStr': this.searchStr}});
      },
      goNotice (item) {
        this.$router.push({name: 'bsp.srvhall.srvhall-category', params: {'openItem': {fullCatName: '公告详情', itemTitle: item.title, itemContent: item.content, itemRes: '', isNotice: true}}});
      }
    },
    components: {
      srvhallBlock
    },
    created () {
      // 查询问题列表
      this.srvhallItemLoading = true;
      this.$api.bsp.srvhall.getHotSrvhallItem().then(ret => {
        this.srvhallItemList = ret.data;
        window.setTimeout(() => {
          this.srvhallItemLoading = false;
        }, 200);
      });
      // 查询消息列表
      this.$api.bsp.notice.getAllNotices().then(ret => {
        this.noticeList = ret;
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/variables";
  .row-box{
    margin: 10px 0 40px 0;
    > div{
      text-align: center;
    }
  }
  .intro-guide{
    background-image: url('./img/u35.png');
    background-repeat: none;
    font-size: 24px;
    font-weight: 640;
    text-indent: 1em;
    color: #fff;
    height: 60px;
    line-height: 60px;
  }
  .notice{
    height: 160px;
  }
  .com-pro{
    height: 230px;
  }
  .notice, .com-pro{
    background-color: #fff;
    margin: 10px auto;
    position: relative;
    .tips{
      color: #ccc;
      text-align: center;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }
    .header,.plicon,.notice-title{
      vertical-align: middle;
    }
    .header{
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      margin: 0 14px;
      .plicon{
        font-size: 32px;
        color: $primary-bg-color;
      }
      .pull-right{
        font-size: 14px;
        color: #888;
        cursor: pointer;
        &:hover{
          color: $primary-color;
        }
      }
      border-bottom: 2px solid #eee;
    }
  }
  .item-list{
    margin: 10px 14px;
    max-height: 170px;
    overflow: auto;
    li{
      list-style: none;
      line-height: 28px;
      height: 28px;
      cursor: pointer;
      &:hover{
        color: $primary-color;
      }
    }
    .index{
      display: inline-block;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      background-color: #fcc62b;
      color: #fff;
      border-radius: 50%;
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .icon{
    font-size: 2.4em;
    color: $primary-color;
  }
  .serv-prot {
    position: relative;
    left: -24%;
    width: max-content;
    /*mobile*/
    @media only screen and (max-device-width: 1024px) {
      left: 0;
    }
  }
</style>



