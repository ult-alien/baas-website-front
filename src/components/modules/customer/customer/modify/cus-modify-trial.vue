<template>
  <pl-content-box>
    <pl-page-nav class="no-border">
    </pl-page-nav>
    <el-tabs v-model="selectedTab">
      <el-tab-pane :name="item.name" :key="index" v-for="(item, index) in tabs">
        <span slot="label" class="tab-item">{{item.label}}<el-badge :value="item.count" class="badge" v-if="item.count > 0"></el-badge></span>
      </el-tab-pane>
    </el-tabs>
    <component v-bind:is="selectedTab" :state="state">
    </component>
  </pl-content-box>
</template>

<script>
  import accountAprv from './account-aprv.vue';
  import userFirstTrial from './user/user-first-trial.vue';
  import cusAprv from './cus-aprv.vue';
  import constantUtil from 'core/utils/constant-util.js';
  export default {
    data () {
      let self = this;
      return {
        selectedTab: self.$route.params.tab ? self.$route.params.tab : 'cus'
      };
    },
    components: {
      acct: accountAprv,
      cus: cusAprv,
      user: userFirstTrial
    },
    computed: {
      state () {
        if (this.selectedTab) {
          let tabs = this.tabs.filter((item, index) => {
            return item.name === this.selectedTab;
          });
          return tabs[0].state;
        }
      },
      tabs () {
        let tabs = [
          {label: '企业信息变更审批', name: 'cus', state: constantUtil.getConstantByKey('CustomerConstants.CusState')['WAIT_FIRST_TRIAL'], count: this.$store.state.msgTip['cus-trial']},
          {label: '用户审批', name: 'user', count: this.$store.state.msgTip['user-first-apr']},
          {label: '账户审批', name: 'acct', state: constantUtil.getConstantByKey('AccountConstants.AcctState')['REVIEW'], count: this.$store.state.msgTip['acct-trial']}
        ];
        let hasCountTabs = tabs.filter((item, index) => {
          return item.count > 0;
        });
        if (hasCountTabs.length > 0) {
          this.selectedTab = hasCountTabs[0].name;
        }
        return tabs;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tab-item{
    position: relative;
    .badge{
      padding-left: 5px;
    }
  }
</style>
