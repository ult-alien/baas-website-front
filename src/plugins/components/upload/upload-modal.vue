<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" size="tiny">
    <div class="upload-modal">
      <slot name="upload-file">
        <pl-upload-file :file-type="fileType" ref="plUpload" :auto-upload="true" :accept-type="acceptType" :is-only-one="true" v-model="fileId" :modal-upload="false" :after-upload="afterUpload"></pl-upload-file>
      </slot>
    </div>
    <div slot="footer" class="dialog-footer text-center">
      <el-button type="primary" @click="submit">{{uploadText}}</el-button>
      <el-button type="default" @click="close">{{cancelText}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import config from '../config';
  export default {
    name: config.prefix + 'UploadFileModal',
    props: {
      title: {
        type: String,
        default: '上传文件'
      },
      fileType: {
        type: String,
        required: true,
        default: ''
      },
      savePath: {  // 添加（扩展）保存的文件夹
        type: String,
        default: ''
      },
      acceptType: {
        type: String,
        default: ''
      },
      afterUpload: {
        type: Function,
        default: () => {
        }
      },
      uploadText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      }
    },
    data () {
      return {
        dialogVisible: false,
        fileId: ''
      };
    },
    methods: {
      show () {
        this.dialogVisible = !this.dialogVisible;
        if (this.$refs['plUpload']) {
          this.$refs['plUpload'].clearUploadList();
        }
      },
      submit () {
        this.$emit('doneUpload', this.fileId);
        this.dialogVisible = false;
      },
      close () {
        this.dialogVisible = false;
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss"></style>
