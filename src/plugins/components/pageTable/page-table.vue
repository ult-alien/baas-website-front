<template>
  <div class="tableWrapper">
    <div v-loading="loading" ref="tableWrapper" style="min-height: 60px;">
      <pl-empty-tip v-show="!loading && total === 0 " icon-type="2" :text="emptyText"></pl-empty-tip>
      <div v-show="total > 0">
        <el-table  ref="elTable"
                   :data="tableData"
                   :width="width"
                   :height="height"
                   :max-height="maxHeight"
                   :stripe="stripe"
                   :border="border"
                   :row-key="rowKey"
                   :context="context"
                   :show-header="showHeader"
                   :row-class-name="rowClassName"
                   :row-ctyle="rowStyle"
                   :highlight-current-row="highlightCurrentRow"
                   :current-row-key="currentRowKey"
                   :empty-text="emptyText"
                   :expand-row-keys="expandRowKeys"
                   :default-expand-all="defaultExpandAll"
                   @select="_handleSelect"
                   @select-all="_handleSelectAll"
                   @selection-change="_handleSelectionChange"
                   @cell-mouse-enter="_handleCellMouseEnter"
                   @cell-mouse-leave="_handleCellMouseLeave"
                   @cell-click="_handleCellClick"
                   @row-click="_handleRowClick"
                   @row-contextmenu="_handleRowContextmenu"
                   @row-dblclick="_handleDblclick"
                   @header-click="_handleHeaderClick"
                   @filter-change="_handleFilterChange"
                   @current-change="_handleCurrentChange1"
                   @expand-change="_handleSortEvents('expand-change')"
                   @sort-change="_handleSortChange"
                   style="width: 100%">
          <el-table-column v-if="showCheckbox" align="center" type="selection" :reserve-selection="reserveSelection" :selectable="selectable" fixed="left" width="50"></el-table-column>
          <el-table-column v-if="showNumber" fixed="left" width="70" label="序号" align="center" header-align="center">
            <template slot-scope="scope">
              <span >{{scope.$index + (currentPage - 1) * currentPageSize + 1}}</span>
            </template>
          </el-table-column>
          <slot></slot>
        </el-table>
        <div class="table-page-wrapper">
          <el-pagination
            @size-change="_handleSizeChange"
            @current-change="_handleCurrentChange"
            :page-sizes="pageSizes"
            :page-size="currentPageSize"
            :current-page="currentPage"
            layout="total, prev, pager, next, sizes"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'PageTable',
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      showNumber: {
        type: Boolean,
        default: true
      },
      selectable: {
        type: Function,
        default: function () {
          return true;
        }
      },
      reserveSelection: {
        type: false,
        default: true
      },
      pageSizes: {
        type: Array,
        default () {
          return [10, 20, 30, 40, 50];
        }
      },
      pageSize: {
        type: Number,
        default: function () {
          return this.pageSizes[0];
        }
      },
      params: {
        type: Object,
        default: function () {
          return {};
        }
      },
      dataFun: Function,
      width: [String, Number],
      height: [String, Number],
      maxHeight: [String, Number],
      fit: {
        type: Boolean,
        default: true
      },
      stripe: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: false
      },
      rowKey: [String, Function],
      context: {},
      showHeader: {
        type: Boolean,
        default: true
      },
      rowClassName: [String, Function],
      rowStyle: [Object, Function],
      highlightCurrentRow: Boolean,
      currentRowKey: [String, Number],
      emptyText: {
        type: String,
        default: '暂时没相关记录！'
      },
      expandRowKeys: Array,
      defaultExpandAll: Boolean,
      defaultSortProp: String,
      defaultSortOrder: String
    },
    data () {
      return {
        total: 0,
        tableData: [],
        currentPage: 1,
        currentPageSize: this.pageSize,
        pages: 0,
        loading: false,
        isInit: false,
        paramsTemp: {}
      };
    },
    methods: {
      _setPageData (currentPage, filters) {
        this.currentPage = currentPage;
        if (this.data && this.data.length > 0) {
          this.total = this.data.length;
          this.pages = parseInt(this.total / this.currentPageSize) + (this.total % this.currentPageSize === 0 ? 0 : 1);
          let start = (this.currentPage - 1) * this.currentPageSize;
          let end = start + this.currentPage < this.pages ? this.currentPageSize : this.data.length;
          this.tableData = this.data.slice(start, end);
        } else if (this.dataFun) {
          if (!filters) {
            filters = {};
          }
          if (!filters.sortName) {
            filters.sortName = this.defaultSortProp || '';
            if (filters.sortName) {
              filters.sortType = this.defaultSortOrder === 'descending' ? 'desc' : 'asc';
            } else {
              filters.sortType = '';
            }
          }

          let params = {
            ...this.paramsTemp,
            pageSize: this.currentPageSize,
            pageNo: this.currentPage,
            ...this.params,
            ...filters
          };
          this.paramsTemp = params;
          this.loading = true;
          this.dataFun(params).then(ret => {
            setTimeout(() => {
              this.loading = false;
            }, 300);
            this.tableData = ret.data;
            this.total = ret.total;
            this.pages = parseInt(this.total / this.currentPageSize) + (this.total % this.currentPageSize === 0 ? 0 : 1);
            this.$emit('after-load', ret);

            if (!this.isInit) {
              setTimeout(() => {
                this.isInit = true;
              }, 500);
            }
          });
        }
      },
      _handleSizeChange (val) {
        this.currentPageSize = val;
        this._setPageData(1);
      },
      _handleCurrentChange (val) {
        this._setPageData(val);
      },
      _handleSortChange ({column, prop, order}) {
        if (!this.isInit) return;
        let sortName = '';
        let sortType = '';
        if (column) {
          sortName = column.sortable || prop;
          sortType = order === 'descending' ? 'desc' : 'asc';
        }
        this._setPageData(this.currentPage, {sortName, sortType});
      },
      _handleSortEvents (eventName) {
        this.$emit(eventName);
      },
      _handleSelect (selection, row) {
        this.$emit('select', selection, row);
      },
      _handleSelectAll (selection) {
        this.$emit('select-all', selection);
      },
      _handleSelectionChange (selection) {
        this.$emit('selection-change', selection);
      },
      _handleCellMouseEnter (row, column, cell, event) {
        this.$emit('cell-mouse-enter', row, column, cell, event);
      },
      _handleCellMouseLeave (row, column, cell, event) {
        this.$emit('cell-mouse-leave', row, column, cell, event);
      },
      _handleCellClick (row, column, cell, event) {
        this.$emit('cell-click', row, column, cell, event);
      },
      _handleRowClick (row, event, column) {
        this.$emit('row-click', row, event, column);
      },
      _handleRowContextmenu (row, event) {
        this.$emit('row-contextmenu', row, event);
      },
      _handleDblclick (row, event) {
        this.$emit('row-dblclick', row, event);
      },
      _handleHeaderClick (column, event) {
        this.$emit('header-click', column, event);
      },
      _handleFilterChange (filters) {
        this.$emit('filter-change', filters);
      },
      _handleCurrentChange1 (currentRow, oldCurrentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow);
      },
      _handleExpand (row, expanded) {
        this.$emit('expand', row, expanded);
      },
      reload (filters) {
        this._setPageData(1, filters);
      },
      clearSelection (selection) {
        this.$refs['elTable'].clearSelection(selection);
      },
      toggleRowSelection (row, selected) {
        this.$refs['elTable'].toggleRowSelection(row, selected);
      }
    },
    mounted () {
      this.$refs.tableWrapper.style.width = this.$refs.tableWrapper.clientWidth + 'px';
      this._setPageData(this.currentPage);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../assets/scss/mixin";
  .tableWrapper{
    .table-page-wrapper {
      @include clearfix;
      padding: 15px 0px;
      > div {
        float: right;
        padding: 0px;
      }
    }
    .el-table__fixed-right{
      right: 0px !important;
    }
  }
</style>
