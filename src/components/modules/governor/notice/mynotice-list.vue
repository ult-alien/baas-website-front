<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <!--<pl-content-box-toolbar style="margin-bottom: 20px"></pl-content-box-toolbar>-->
    <pl-content-box-block>
      <pl-pull-more  :data-fun="getPageData" :params="params" ref="messageLists"  @after-load="handleAfterLoad">
        <template scope="props">
            <div class="message-table">
              <div class="message-table-date" :class="{tabRead:tabRead}">
                {{ props.item.createTime}}
              </div>
              <div class="message-table-content" @click="readMsg(props.item)">
                {{ props.item.title}}
              </div>
            </div>
          </template>
        <div slot="empty">
          <pl-empty-tip  text="暂时没公告"></pl-empty-tip>
        </div>
      </pl-pull-more>
    </pl-content-box-block>
  </pl-content-box>
</template>
<style>
</style>
<script>
  export default{
    data () {
      return {
        getPageData: this.$api.bsp.notice.getNotices,
        params: {
          noticeState: '1'
        },
        msg1: '详情',
        noRead: true,
        read: false,
        tabRead: false,
        isIndeterminate: false,
        showFlag: false
      };
    },
    methods: {
      reload (obj) {
        this.$refs.messageLists.reload(obj);
      },
      readMsg (item) {
        this.$router.push({name: 'bsp.biz.notice-detail', params: {noticeId: item.noticeId}});
      },
      handleAfterLoad (ret, data) {
        if (ret && ret.total) {
          this.showFlag = false;
        } else {
          this.showFlag = true;
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/_variables";
  .message-table{
    border:1px solid $border-color;
    border-top: 0;
    overflow: hidden;
    width:100%;
    line-height: 30px;
    color:$font-color;
    &:first-child {
      border-top:1px solid $border-color;
    };
    &:hover{
      background:$dark-white;
    }
    .message-table-date{
      float: left;
      width:16%;
      text-align: center;
      padding: 10px 0px 10px;
      position: relative;
      font-size: 12px;
      &:before{
        content:'';
        border: 1px solid $border-color;
        border-radius: 50%;
        display: block;
        height: 9px;
        position: absolute;
        right: -6px;
        top: 20px;
        text-indent: -999px;
        width: 9px;
        z-index: 10;
        background: #fff;
      }
    .input{
      float: left;
      padding-left:8px;
    }
    };
    .tabRead{
      &:before{
        border: 1px solid $border-color;
      }
    }
    .message-table-content{
      float: left;
      width:84%;
      padding: 10px 12px 10px;
      border-left: 1px solid $border-color;
      cursor:pointer;
      font-size:14px;
      :last-child{
        text-indent: 2em;
        text-overflow: ellipsis;
      }
      .title{
        font-weight: bold;
      }
    }
  }
  .message-btn{
    position: relative;
    height:0px;
    button{
      position: absolute;
      top:-55px;
      right:32px;
    }
  }
  .el-tabs__header{
   /* margin: 0 0 10px !important;*/
  }
  .message-btn-box{
    height: 5px !important;
  }
  .checkbox{
    display: block;
    min-height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left:14px;
  }
  .btn-padding {
    min-width: 110px;
  }
  .noRead{
    color:$info-color;
    font-weight: bold;
  }
  .read{
    color:$font-color;
    font-weight: bold;
  }
  .border-top{
    border-top:1px solid $border-color;
  }
  .checkbox-label{
    width: 18px;
    overflow: hidden;
    float: left;
    margin-left: 5px;
  }
</style>
