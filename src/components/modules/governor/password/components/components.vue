<template>
  <pl-content-box>
    <pl-content-box-block>
        <ul class="clearfix">
        <li @click="info" class="clearfix">
          <i class="anticon icon-message"></i>
          <span>预留信息找回</span>
        </li>
        <li @click="secret" class="clearfix">
          <i class="anticon icon-lock1"></i>
          <span>密保问题找回</span>
        </li>
        <li @click="phone" class="clearfix">
          <i class="anticon icon-mail"></i>
          <span>短信验证码找回</span>
        </li>
      </ul>
      <siderbar-left :class="className"></siderbar-left>
    </pl-content-box-block>
  </pl-content-box>
</template>
<script>
  import siderbarLeft from './siderbar-right.vue';
  export default {
    data () {
      return {
        className: 'padding-top'
      };
    },
    methods: {
      phone () {
        this.$emit('methodsName', 'phone', 1);
      },
      info () {
        this.$emit('methodsName', 'info', 1);
      },
      secret () {
        this.$emit('methodsName', 'secret', 1);
      },
      login () {
        this.$router.push({name: 'login'});
      }
    },
    components: {
      siderbarLeft
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";
  ul {
    margin: 60px 0;
    padding:60px 0 0 45px;
    width: 70%;
    float:left;
    border-right: 1px solid $border-color;
    li {
      width: 30%;
      height: 200px;
      float: left;
      cursor: pointer;
      i {
        text-align: center;
        font-size: 80px;
        display: block;
        color: $primary-color;
      }
      span {
        display: block;
        margin-top: 15px;
        font-size: 18px;
        color: $muted-color;
        text-align: center;

      }
    }
  }
  .padding-top {
    width: 30% !important;
    padding-top: 125px !important;
  }
</style>
