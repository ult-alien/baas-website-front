<template>
  <el-select :clearable="clearable" placeholder="请选择" v-model="selected">
    <el-option :label="emptyLabel" :value="emptyKey" v-if="showEmpty"></el-option>
    <el-option v-for="(item,key) in data" :label="item" :value="key" :key="key"></el-option>
  </el-select>
</template>

<script>
  import config from '../config';
  import constantUtil from '../../../core/utils/constant-util';
  export default {
    name: config.prefix + 'ConstantSelect',
    props: {
      value: {
        default: ''
      },
      clearable: {
        type: Boolean,
        required: false,
        default: false
      },
      type: {
        type: String,
        required: true,
        default: ''
      },
      emptyLabel: {
        type: String,
        default: '全部'
      },
      emptyKey: {
        type: String,
        default: ''
      },
      showEmpty: {
        type: Boolean,
        default: true
      },
      invalidKeys: {
        type: String,
        default: ''
      },
      customOption: {
        type: Object
      }
    },
    data () {
      return {
        selected: this.value
      };
    },
    computed: {
      data () {
        let constant = constantUtil.getConstant(this.type);
        let retObj = {};
        if (constant) {
          let invalidKeys = ',' + this.invalidKeys + ',';
          for (let key in constant) {
            if (invalidKeys.indexOf(',' + key + ',') !== -1) {
              continue;
            }
            retObj[key] = constant[key];
          }
        }
        if (this.customOption) {
          retObj = {...retObj, ...this.customOption};
        }
        return retObj;
      }
    },
    watch: {
      value (val) {
        if (this.selected === val) {
          return;
        }
        this.selected = val;
      },
      selected (val, oldVal) {
        this.$emit('input', val);
        this.$emit('change', val, oldVal);
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    }
  };
</script>

<style scope>

</style>
