<template>
  <el-dialog
    title="服务协议及隐私权政策"
    :visible="dialogVisible"
    width="1090px"
    :show-close="false"
    :close-on-click-modal="false"
    center>
    <div class="dialog-cotent">
      <iframe width="100%" :height="'600px'" src="static/html/accreditation-prot.htm"></iframe>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">同意并继续</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false
      };
    },
    methods: {
      cancel () {
        this.dialogVisible = false;
        this.$emit('cancel');
      },
      show () {
        this.dialogVisible = true;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-cotent {
    p{
      text-indent: 2em;
    }
    max-height: 600px;
    overflow: hidden;
    margin: -20px -30px !important;
    padding: 20px 30px !important;
  }
</style>


