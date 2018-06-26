<template>
  <el-cascader
    :options="options"
    :props="config"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
</template>

<script>
  import config from '../config';
  import json from './citydata.json';
  export default {
    name: config.prefix + 'CitySelect',
    props: {
      value: {
        type: Array,
        default () {
          return [];
        }
      },
      level: {
        type: Number,
        default: 3 // 只支持1,2,3
      }
    },
    created () {
      let provinceLevelCity = ['北京市', '上海市', '天津市', '重庆市'];
      if (this.level === 3) {
        this.options = json;
      } else if (this.level === 2) {
        this.options = json.map(item => {
          let tempItem = {...item};
          if (provinceLevelCity.indexOf(item.name) !== -1) {
            delete tempItem.children;
          } else {
            if (tempItem.children) {
              tempItem.children = item.children.map(subItem => {
                let tempSubItem = {...subItem};
                delete tempSubItem.children;
                return tempSubItem;
              });
            }
          }
          return tempItem;
        });
      } else {
        this.options = json.map(item => {
          return {
            code: item.code,
            name: item.name
          };
        });
      }
    },
    data () {
      return {
        selectedOptions: this.value,
        options: [],
        config: {
          value: 'name',
          label: 'name'
        }
      };
    },
    methods: {
      handleChange (val) {
        this.$emit('input', val);
        this.$emit('change');
      }
    },
    watch: {
      value (val) {
        this.selectedOptions = val;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


