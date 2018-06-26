<template>
  <div class="container" :style="{'min-height': minHeight+'px'}">
    <el-row>
      <el-col :span="24">
        <pl-content-box-block>
          <div class="table-box" v-for="(item,index) in data" @click="viewDetail(item, index)">
            <div class="table-box-title">
              <h3>{{item.title}}</h3>
            </div>
            <div class="table-box-main">
              <div class="main-img">
                <img :src="picPath(item.noticeId)" alt="图片" width="300" height="150">
              </div>
              <div class="main-text">
                <p class="no-indent news-content"  style="max-height: 100px;" v-text="getText(item.content)"></p>
                <p class="no-indent bottom-p">
                  <span class="main-date">
                    {{item.createTime | date('YYYY-MM-DD')}}
                  </span>
                  <span class="main-btn">
                    <el-button @click="viewDetail(item, index)">查看详情</el-button>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </pl-content-box-block>
        <div class="table-page-wrapper text-center margin-bottom-12" >
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="currentPageSize"
            :current-page="currentPage"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {MsgType} from 'core/constants';
  import httpUtil from 'core/utils/http-util';
  import {HttpPrefix} from 'core/constants';
  export default {
    data () {
      return {
        filterNotice: {
          title: ''
        },
        getUsersData: this.$api.bsp.notice.getNotices,
        data: [],
        total: 0,
        currentPage: 1,
        currentPageSize: 10,
        pages: 0,
        params: {
          pageSize: 10,
          pageNo: 1
        }
      };
    },
    computed: {
      minHeight () {
        return document.documentElement.clientHeight-184;
      }
    },
    created () {
      this.getNoticeData();
    },
    methods: {
      getNoticeData () {
        this.params.pageSize = this.currentPageSize;
        this.params.pageNo = this.currentPage;
        this.$api.bsp.notice.getNotices(this.params).then(ret => {
          this.data = ret.data;
          this.total = ret.total;
          this.pages = parseInt(this.total / this.currentPageSize) + (this.total % this.currentPageSize === 0 ? 0 : 1);
        });
      },
      handleSizeChange (val) {
        this.currentPageSize = val;
        this.currentPage = 1;
        this.getNoticeData();
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.getNoticeData();
      },
      picPath (relateId) {
        return httpUtil.genPath(HttpPrefix.API + '/file/pub-file/echoPic?relateId=' + relateId + '&&fileType=2')
      },
      viewDetail (row, index) {
        let prevId, nextId;
        if (this.data.length > (index + 1)) {
          nextId = this.data[index + 1].noticeId;
        }
        if (index > 0) {
          prevId = this.data[index - 1].noticeId;
        }
        this.$router.push({'name': 'news', params: {noticeId: row.noticeId, nextId, prevId}});
      },
      getText (html) {
        return html.replace(/<[^>]+>/g, '');
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .title-container{
    margin-bottom: 14px;
    vertical-align: middle;
  }
  .news-title{
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 28em;
    vertical-align: inherit;
    margin-bottom: 0;
  }
  .news-date{
    vertical-align: inherit;
  }
  /*new*/
  .table-box {
    padding-top: 10px;
    padding-right: 20px;
    margin-bottom: 30px;
    background: #f6f6f6;
    height: 235px;
    position: relative;
    cursor: pointer;
    &:first-child{
      margin-top: 80px;
    }
    &:hover{
      border: 1px solid #06b7e9;
      transition: transform 0.5s;
      transform:translateY(-12px);
    }
    .news-content{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      /*line-height: 20px;*/
      overflow: hidden;
      max-height: 100px;
    }
    .table-box-title{
      padding-left: 22px;
      margin-bottom: 15px;
      border-left: 4px solid #06b7e9;
      h3{
        font-size: 20px;
      }
    }
    .table-box-main{
      margin-left: 26px;
      overflow: hidden;
      display: flex;
      .main-img {
        float: left;
        margin-right: 10px;
        width: 300px;
      }
      .main-text {
        color: #666;
        font-size: 14px;
        flex: 1;
        position: relative;
        .bottom-p{
          position: absolute;
          bottom: 0;
          width: 100%;
          .main-date {
            text-align: center;
          }
          .main-btn{
            position: absolute;
            right: 0;
            bottom: -5px;
          }
        }
      }
    }
  }
  /*new*/
</style>
