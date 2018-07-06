<template>
  <div>
    <div class="row-box">
      <div>
        <el-input placeholder="请输入需要查询的关键字" v-model="searchStr" @keyup.native.enter="search" style="width: 480px;"></el-input>
        <el-button type="primary" @click="search()">搜索</el-button>
      </div>
    </div>
    <pl-layout class="layout-contianer abrazine" style="margin-top: 0;" v-loading="pageLoading">
      <srvhall-category-menu @querySrvhallItem="query" @loaded="loaded" slot="left" ref="category" :selectedCat="selectedCat"></srvhall-category-menu>
      <div slot="right" class="srvhall-container" v-loading="contentLoading">
        <div v-show="!showDetail && srvHallCategory.length > 0">
          <div class="srvhall-nav">
            我们为您找到相关结果<span class="text-primary">{{srvHallCategory.length}}</span>个
          </div>
          <ul class="srvhall-items">
            <li v-for="(item, index) in srvHallCategory" @click="select(item)"><span class="category" :class="[item.catClass]">{{item.catName}}</span>&emsp;{{item.itemTitle}}</li>
          </ul>
        </div>
        <pl-empty-tip class="tips" v-show="!showDetail && srvHallCategory.length === 0" icon-type="2" text="暂无数据，返回"><router-link class="link" :to="{name: 'bsp.srvhall.srvhall-home'}">服务大厅</router-link>{{navText}}</pl-empty-tip>
        <div class="srvhall-nav" v-show="showDetail">
          <router-link class="link" :to="{name: 'bsp.srvhall.srvhall-home'}">服务大厅</router-link>&ensp;>&ensp;{{selectedItem.fullCatName || selectedItem.itemTitle}}
        </div>
        <!-- 配置页面 -->
        <router-view v-if="showDetail && selectedItem.itemRes"></router-view>
        <!-- 配置内容 -->
        <srvhall-detail :data="selectedItem" v-if="showDetail && !selectedItem.itemRes"></srvhall-detail>
      </div>
    </pl-layout>
  </div>
</template>

<script>
  import srvhallCategoryMenu from './sub/srvhall-category-menu.vue';
  import srvhallDetail from './sub/srvhall-detail.vue';
  export default {
    data () {
      return {
        modules: '',
        srvHallCategory: [],
        pageLoading: false,
        navText: '',
        selectedItem: {},
        searchStr: '',
        contentLoading: false,
        selectedCat: {}
      };
    },
    methods: {
      select (item) {
        this.selectedItem = {...this.selectedItem, ...item};
        if (this.selectedItem.itemRes && this.selectedItem.itemRes !== '') {
          this.$router.push({name: this.selectedItem.itemRes, params: this.selectedItem});
        }
        window.scrollTo(0, 0);
      },
      query (params) {
        this.contentLoading = true;
        this.$api.bsp.srvhall.getSrvhallItemByCategory(params).then(ret => {
          console.info(1);
          this.selectedItem = {};
          this.srvHallCategory = ret.data;
          this.selectedCat = params;
          if (params.openItem) {
            this.select(params.openItem);
          } else if (this.srvHallCategory.length === 1) {
            let selectedItem = this.srvHallCategory[0];
            this.select(selectedItem); // 如果只有一个直接展开
          }
          window.setTimeout(() => {
            this.contentLoading = false;
          }, 200);
        });
      },
      search () {
        this.query({'searchStr': this.searchStr});
      },
      loaded () {
        this.pageLoading = false;
      }
    },
    created () {
      // 查询服务大厅分类
      let params = this.$route.params;
      this.query(params);
      if (params.searchStr && params.searchStr !== '') {
        this.searchStr = params.searchStr;
      }
    },
    components: {
      srvhallCategoryMenu,
      srvhallDetail
    },
    computed: {
      showDetail () {
        for (let key in this.selectedItem) {
          return true;
        }
        return false;
      },
      itemTotal () {
        this.srvHallCategory.length;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../assets/scss/variables";
.row-box{
  margin: 10px 0 40px 0;
  > div{
    text-align: center;
  }
}
.srvhall-container{
  margin: 14px 36px;
  height: 100%;
  position: relative;
  .tips{
    margin-top: 100px;
  }
}
.srvhall-nav{
  color: #888;
  margin-bottom: 10px;
}
.srvhall-items{
  li{
    padding: 10px 0;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    &:hover{
      color: $primary-color !important;
    }
  }
}
.category{
  display: inline-block;
  width: 58px;
  padding: 2px 0;
  font-size: 12px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  &.ServiceAgreement{
    background-color: cadetblue;
  }
  &.CommonProblem{
    background-color: coral;
  }
  &.BusinessGuidelines{
    background-color: burlywood;
  }
}
</style>
