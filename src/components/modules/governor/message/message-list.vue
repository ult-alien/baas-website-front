<template>
  <pl-content-box>
    <pl-page-nav class="no-border"></pl-page-nav>
    <el-tabs v-model="pageName" @tab-click="handleClick">
      <el-tab-pane label="未读消息" name="first"></el-tab-pane>
      <el-tab-pane label="已读消息" name="second"></el-tab-pane>
    </el-tabs>
	      <pl-affix :offset-bottom="0" class="message-btn-box">
         <pl-content-box-toolbar class="text-right message-btn" :border="false">
              <el-button type="primary" icon="check"  @click="isShow = !isShow" v-show="!isShow && arr.length > 0 && pageName === 'first'" size="mini">批量设为已读</el-button>
          </pl-content-box-toolbar>
       </pl-affix>
    <pl-content-box-block>
      <el-checkbox-group v-model="checkedMsgIds" @change="thisChecked"  class="input">
      <pl-pull-more :data-fun="getPageData" :params="params" ref="messageLists"  @after-load="handleAfterLoad">
        <template scope="props">
            <div class="message-table">
              <div class="message-table-date" :class="{tabRead:tabRead}">
                <div class="checkbox-label">
                  <el-checkbox v-show="isShow" :label="props.item.msgId"></el-checkbox>
                </div>
                {{ props.item.sendTime}}
              </div>
              <div class="message-table-content" @click="readMsg (props.item)">
                <div class="title">{{ props.item.title}}</div>
                <div>{{ props.item.content }}</div>
              </div>
            </div>
          </template>
          <div slot="empty">
            <pl-empty-tip  text="暂时没相关记录" style="font-size: 14px;"></pl-empty-tip>
          </div>
      </pl-pull-more>
      </el-checkbox-group>
    </pl-content-box-block>
    <message-info-dialog ref="messageDialog"></message-info-dialog>
    <pl-affix :offset-bottom="0" v-show="isShow && this.arr.length != 0" class="border-top">
      <pl-content-box-toolbar class="text-center" :border="false">
        <div class="pull-left checkbox" >
          <el-checkbox :indeterminate="isIndeterminate" v-model="allChecked" @change="handleCheckAllChange">全选</el-checkbox>
        </div>
        <el-button type="primary"  class="btn btn-danger btn-padding" @click="setReading">设为已读</el-button>
        <el-button class="btn btn-default btn-padding" @click="isShow = !isShow">取消</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </pl-content-box>
</template>
<style>
</style>
<script>
  import messageInfo from './message-info.vue';
  import {MsgType} from '../../../../core/constants';
  export default{
    props: {
      emptyText: {
        type: String,
        default: '暂时没相关记录！'
      }
    },
    data () {
      return {
        pageName: 'first',
        form: {
          messageIds: ''
        },
        getPageData: this.$api.bsp.message.getMsgList,
        message: {
          msg_id: '',
          senderId: '',
          receiverId: '',
          receiverOrganId: '',
          title: '',
          content: '',
          sendTime: '',
          readTime: '',
          messageTypeCode: ''
        },
        params: {
          messageTypeCode: 'notReaded'
        },
        msg1: '详情',
        multipleSelection: '',
        isShow: false,
        allChecked: false,
        noRead: true,
        read: false,
        tabRead: false,
        arr: [],
        isIndeterminate: false,
        checkedMsgIds: []
      };
    },
    methods: {
      reload (obj) {
        this.$refs.messageLists.reload(obj);
      },
      handleClick (tab, event) {
        this.pageName = tab.name;
        if (tab.name === 'first') {
          this.params.messageTypeCode = 'notReaded';
          this.reload();
          this.noRead = true;
          this.read = false;
          this.tabRead = false;
        } else {
          this.params.messageTypeCode = 'readed';
          this.reload();
          this.noRead = false;
          this.read = true;
          this.tabRead = true;
          this.isShow = true;
        }
      },
      readMsg (item) {
        console.log(item);
        this.$refs.messageDialog.show(item);
        if (this.pageName === 'first') {
          this.setReading(item.msgId, false);
        }
      },
      handleAfterLoad (ret, obj) {
        this.arr = obj.data;
      },
      thisChecked (value) {
        let checkedCount = value.length;
        this.allChecked = checkedCount === this.arr.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.arr.length;
      },
      handleCheckAllChange (event) {
        if (this.allChecked) {
          this.checkedMsgIds = this.arr.map(item => {
            return item.msgId;
          });
        } else {
          this.checkedMsgIds = [];
        }
        this.isIndeterminate = false;
      },
      setReading (msgIds, isBatch = true) {
        if (isBatch) {
          msgIds = this.checkedMsgIds.join(',');
        }
        if (!msgIds) {
          this.$alert('未选择任何记录, 请稍后操作', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        } else {
          this.$api.bsp.message.setMsgReaded(msgIds).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              if (isBatch) {
                this.$notify({
                  message: ret.msg,
                  type: MsgType.SUCCESS,
                  duration: 2000
                });
              }
              // 刷新提醒
              this.$store.dispatch('refershMsgTip', {key: 'notReadedMsgCount'});
              this.reload({messageTypeCode: 'notReaded'});
            }
          });
          this.checkedMsgIds = [];
        }
      }
    },
    components: {
      'message-info-dialog': messageInfo
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
    color:$font-color;
    position: relative;
    &:first-child {
      border-top:1px solid $border-color;
    };
    &:hover{
      background:$dark-white;
    }
    .message-table-date{
      position: absolute;
      left: 0px;
      width: 110px;
      text-align: center;
      padding: 10px 0px 10px;
      font-size: 12px;
      &:before{
          content:'';
          border: 1px solid $border-color;
          border-radius: 50%;
          display: block;
          height: 9px;
          position: absolute;
          right: -6px;
          top: 15px;
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
      margin-left: 110px;
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
    margin: 0 0 10px !important;
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
