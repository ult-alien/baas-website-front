<template>
	<div class="dictionary-radio" >
  		<el-radio-group v-for="(item, key) in arr" v-model="pstate" :key="key">
            <el-radio ref="radio" :label="item.dicCode" style="padding-top:7px;padding-left:10px;">{{item.dicName}}</el-radio>
      </el-radio-group>
	</div>
</template>

<script type="text/javascript">
import config from '../config';
import dictionaryUtil from '../../../core/utils/dictionary-util';
export default {
  name: config.prefix + 'DictionaryRadio',
  props: {
    type: {
      type: String,
      default: '',
      require: true
    },
    value: {
      default: ''
    }
  },
  methods: {
    dicState () {
      let dic = dictionaryUtil.getDic(this.type);
      if (dic && dic.children) {
        return dic.children.filter(item => {
          return item.dicState === 'E';
        });
      }
      return [];
    }
  },
  data () {
    return {
      arr: this.dicState(),
      pstate: this.value
    };
  },
  watch: {
    value (val) {
      if (val === this.pstate) return;
      this.pstate = val;
    },
    pstate (val) {
      this.$emit('input', String(val));
      this.$emit('change');
      this.dispatch('ElFormItem', 'el.form.change', String(val));
    }
  }
};
</script>
