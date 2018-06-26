<template>
  <div>
    <slot v-for="(item, index) in itemData" :item="item" :index="index"></slot>
    <div class="load-more-btn" v-show="!isShowEmpty">
      <el-button type="text"   @click="loadMore" :disabled="canNotClick" :loading="isLoading" style="width: 100%;">
        <span style="font-size: 12px;">{{btnText}}<span v-show="remainTotal" class="primary-text">({{remainTotal}})</span></span>
      </el-button>
    </div>
    <div v-show="isShowEmpty">
      <slot name="empty" ></slot>
    </div>
  </div>
</template>
<script>
  import config from '../config';
  import moment from 'moment';
  moment.locale('zh-cn');
  const btnContent = ['点击加载更多', '加载中...', '没有更多了...'];
  export default {
    name: config.prefix + 'PullLoadMore',
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      },
      pageSizes: {
        type: Array,
        default () {
          return [10, 20, 30, 40, 50];
        }
      },
      pageSize: {
        type: Number,
        default () {
          return 10;
        }
      },
      params: {
        type: Object,
        default () {
          return {};
        }
      },
      dataFun: Function,
      checkedAlias: {
        type: String,
        default: 'checked'
      }
    },
    data () {
      return {
        itemData: [],
        isLoading: false,
        total: 0,
        currentPage: 1,
        currentPageSize: this.pageSize,
        pages: 0,
        canNotClick: false,
        arr: [],
        btnText: btnContent[0],
        noMore: false,
        listTotal: '',
        remainTotal: '',
        isEmpty: false
      };
    },
    computed: {
      isShowEmpty () {
        return !this.isLoading && this.isEmpty;
      }
    },
    methods: {
      _getdataFun (currentPage, filters) {
        this.currentPage = currentPage;
        if (this.data && this.data.length > 0) {
          this.total = this.data.length;
          this.pages = parseInt(this.total / this.currentPageSize) + (this.total % this.currentPageSize === 0 ? 0 : 1);
          let start = (this.currentPage - 1) * this.currentPageSize;
          let end = start + this.currentPage < this.pages ? this.currentPageSize : this.data.length;
          this.itemData = this.data.slice(start, end);
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
            pageSize: this.currentPageSize,
            pageNo: this.currentPage,
            ...this.params,
            ...filters
          };
          this.isLoading = true;
          this.btnText = btnContent[1];
          this.canNotClick = false;
          this.$emit('before-load');
          this.dataFun(params).then(ret => {
            setTimeout(() => {
              if (this.currentPage === 1) {
                this.itemData = ret.data;
              } else {
                let retData = ret.data.map(item => {
                  item[this.checkedAlias] = false;
                  return item;
                });
                this.itemData = [...this.itemData, ...retData];
              }
              this.isLoading = false;
              this.btnText = btnContent[0];
              this.total = ret.total;
              this.listTotal = this.total;
              let remainTotal = this.total - this.itemData.length;
              this.remainTotal = remainTotal;
              this.pages = parseInt(this.total / this.currentPageSize) + (this.total % this.currentPageSize === 0 ? 0 : 1);
              if (this.currentPage >= this.pages) {
                this.canNotClick = true;
                this.btnText = btnContent[2];
                this.noMore = true;
              }
              let listObj = {
                total: this.total,
                remainTotal: remainTotal,
                currentPage: this.currentPage,
                pageCount: this.pages,
                data: this.itemData
              };
              this.$emit('after-load', ret, listObj);
              this.isEmpty = this.itemData.length === 0;
            }, 500);
          });
        }
      },
      loadMore () {
        if (!this.noMore) {
          this._getdataFun(++this.currentPage);
        }
      },
      reload (filters) {
        this.itemData = [];
        this.noMore = false;
        this._getdataFun(1, filters);
      }
    },
    created () {
      this._getdataFun(this.currentPage);
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  .load-more-btn{
    width:100%;
    text-align: center;
    margin-bottom: -6px;
  /*  border-top: 1px solid $border-color;*/
  }
</style>

