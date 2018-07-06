<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true"></pl-page-nav>
    <pl-content-box-block>
      <el-form label-width="100px" :model="form" ref="form">
        <el-row>
          <el-col :span="24">
            <el-form-item label="应用" prop="appId" class="text-left"
                          :rules="[{required: true, message: '请选择应用', trigger: 'change'}]">
              <pl-content-item-text>
                <span v-for="(item,index) in applications">{{item.appName}}</span>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
        </el-row>
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

      <quill-editor :options="editorOption" :content="content" ref="noticeTextEditor"
                    @change="onEditorChange"></quill-editor>
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
        addDialogVisible: false,
        loading: false,
        frontState: true,
        noticeState: true,
        isSelected: false,
        content: '',
        applications: [],
        isEdit: '',
        form: {
          noticeId: null,
          front: '0',
          noticeState: '0',
          appId: '',
          content: '',
          title: ''
        },
        editorOption: {
          placeholder: '请输入任何内容',
          modules: {
            toolbar: [
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
              ['link']
            ],
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
        // console.log('editor change!', editor, html, text);
        this.form.content = html;
        this.content = html;
      },
      show (obj) {
        let that = this;
        let _applications = this.$store.state.contextData.applications;
        this.applications = _applications.filter((item) => {
          if (item.appId === obj.appId) {
            //  item.isSelected = true;
            that.isSelected = true;
            return true;
          }
        });
        this.form.appId = obj.appId;
        if (obj.noticeId) {
          this.setFrom(obj);
        } else {
          this.resetFrom();
        }
        that.addDialogVisible = true;
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
              this.$emit('update-table');
              this.goBack();
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
