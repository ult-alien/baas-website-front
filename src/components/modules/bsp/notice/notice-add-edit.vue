<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true"></pl-page-nav>
    <pl-content-box-block>
      <el-form label-width="100px" :model="form" ref="form">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title" :rules="[
                    {required: true, message: '请输入标题', trigger: 'change' },
                    { max: 100, message: '字符长度不能超过100', trigger: 'change' }
                ]">
              <pl-content-item-text>
                <el-input v-model="form.title"></el-input>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="首页附件" class="notice-form" prop="fileIds" :rules="[{required: true, message: '请选择文件', trigger: 'blur,change'}]">
              <pl-upload-file  style="padding-left:10px;padding-right: 10px;"  file-type="2" accept-type="jpg,png,gif,bmp" :relate-id="form.noticeId" :is-only-one="true" v-model="form.fileIds" :size="20" :after-upload="handleAfterUpload"></pl-upload-file>
              <!--<el-input v-model="form.ufileIds" placeholder="输入别名"></el-input>-->
            </el-form-item>
            <!--<el-form-item label="首页附件" v-else>
              <pl-upload-file :file-type="'2'"  :relate-id="form.noticeId" :is-edit="false" :multiple="true"></pl-upload-file>
            </el-form-item>-->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否置顶">
              <pl-content-item-text>
                <el-switch v-model="frontState" on-text="是" off-text="否"></el-switch>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公布状态" class="text-left">
              <pl-content-item-text>
                <el-switch v-model="noticeState" on-text="发布" off-text="停用"></el-switch>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <quill-editor :options="editorOption" :content="content" ref="noticeTextEditor" @change="onEditorChange"></quill-editor>
      <el-upload
        class="edit-avatar-uploader"
        :show-upload-list="false"
        style="display: none;"
        accept="jpg,png,gif,bmp"
        :on-success="handleFileSuccess"
        :before-upload="handlerBeforeUpload"
        :data="uploadForm"
        :action="uploadApi"
        ref="up"
        name="file"></el-upload>
    </pl-content-box-block>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button @click="goBack">返回</el-button>
        <el-button type="primary" :loading="loading" @click="save">确定</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </pl-content-box>
