<template>
  <el-select :clearable="true" placeholder="请选择" v-model="selected">
    <!--<el-option :label="emptyLabel" :value="emptyKey" v-if="showEmpty"></el-option>-->
    <el-option
      v-for="(item,index) in items"
      :label="item.appName"
      :value="item.appId"
      :key="index">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      value: {
        default: ''
      },
      clearable: {
        type: Boolean,
        required: false,
        default: false
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
      }
    },
    data () {
      return {
        selected: this.value,
        items: []
      };
    },
    created () {
      this.items = this.$store.state.contextData.applications.filter(item => {
        return item.appState === 'E';
      });
      /* this.$api.bsp.app.getApplication().then((ret) => {
        this.items = ret;
        this.selected = this.items[0].appId;
      }); */
    },
    watch: {
      value (val) {
        if (this.selected === val) {
          return;
        }
        this.selected = val;
      },
      selected (val) {
        this.$emit('input', val);
        this.$emit('change');
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    }
  };
</script>

<style scope>

</style>
