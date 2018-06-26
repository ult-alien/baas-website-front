<template>
  <div class="upload-file ">
    <vue-image ref="imgFancybox" :imgs="fileList" :modalclose="true" :current-select-title="selectTitle"
               :showthumbnails="true" :imagecountseparator="'/'" :mousescroll="true"></vue-image><!-- ddd -->
    <div class="upload-file-container" :class="{'upload-file-container__only-one':isOnlyOne}" v-loading="fileStatus === 'uploading'">
      <!--<div class="upload-progress" v-if="fileStatus === 'uploading'">
        <el-progress :stroke-width="18" :text-inside="true" :percentage="_parsePercentage()" :width="60"></el-progress>
      </div>-->
      <div class="file-item" v-for="(file,index) in fileList">
        <div class="file-type">
          <div class="fancybox" v-if="file.isImg">
            <img :src="file.url" height="58" width="54">
            <div class="search" @click="toPreview(index,file.url)" v-show="modalUpload">
              <i class="el-icon-view"></i>
            </div>
          </div>
          <div :class="file.url" class="file-type-other" v-if="!file.isImg"></div>
        </div>
        <el-tooltip effect="dark" :content="file.name" placement="top">
          <div class="file-name">{{file.name}}</div>
        </el-tooltip>
        <div class="file-action file-action__right">
          <table>
            <tr>
              <td align="center" valign="middle">
                <div class="file-action-btn" @click="_downloadFile(file)"><i class="anticon icon-download"></i>
                </div>
                <div class="file-action-btn" v-if="isEdit" @click="_delFile(file,index)"><i class="anticon icon-delete"></i></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <el-upload class="avatar-uploader" v-show="showFlag" :action="action"
                 :on-preview="_handlePictureCardPreview"
                 :data="data" :on-success="_handlePictureSuccess"
                 :before-upload="_handleBeforeUpload" :auto-upload="autoUpload" :accept="acceptType"
                 :show-file-list="false" :on-progress="_handleProgress" :on-error="_handleError" :multiple="multiple">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
  import {HttpPrefix} from 'core/constants';
  import {http} from 'vue';
  import config from '../config';
  import vueImage from './lightbox/lightbox';  //  ddd
  import {isImage, setFileLogo, handleFileType} from './upload-util';
  import httpUtil from '../../../core/utils/http-util';
  import sysUtil from '../../../core/utils/sys-util';
  import Big from 'big.js';
  export default {
    components: {  //  ddd
      vueImage
    },
    name: config.prefix + 'UploadFile',
    props: {
      fileType: {  // 文件类型
        type: String,
        required: true,
        default: ''
      },
      savePath: {  // 添加（扩展）保存的文件夹
        type: String,
        default: ''
      },
      autoUpload: {  // 是否自动上传
        type: Boolean,
        default: true
      },
      acceptType: {  // 可以上传的文件类型，默认所有
        type: String,
        default: ''
      },
      relateId: {  // 关联文件的ID
        type: String,
        default: ''
      },
      multiple: {  // 是否支持多选
        type: Boolean,
        default: false
      },
      isEdit: {  // 是否可以上传，false表示只能编辑文件，不能上传文件
        type: Boolean,
        default: true
      },
      isOnlyOne: {  // 是否只能关联（上传）一个文件，true表示可以关联（上传）一个个文件
        type: Boolean,
        default: false
      },
      afterUpload: { // 上传成功之后操作
        type: Function,
        default: () => {
        }
      },
      modalUpload: {
        type: Boolean,
        default: true
      },
      size: {
        type: Number,
        default: 10 // 10M
      },
      uploadAction: {
        type: String,
        default: '/file/pub-file/upload'
      },
      deleteFileAction: {
        type: String,
        default: '/file/pub-file/delete-file'
      },
      queryFileAction: {
        type: String,
        default: '/file/pub-file/select-files-by-relate-id'
      }
    },
    data () {
      return {
        action: httpUtil.genPath(HttpPrefix.API + this.uploadAction),
        fileStatus: 'ready',
        fileList: [],
        selectTitle: '',  // ddd
        isMultiple: true,
        percentage: 0,
        data: {
          fileType: '',
          savePath: ''
        }
      };
    },
    methods: {
      _parsePercentage () {
        return parseInt(this.percentage, 10);
      },
      toPreview (index, url) {
        this.selectTitle = url; // ddd
        this.$refs.imgFancybox.openImg(index);
      },
      _handlePictureCardPreview (file) {
      },
      _handleProgress (event) {
        this.fileStatus = 'uploading';
        this.percentage = event.percent || 0;
      },
      _delFile (file, index) {
        let vm = this;
        this.$confirm('删除之后不可以恢复，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.post(HttpPrefix.API + this.deleteFileAction, {id: file.uid})
            .then(function (response) {
              let data = response.body;
              if (data.type === 'success') {
                vm.fileList.splice(index, 1);
                vm.isMultiple = true;
                vm.setIds();
              }
            });
        }).catch(() => {
        });
      },
      _handlePictureSuccess (response, file, fileList) {
        if (response.type === 'success') {
          let data = response.bean;
          this.getFile(file, data);
          this.fileList.push(file);
          this.setIds();
          setTimeout(() => {
            this.fileStatus = 'ready';
          }, 500);
          this.afterUpload(file);
        }
        console.log('success', response, file, fileList);
      },
      _handleError (err1, file, fileList) {
        setTimeout(() => {
          this.fileStatus = 'ready';
        }, 500);
      },
      _downloadFile (file) {
        sysUtil.download(httpUtil.genPath(HttpPrefix.API + '/file/pub-file/download?id=' + file.uid));
      },
      _handleBeforeUpload (file) {
        let flag = handleFileType(this.acceptType, file.name);
        if (!flag) {
          let tip = '文件类型不正确,只允许上传"' + this.acceptType + '"文件格式的文件！';
          this.$alert(tip, '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
          return false;
        }

        let size = new Big(file.size);
        if (size.div(1024).div(1024).gt(this.size)) {
          this.$alert('文件大小不能超过 ' + this.size + 'M', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
          return false;
        }

        this.percentage = 0;
        this.fileStatus = 'uploading';
        this.data.fileType = this.fileType;
        this.data.savePath = this.savePath;
      },
      getFile (file, data) {
        file.url = setFileLogo(data.fileName, data.fileId, HttpPrefix.API);
        file.name = data.fileName;
        file.uid = data.fileId;
        file.isImg = isImage(data.fileName);
        this.isMultiple = !this.isOnlyOne;
        return file;
      },
      setIds () {
        let ids = '';
        for (let i = 0, len = this.fileList.length; i < len; i++) {
          let data = this.fileList[i];
          if (!ids) {
            ids = data.uid;
          } else {
            ids += ',' + data.uid;
          }
        }
        this.$emit('input', ids);
      },
      queryFile () {
        this.fileList = [];
        if (this.relateId) {
          let vm = this;
          http.post(HttpPrefix.API + this.queryFileAction, {
            relateId: vm.relateId,
            fileType: vm.fileType
          }).then((response) => {
            let data = response.body;
            for (let i = 0, len = data.length; i < len; i++) {
              vm.fileList.push(vm.getFile({}, data[i]));
            }
            vm.setIds();
          });
        }
      },
      clearUploadList () {  //  清除列表，上传弹框组件调用
        this.isMultiple = true;
        this.fileList = [];
        this.setIds();
      }
    },
    mounted () {
      this.queryFile();
    },
    watch: {
      relateId () {
        this.queryFile();
      },
      fileType () {
        this.queryFile();
      }
    },
    computed: {
      showFlag () {
        return this.isMultiple && this.isEdit;
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../assets/scss/mixin";
  @import "../../../assets/scss/variables";
  .upload-file-container {
    position: relative;
    border: 1px solid #e7e7eb;
    padding: 12px 0px 0px 12px;
    background-size: 16px 16px;
    min-height: 74px;
    @include clearfix;
    background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.03) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0.03) 75%, transparent 75%, transparent);
    .upload-progress {
      z-index: 900;
      height: 100%;
      width: 100%;
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
      background: rgba(255, 255, 255, 0.8);
      text-align: center;
      .el-progress {
        top: 50%;
      }
    }
    &.upload-file-container__only-one {
      padding: 10px;
      background: none;
      min-height: auto;
      border-radius: 0px;
      .avatar-uploader {
        float: none;
        margin-bottom: 0px;
        .el-upload {
          display: block;
          height: auto;
          width: auto;
        }
      }
      .file-item {
        float: none;
        width: auto;
        margin-right: 0px;
        margin-bottom: 0px;
        box-shadow: none;
        background: none;
        .file-name {
          width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          /*text-overflow: clip;*/
        }
        .file-action {
          float: right;
          margin-right: 10px;
        }
      }
    }
    .avatar-uploader {
      text-align: center;
      font-size: 36px;
      color: #ddd;
      float: left;
      margin-bottom: 12px;
      .el-upload {
        height: 60px;
        width: 200px;
        line-height: 59px;
        border: 1px dashed #ddd;
        border-radius: 0px;
        box-shadow: none;
        background-color: #FFF;
        &:hover {
          border: 1px dashed #428bca;
          color: #428bca;
        }
      }
    }
    .file-item {
      height: 60px;
      width: 200px;
      background: #fff;
      border: 1px solid $border-color;
      /* box-shadow: 2px 2px 5px RGBA(0, 0, 0, 0.38);*/
      margin-right: 12px;
      margin-bottom: 12px;
      float: left;
      position: relative;
      .file-type {
        height: 58px;
        width: 58px;
        float: left;
        .file-type-other {
          height: 58px;
          width: 54px;
        }
        .doc, .docx {
          background: url("./fileType/doc.png") no-repeat;
          background-size: 54px 58px;
        }
        .xls, .xlsx {
          background: url("./fileType/xls.png") no-repeat;
          background-size: 54px 58px;
        }
        .txt {
          background: url("./fileType/txt.png") no-repeat;
          background-size: 54px 58px;
        }
        .pdf {
          background: url("./fileType/pdf.png") no-repeat;
          background-size: 54px 58px;
        }
        .rar {
          background: url("./fileType/rar.png") no-repeat;
          background-size: 54px 58px;
        }
        .zip {
          background: url("./fileType/zip.png") no-repeat;
          background-size: 54px 58px;
        }
        .ppt {
          background: url("./fileType/ppt.png") no-repeat;
          background-size: 54px 58px;
        }
        .file-lg {
          background: url("fileType/file.png") no-repeat;
          background-size: 54px 60px;
        }
        .fancybox {
          position: relative;
          display: block;
          &:hover .search {
            display: block;
            transform: scale(0.8);
          }
          .search {
            cursor: pointer;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            position: absolute;
            top: 10px;
            left: 7px;
            text-align: center;
            line-height: 40px;
            background: rgba(0, 0, 0, 0.4);
            font-size: 18px;
            color: #ccc;
            transform: scale(0);
            transition: all 0.2s;
          }
        }
      }
      .file-name {
        height: 60px;
        width: 110px;
        float: left;
        padding: 5px 5px 5px 0px;
        text-align: left;
        vertical-align: middle;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        line-height: 50px;
      }
      .file-action {
        height: 60px;
        width: 30px;
        float: left;
        padding-left: 5px;
        .file-action-btn {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 50%;
          color: #B3B3B3;
          cursor: pointer;
          &:hover {
            background: #ddd;
            color: #428bca;
          }
        }
        td {
          vertical-align: middle;
          height: 60px;
        }
      }
    }
  }
  .el-form-item{
    &.is-error {
      .upload-file-container{
        border: 1px solid $danger-color;
      }
    }
    &.is-success {
      .upload-file-container{
        border: 1px solid $success-color;
      }
    }
  }
</style>
