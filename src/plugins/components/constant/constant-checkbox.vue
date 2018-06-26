<template>
  <div class="constant-checkbox" >
    <el-checkbox-group  v-model="typeData">
      <el-checkbox  v-for="(value, key) in data" :label="key" :key="key">{{value}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  import config from '../config';
  import constantUtil from '../../../core/utils/constant-util';
  export default {
    name: config.prefix + 'ConstantCheckbox',
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
        return constantUtil.getConstant(this.type);
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
