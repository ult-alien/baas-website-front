<template>
<div
  :class="[
    prefixCls,
    className ? className : ''
  ]"
  :style="style">
    <div :class="prefixCls + '-header'">
       <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
            <span :class="prefixCls + '-header-selected'">
              <span>
              {{(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + dataSource.length + '条'}}
              </span>
            </span>
        </el-checkbox>
        <span :class="prefixCls + '-header-title'">{{titleText}} </span>
    </div>
    <div
    :class="[
      prefixCls + '-body',
      {'ant-transfer-list-body-with-search': showSearch}
    ]">
    <!-- 搜索框 -->
    <div
      v-if="showSearch"
      :class="prefixCls + '-body-search-wrapper'">
      <v-search
        :prefix-cls="prefixCls + '-search'"
        :searchValue="filter"
        @getFilter="getFilter"
        :search-placeholder="searchPlaceholder"
        :handle-clear="handleClear"
      ></v-search>
    </div>
    <!-- 数据的来源,选中的数据,title,样式,className -->
      <el-checkbox-group v-model="checkedKeys" @change="handleCheckedChange" class="ant-transfer-list-content" v-if="showItems.length">
          <el-checkbox v-for="(item,index) in showItems" :label="item.key" class="ant-transfer-list-content-item" :key="index">{{item.title}}</el-checkbox>
      </el-checkbox-group>
      <div
          v-else
          :class="prefixCls + '-body-not-found'"
          >{{notFoundContent || '列表为空'}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import vSearch from './search.vue';
  export default {
    props: {
      prefixCls: {
        type: String,  // ant-transfer-list
        default: ''
      },
      dataSource: {
        type: Array,
        default () {
          return [];
        }
      },
      render: Function,
      className: String,
      titleText: String,
      style: Object,
      notFoundContent: String,
      checkedKey: Array,
      handleFilter: Function, // 输入值后的处理函数
      handleClear: Function, // 点击图标后的执行函数
      searchPlaceholder: String,
      showSearch: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isIndeterminate: false,
        checkedKeys: [],
        checkAll: '',
        showItems: [],
        filter: '' // 输入的值
      };
    },
    created () {
      this.setFilteredDataSource();
    },
    watch: {
      // 父组件中的 值改变时,将子组件中的checkedKeys进行改变
      checkedKey () {
        this.checkedKeys = this.checkedKey;
        this.isIndeterminate = false;
        this.checkAll = false;
      },
      // 通过监听checkedKeys 的变化来传递值
      checkedKeys () {
        this.$emit('getCheckedKeys', this.checkedKeys);
      },
      dataSource () {
        this.setFilteredDataSource();
      },
      filter () {
        this.setFilteredDataSource();
      }
    },
    methods: {
      // 当搜索框输入数据时进行的操作
      setFilteredDataSource () {
        this.showItems = this.dataSource.map((item) => {
          const resultSource = item.title;
          if (
            this.filter &&
            this.filter.trim() &&
            !this.matchFilter(resultSource, this.filter)
            ) {
            return null;
          }
          return item;
        }).filter(item => !!item);
      },
      handleCheckAllChange (event) {
        let result = [];
        if (this.checkedKeys.length !== this.dataSource.length && this.dataSource.length !== 0) {
          this.dataSource.forEach((data) => {
            result.push(data.key);
            this.checkedKeys = event.target.checked ? result : [];
          });
        } else {
          this.checkedKeys = [];
        }
        this.isIndeterminate = false;
      },
      handleCheckedChange (value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkedKeys.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataSource.length;
        this.checkAll = this.checkedKeys.length === 0 ? '' : true;
      },
      matchFilter (text, filterText) {
        return text.indexOf(filterText) >= 0;
      },
      getFilter (filterValue) {
        this.filter = filterValue;
      }
    },
    components: {
      vSearch
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .el-checkbox-group > .el-checkbox {
    margin-left: 0px;
    display: block;
  }
  .ant-transfer-list {
    font-size: 12px;
    border: 1px solid #d9d9d9;
    display: inline-block;
    border-radius: 4px;
    vertical-align: middle;
    position: relative;
    width: 180px;
    height: 200px;
    padding-top: 33px;
    .ant-transfer-list-header {
        padding: 7px 16px;
        border-radius: 4px 4px 0 0;
        background: #fff;
        color: #666;
        border-bottom: 1px solid #e9e9e9;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .ant-transfer-list-header-title {
          float: right;
        }
      }
      .ant-transfer-list-body {
        font-size: 12px;
        position: relative;
        top: 1px;
        height: 100%;
        .ant-transfer-list-body-not-found {
          padding-top: 24px;
          color: #ccc;
          text-align: center;
          height: 100%;
        }
        .ant-transfer-list-content {
          height: 100%;
          overflow: auto;
          .ant-transfer-list-content-item {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 7px 16px;
            transition: all 0.3s ease;
          }
      }
  }
  .ant-transfer-list-body-with-search {
        padding-top: 34px;
      }
    }
    .ant-transfer-list-body-search-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 28px;
      padding: 4px;
      width: 100%;
    }
</style>
