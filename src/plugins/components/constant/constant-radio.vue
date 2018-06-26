<template>
	<div class="constant-radio" >
  		<el-radio-group v-for="(item, key) in data" v-model="pstate" :key="key">
            <el-radio ref="radio" :label="key" style="padding-top:7px;padding-left:10px;" >{{item}}</el-radio>
      </el-radio-group>
	</div>
</template>

<script type="text/javascript">
import config from '../config';
import constantUtil from '../../../core/utils/constant-util';
export default {
  name: config.prefix + 'ConstantRadio',
  props: {
    type: {
      type: String,
      default: '',
      require: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
//      pdata: this.$store.state.contextData.constantsValueMap[this.type],
      pstate: this.value
    };
  },
  computed: {
    data () {
      return constantUtil.getConstant(this.type);
    }
  },
  watch: {
    value (val) {
      this.pstate = val;
    },
    pstate (val) {
      this.$emit('input', val);
      this.$emit('change');
      this.dispatch('ElFormItem', 'el.form.change', String(val));
    }
  }
};
</script>
