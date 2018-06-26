<template>
  <el-select
    :clearable="true"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="remote"
    @visible-change="init"
    v-model="selected">
    <el-option
      v-for="(item,index) in items"
      :label="item[lableKey]"
      :value="item[valueKey]"
      :key="index">
    </el-option>
    <el-option class="tip" :disabled="true" value="$#$" :class="{next: hasNext && items.length > 0}" v-if="!(total > 0 && !hasNext)">
      <el-button type="text"  size="mini"  @click="nextPage":loading="loading" style="width: 100%;padding: 0px; line-height: 25px;" >
        {{tip}}
      </el-button>
    </el-option>
  </el-select>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'RemoteSelect',
    props: {
      value: {
        default: ''
      },
      params: {
        type: Object,
        default: function () {
          return {};
        }
      },
      dataFun: {
        type: Function,
        required: true
      },
      pageSize: {
        type: Number,
        default: 10
      },
      loadingText: {
        type: String,
        default: '加载中...'
      },
      noMatchText: {
        type: String,
        default: '无匹配数据'
      },
      noDataText: {
        type: String,
        default: '无数据'
      },
      lableKey: {
        type: String,
        default: 'lable'
      },
      valueKey: {
        type: String,
        default: 'value'
      },
      labeValue: String,
      placeholder: String
    },
    data () {
      return {
        selected: this.value,
        total: 0,
        items: [],
        currentPage: 1,
        loading: false,
        query: '',
        tip: '',
        hasNext: true,
        isInit: false
      };
    },
    methods: {
      remote (query) {
        if (query !== '' && query === this.value) {
          return;
        }
        this.query = query;
        this.reload();
      },
      reload () {
        this.currentPage = 1;
        this._getData();
      },
      nextPage () {
        this.currentPage ++;
        this._getData();
      },
      init (show) {
        if (show && !this.isInit) {
          this.reload();
          this.isInit = true;
        }
      },
      _getData () {
        let filterData = {
          ...this.params,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          searchValue: this.query,
          [this.valueKey]: this.query !== '' ? '' : this.value
        };

        this.loading = true;
        this.tip = this.loadingText;
        this.dataFun(filterData).then(ret => {
          this.total = ret.total;
          setTimeout(() => {
            this.loading = false;
            if (this.currentPage === 1) {
              this.items = ret.data;
            } else {
              this.items = [...this.items, ...ret.data];
            }

            if (this.total) {
              this.hasNext = this.items.length < this.total;
              this.tip = '点击加载更多';
            } else {
              this.hasNext = false;
              this.tip = this.query !== '' ? this.noMatchText : this.noDataText;
            }
          }, 200);
        });
      }
    },
    watch: {
      value (val) {
        if (this.selected === val) {
          return;
        }
        this.selected = val;
      },
      selected (val) {
        console.info(val);
        this.$emit('input', val);
        let valueObj = {};
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i][this.valueKey] === val) {
            valueObj = this.items[i];
          }
        }

        this.$emit('change', valueObj);
        this.$emit('update:labeValue', valueObj[this.lableKey]);
        this.dispatch('ElFormItem', 'el.form.change', val);
      },
      params: {
        deep: true,
        handler () {
          console.info(this.params);
          this.reload();
        }
      }
    },
    created () {
      if (this.value) {
        this.init();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  .tip {
    text-align: center;
    padding: 0px;
    &.next {
      border-top: solid 1px $border-color;
    }
  }
</style>


