<template>
  <pl-content-box>
    <pl-page-nav class="no-border">
    </pl-page-nav>
    <el-tabs v-model="pageName">
      <el-tab-pane label="成员企业" name="member"></el-tab-pane>
      <el-tab-pane label="供应商" name="supplier"></el-tab-pane>
    </el-tabs>
    <component v-bind:is="pageName">
    </component>
  </pl-content-box>
</template>

<script>
import member from './member.vue';
import supplier from './supplier.vue';
import constantUtil from '../../../../core/utils/constant-util';
const cusType = constantUtil.getConstantByKey('CustomerConstants.CusType');
export default {
  data () {
    return {
      pageName: 'member'
    };
  },
  components: {
    member: member,
    supplier: supplier
  },
  methods: {

  },
  created () {
    let params = this.$route.params;
    if (params.cusType && params.cusType === cusType['SUPPLIER']) {
      this.pageName = 'supplier';
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
