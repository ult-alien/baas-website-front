<template>
  <el-dialog title="切换企业" :visible.sync="dialogVisible" width="400px">
    <pl-content-box-card-group>
      <pl-content-box-card v-for="(item,index) in ents" class="ent-item" @click.native="select(item)" :key="index">
        {{item.organName}}
        <span class="text-primary pull-right" v-if="item.organId === curEnt.organId" style="font-size: 20px;"><i
        class="el-icon-circle-check"></i></span>
      </pl-content-box-card>
    </pl-content-box-card-group>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {MsgType} from '../../../core/constants';
  export default {
    data () {
      return {
        loading: false,
        dialogVisible: false,
        curEnt: {}
      };
    },
    computed: {
      ent () {
        return this.$store.state.contextData.user.ent;
      },
      ents () {
        return [];
      }
    },
    methods: {
      show () {
        this.curEnt = this.ent;
        this.dialogVisible = true;
      },
      close () {
        this.dialogVisible = false;
      },
      select (item) {
        this.curEnt = item;
      },
      sure () {
        if (this.curEnt.organId === this.ent.organId) {
          this.close();
          return;
        }

        this.loading = true;
        this.$api.core.changeEnt(this.curEnt.organId).then(ret => {
          this.loading = false;
          if (ret.type === MsgType.SUCCESS) {
            window.location.reload();
            this.close();
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/index";

  .ent-item {
    cursor: pointer;
    &:hover {
      background: $dark-white;
    }
  }
</style>
