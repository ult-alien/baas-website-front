<template>
  <el-dialog title="消息详情" :visible.sync="dialogVisible">
    <div class="text-center" style="padding-bottom: 10px;">{{form.title}}</div>
    <div style="padding-bottom: 5px;">{{form.content}}</div>
    <div class="text-right" style="padding-right: 10px;">{{form.sendTime}}</div>
    <div slot="footer" class="dialog-footer text-center">
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      <!--<el-button type="primary" @click="dialogVisible = false">确定</el-button>-->
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          title: '',
          content: '',
          sendTime: ''
        },
        dialogVisible: false
      };
    },
    methods: {
      show (row) {
        let vm = this;
        vm.form = row;
        vm.dialogVisible = true;
      },
      close () {
        this.dialogVisible = false;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
