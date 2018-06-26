<template>
  <el-select :clearable="clearable" :disabled="disabled" placeholder="请选择" v-model="selected">
    <el-option :label="emptyLabel" :value="emptyKey" v-if="showEmpty"></el-option>
    <el-option v-for="(item,key) in arr" :label="item.dicName" :value="item.dicCode" :key="key"></el-option>
  </el-select>
</template>

<script>
  import config from '../config';
  import dictionaryUtil from '../../../core/utils/dictionary-util';
  export default {
    name: config.prefix + 'DictionarySelect',
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
        default: '',
        required: true
      },
      invalidDics: {
        type: String,
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
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selected: this.value,
        arr: this.dicState()
      };
    },
    methods: {
      dicState () {
        let dic = dictionaryUtil.getDic(this.type);
        if (dic && dic.children) {
          let invalidDics = ',' + this.invalidDics + ',';
          return dic.children.filter(item => {
            if (invalidDics.indexOf(',' + item.dicCode + ',') !== -1) {
              return false;
            }
            return item.dicState === 'E';
          });
        }
        return [];
      },
      reset () {
        this.arr = this.dicState();
      }
    },
    watch: {
      value (val) { // 监听value的变化
        if (val === this.selected) return;
        this.selected = val;
      },
      selected (val) {
        this.$emit('input', String(val));
        this.$emit('change');
        this.dispatch('ElFormItem', 'el.form.change', String(val));
      }
    }
  };
</script>

<style scope>

</style>
