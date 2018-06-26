<template>
  <div class="dictionary-checkbox" >
    <el-checkbox-group v-model="typeData">
      <el-checkbox v-for="(value, key) in data" :label="value.dicCode" :key="key">{{value.dicName}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script type="text/javascript">
  import config from '../config';
  import dictionaryUtil from '../../../core/utils/dictionary-util';
  export default {
    name: config.prefix + 'DictionaryCheckbox',
    props: {
      value: {
        type: Array,
        default: function () {
          return [];
        }
      },
      type: {
        type: String,
        require: true
      }
    },
    watch: {
      value (val) {
        let valStr = val.join(',');
        let typeDataStr = this.typeData.join(',');
        if (valStr === typeDataStr) return;
        this.$nextTick(() => {
          this.typeData = val;
        });
      },
      typeData () {
        this.updateValue();
      }
    },
    data () {
      return {
        typeData: this.value
      };
    },
    computed: {
      data () {
        let dic = dictionaryUtil.getDic(this.type);
        if (dic && dic.children) {
          return dic.children.filter(item => {
            return item.dicState === 'E';
          });
        }
        return [];
      }
    },
    methods: {
      updateValue () {
        this.$emit('input', this.typeData);
        this.$emit('change');
        this.dispatch('ElFormItem', 'el.form.change', this.typeData);
      }
    }
  };
</script>
