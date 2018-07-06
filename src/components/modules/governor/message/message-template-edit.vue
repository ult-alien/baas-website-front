<template>
  <el-dialog title="消息模板编辑" :visible.sync="dialogVisible">
    <pl-content-box-card class="no-border">
      <el-form label-width="100px"  :model="form" ref="form">
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务类型" prop="msgTplType" :rules="[
                    { required: true, message: '业务类型', trigger: 'change' },
                    { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                  ]">
              <el-input v-model="form.msgTplType" placeholder="输入业务类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="systemMsgFlag">
            <el-form-item label="消息标题"  prop="title" :rules="[
                    { required: true, message: '输入消息标题', trigger: 'change' },
                    { max: 50, message: '字符长度消息标题50', trigger: 'change' }
                  ]">
              <el-input v-model="form.title"   placeholder="输入消息标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送短信"  prop="sms">
              <pl-content-item-text>
                <el-switch v-model="smsFlag" on-text="是" off-text="否"> </el-switch>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送站内信"  prop="systemMsg">
              <pl-content-item-text>
                <el-switch v-model="systemMsgFlag" on-text="是" off-text="否"> </el-switch>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接收角色"  prop="roleIds">
              <el-select v-model="roleIds" filterable multiple placeholder="请选择接收角色">
                <el-option
                  v-for="item in roles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="通知资源"  prop="resIds">
              <el-select v-model="resIds" filterable multiple placeholder="请选择通知资源">
                <el-option
                  v-for="item in ress"
                  :key="item.resId"
                  :label="item.resName"
                  :value="item.resId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关键字" prop="content">
              <pl-content-item-text :isMultiLine="true" style="margin-top: -10px;">
                <el-button size="mini" @click="insertString(item)" type="defualt" style="margin-top: 10px;" v-for="item in keyWords">{{item.name}}</el-button>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="模板内容" prop="content" :rules="[
               { required: true, message: '模板内容', trigger: 'change' },
               { max: 500, message: '字符长度不能超过500', trigger: 'change' }
              ]">
              <el-input ref="contentInput" type="textarea" :autosize="{minRows: 4}"  v-model="form.content" placeholder="输入模板内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="form.content">
            <el-form-item label=" " prop="content">
              <span v-html="previewContent" style="word-break: break-all;"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-card>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {MsgType} from '../../../../core/constants';
  export default {
    data () {
      return {
        form: {
          msgTplType: '',
          title: '',
          sms: '1',
          systemMsg: '1',
          content: '',
          roleIds: '',
          resIds: ''
        },
        keyWords: [],
        loading: false,
        dialogVisible: false,
        type: 0,
        parentNode: null,
        smsFlag: true,
        systemMsgFlag: true,
        previewContent: '',
        roles: [],
        ress: [],
        roleIds: [],
        resIds: []
      };
    },
    watch: {
      roleIds () {
        if (this.roleIds) {
          this.form.roleIds = this.roleIds.join(',');
        } else {
          this.form.roleIds = '';
        }
      },
      resIds () {
        if (this.resIds) {
          this.form.resIds = this.resIds.join(',');
        } else {
          this.form.resIds = '';
        }
      },
      smsFlag () {
        if (this.smsFlag) {
          this.form.sms = '1';
        } else {
          this.form.sms = '0';
        }
      },
      systemMsgFlag () {
        if (this.systemMsgFlag) {
          this.form.systemMsg = '1';
        } else {
          this.form.systemMsg = '0';
        }
      },
      'form.content' () {
        this.genPreviewContent();
      }
    },
    methods: {
      insertString (item) {
        let str = item.code;
        let contentInput = this.$refs['contentInput'].$el.querySelector('textarea');
        contentInput.focus();
        if (document.selection) {
          let r = document.selection.createRange();
          document.selection.empty();
          r.text = str;
          r.collapse();
          r.select();
        } else {
          let newstart = contentInput.selectionStart + str.length;
          let oldValue = this.form.content;
          let value = oldValue.substr(0, contentInput.selectionStart) + str + oldValue.substring(contentInput.selectionEnd);
          this.form.content = value;
          this.$nextTick(() => {
            contentInput.selectionStart = newstart;
            contentInput.selectionEnd = newstart;
          });
        }
      },
      genPreviewContent () {
        this.previewContent = this.form.content;
        this.keyWords.forEach(item => {
          let reg = new RegExp(item.code, 'g');
          this.previewContent = this.previewContent.replace(reg, '<span class="text-primary">' + item.preview + '</span>');
        });
      },
      show (id) {
        this.retsetFrom(); // 重置表单
        this.$api.bsp.message.selectTemplate(id).then((ret) => {
          this.keyWords = ret.keywords;
          delete ret.keywords;
          setTimeout(() => {
            this.form = ret;
            this.roleIds = [];
            this.resIds = [];
            if (this.form.roleIds) {
              this.roleIds = this.form.roleIds.split(',');
            }
            if (this.form.resIds) {
              this.resIds = this.form.resIds.split(',');
            }
            this.smsFlag = ret.sms === '1';
            this.systemMsgFlag = ret.systemMsg === '1';
          }, 250);
          this.dialogVisible = true;

          this.$api.bsp.role.selectAllRole('').then(ret => {
            this.roles = ret;
          });

          this.$api.bsp.resource.selectAllRes('').then(ret => {
            this.ress = ret;
          });
        });
      },
      retsetFrom () {
        if (this.$refs['form']) { // 重置表单
          this.$refs['form'].resetFields();
        }
      },
      close () {
        this.dialogVisible = false;
      },
      sure () {
        this.$refs['form'].validate((valid) => { // 验证
          if (valid) {
            this.loading = true;
            this.$api.bsp.message.saveTemplate(this.form).then(ret => {
              this.loading = false;
              if (MsgType.SUCCESS === ret.type) {
                this.$emit('after-update'); // 子组件的触发事件
                this.close();
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/variables";
  .content-warpper{
    border: 1px solid $border-color;
  }
</style>