</template>
<script>
  import Big from 'big.js';
  import {MsgType, HttpPrefix} from 'core/constants';
  import httpUtil from 'core/utils/http-util';
  import config from '../../../../config';
  import {quillEditor, Quill} from 'vue-quill-editor';
  import {ImageResize} from './js/ImageResize.js';   // 图片大小改变js
  Quill.register('modules/imageResize', ImageResize);   // 注册imgresize到quill编辑器,前面的modules/xxxxx是固定的,最终注册成modules里面的配置
  const state = {
    false: '0',
    true: '1'
  };
  export default {
    components: {
      quillEditor
    },
    data () {
      return {
        uploadApi: httpUtil.genPath(HttpPrefix.API + '/file/pub-file/upload'),
        size: 5,
        loading: false,
        frontState: true,
        noticeState: true,
        isSelected: false,
        content: '',
        applications: [],
        isEdit: '',
        uploadForm: {
          fileType: '3',
          relateId: 'notice-editor'
        },
        form: {
          noticeId: null,
          front: '0',
          noticeState: '0',
          appId: '',
          content: '',
          title: '',
          fileIds: ''
        },
        editorOption: {
          placeholder: '请输入任何内容',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{'header': 1}, {'header': 2}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],
                [{'indent': '-1'}, {'indent': '+1'}],
                [{'direction': 'rtl'}],
                [{'size': ['small', false, 'large', 'huge']}],
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}],
                [{'font': []}],
                [{'align': []}],
                ['clean'],
                ['link', 'image']
              ],
              handlers: {
                'image': function (value){
                  if (value) {
                    document.querySelector('.edit-avatar-uploader input').click();
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            },
            imageResize: {
              displaySize: true
            }
          }
        }
      };
    },
    methods: {
      onEditorReady (editor) {
        // console.log('editor ready!', editor);
      },
      onEditorChange ({editor, html, text}) {
        // console.log('editor change!', html.length);
        this.form.content = html;
        this.content = html;
      },
      handleAfterUpload () {
        this.$refs['form'].validate();
      },
      handleFileSuccess (response, file, fileList) { // 正文内容上传相关
        if (response.type === 'success') {
          let data = response.bean;
          this.createFileUrl(file, data);
          let quill = this.$refs.noticeTextEditor.quill;
          if (quill) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            quill.insertEmbed(length, 'image', file.url);
            // 调整光标到最后
            quill.setSelection(length + 1);
          }
        }
      },
      createFileUrl (file, data) { // 正文内容上传相关
        file.url = this.setFileUrl(data.fileId);
      },
      setFileUrl (fileId) { // 正文内容上传相关
        return httpUtil.genPath(HttpPrefix.API + '/file/pub-file/download?id=' + fileId);
      },
      handlerBeforeUpload (file) { // 正文内容上传相关
        let flag = this.handleEditorFileType('jpg,png,gif,bmp', file.name);
        if (!flag) {
          let tip = '文件类型不正确,只允许上传"' + 'jpg,png,gif,bmp' + '"文件格式的文件！';
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
      },
      handleEditorFileType (acceptType, filename) {
        if (acceptType) {
          let type = filename.slice(filename.lastIndexOf('.') + 1);
          if (type) {
            type = type.toLowerCase();
          }
          let arrowTypeArr = acceptType.split(',');
          let flag = false;
          for (let i = 0; i < arrowTypeArr.length; i++) {
            if (type.indexOf(arrowTypeArr[i]) !== -1) {
              flag = true;
              break;
            }
          }
          return flag;
        }
        return true;
      },
      show (obj) {
        if (obj.noticeId) {
          this.setFrom(obj);
        } else {
          this.resetFrom();
        }
      },
      resetFrom () {
        this.form.noticeId = null;
        this.frontState = true;
        this.noticeState = true;
        this.content = '';
        this.form.content = '';
        this.form.title = '';
      },
      toSelectApp (item, index) {
        /* if (this.isEdit === '0') {
         this.$set(item, 'isSelected', !item.isSelected);
         if (item.isSelected) {
         this.form.appIds[index] = item.appId;
         } else {
         this.form.appIds[index] = null;
         }
         this.form.appIds = this.form.appIds.filter((item) => {
         return item;
         });
         console.log(this.form.appIds);
         this.$refs['form'].validateField('appIds');
         } */
      },
      setFrom (obj) {
        if (obj.noticeState === '0') {
          this.noticeState = false;
        } else if (obj.noticeState === '1') {
          this.noticeState = true;
        }
        if (obj.front === '0') {
          this.frontState = false;
        } else if (obj.front === '1') {
          this.frontState = true;
        }
        this.form.title = obj.title;
        this.content = obj.content;
        this.form.noticeId = obj.noticeId;
      },
      goBack () {
        this.resetFrom();
        // this.$router.push({name: 'bsp.biz.notice-list', params: {appId: this.form.appId}});
        let previousRouter = this.$store.state.previousRouter;
        let previousRouterUrl = config.defaultRoute();
        if (previousRouter && previousRouter.name) {
          previousRouterUrl = previousRouter.name;
        }
        this.$router.push({name: previousRouterUrl});
        // this.$router.back();
      },
      save () {
        let that = this;
        this.form.front = state[that.frontState];
        this.form.noticeState = state[that.noticeState];
        if (this.form.content.length > 52000) {
          this.$alert('正文内容太长，请重新编辑', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
          return;
        }
        /* this.form.appId =this.applications.map((item) => {
         if (item.isSelected) {
         return item;
         }
         }).join(','); */
        this.$refs['form'].validate((valid) => {
          if (valid) {
            that.loading = true;
            that.$api.bsp.notice.addNotice(this.form).then(ret => {
              that.loading = false;
              if (!ret.show) {
                this.$notify({
                  title: '提示',
                  type: ret.type,
                  message: ret.msg,
                  duration: 1000
                });
              }
              if (ret.type === MsgType.SUCCESS) {
                this.$emit('update-table');
                this.goBack();
              }

              /* this.resetFrom();
               this.$router.push({name: 'bsp.biz.notice-list'}); */
              // this.$router.back();
            });
          } else {
            return false;
          }
        });
      },
      close () {
      }
    },
    computed: {
      editor () {
        return this.$refs.noticeTextEditor.quillEditor;
      }
    },
    mounted () {
      let params = this.$route.params;
      if (!params.isEdit) {
        this.$router.push(config.defaultRoute());
      }
      this.isEdit = params.isEdit;
      this.show(params);
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .ql-container .ql-editor {
    position: relative;
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .notice-form{
    &.el-form-item--medium .el-form-item__content {
      height: auto!important;
    }
  }

  .list-item {
    display: inline-block;
    padding: 10px 15px;
    background: #F9F9F9;
    border: 1px solid #ddd;
    height: 40px;
    text-align: center;
    margin-right: 30px;
    width: 150px;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &.selected {
      position: relative;
      box-shadow: 1px 1px 0px #41b883 inset, -1px -1px 0px #41b883 inset;
      &::before {
        content: '';
        width: 0px;
        height: 0px;
        border: 10px solid;
        border-color: transparent #41b883 #41b883 transparent;
        right: 0px;
        bottom: 0px;
        position: absolute;
      }
      &::after {
        content: "";
        position: absolute;
        box-sizing: content-box;
        border: 2px solid #FFF;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg);
        transform-origin: center;
        right: 2px;
        bottom: 2px;
        line-height: 10px;
        height: 8px;
        color: #fff;
        font-size: 12px;
        width: 5px;
      }
    }
  }
</style>
