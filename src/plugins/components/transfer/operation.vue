<template>
    <div :class="prefixCls + '-operation'">
        <el-row>
          <el-col >
            <el-button
                class="margin-bottom"
                type="primary"
                size="mini"
                :disabled="!rightActive"
                @click="moveToLeft"
                >
                <span> <i class="anticon icon-left"></i>{{operations[0]}}</span>
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-button
               class="margin-bottom"
                type="primary"
                size="mini"
                :disabled="!leftActive"
                @click="moveToRight"
                >
                <span> {{operations[1]}}<i class="anticon icon-right"></i></span>
            </el-button>
          </el-col>
        </el-row>
  </div>
</template>
<script>
export default {
  props: {
    prefixCls: String,
    operations: Array,
    leftActive: {
      type: Boolean,
      default: false
    },
    rightActive: {
      type: Boolean,
      default: false
    },
    moveToLeft: Function,
    moveToRight: Function
  },
  data () {
    return {};
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.margin-bottom {
  margin-bottom: 5px;
}
.ant-transfer-operation {
  display: inline-block;
  overflow: hidden;
  margin: 0 8px;
  vertical-align: middle;
}
</style>
