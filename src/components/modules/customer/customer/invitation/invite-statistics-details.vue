<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <pl-content-box-block v-loading="loading">
      <pl-content-box-card-group>
        <pl-content-box-card class="bg-color-light card-padding" :key="customers" v-for="(item, index) in customers">
          <el-form>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业名称：" prop="item.cusName">
                  <pl-content-item-text>
                    {{item.cusName}}
                  </pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label" prop="item.date">
                  <pl-content-item-text>
                    {{item.date}}
                  </pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </pl-content-box-card>
      </pl-content-box-card-group>
    </pl-content-box-block>
   <!-- <pl-content-box-block>-->
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="default" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
   <!-- </pl-content-box-block>-->
  </pl-content-box>
</template>
<script>
export default {
  data () {
    return {
      customers: [],
      label: '',
      loading: true
    };
  },
  methods: {
    callback () {
      this.$router.push({name: this.$store.state.previousRouter.name});
    },
    queryData (userId, statisticsType) {
      this.$api.cust.inviteStatistics.getInviteStatisticsDetail({userId: userId, statisticsType: statisticsType}).then(ret => {
        this.customers = ret;
        window.setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    }
  },
  created () {
    let params = this.$route.params;
    if (params.userId) {
      if (params.statisticsType === 'register') {
        this.label = '注册日期：';
      } else if (params.statisticsType === 'accreditation') {
        this.label = '认证日期：';
      } else if (params.statisticsType === 'dct') {
        this.label = '首笔融资日期：';
      }
      this.queryData(params.userId, params.statisticsType);
    } else {
      this.callback();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 20px;
}
.card-padding{
  padding: 5px;
}
.card-content {
  max-width: 800px;
  margin: 0px auto;
  padding-right: 40px;
}
</style>



