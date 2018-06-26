<template>
  <div class="strength-wrapper">
      <div class="wrapper" :style="{backgroundColor: backgroundColor,width: ulWidth}"></div>
      <div class="empty-wrapper">
        <div class="divItem" v-for="item in rules" :style="{width: ruleWidth}">
          <div class="rule-item"></div>
          <div class="text-center text-munted rule-rank">{{item.rank}}</div>
        </div>
      </div>
  </div>
</template>
<script type="text/javascript">
  import config from '../config';
  export default {
    name: config.prefix + 'PassStrength',
    props: {
      passValue: String,
      rules: Array
    },
    data () {
      return {
        rank: [],
        backgroundColor: String,
        ulWidth: String
      };
    },
    watch: {
      passValue () {
        this.checkPassword();
      }
    },
    computed: {
      ruleWidth () {
        return 100 / this.rules.length + '%';
      }
    },
    methods: {
      // 检测密码通过了几个正则表达式的验证
      checkPassword () {
        let tempIndex = -1;
        this.rules.forEach((item, index) => {
          const reg = new RegExp(item.reg);
          if (reg.test(this.passValue)) {
            tempIndex = index;
          } else {
            return;
          }
        });

        if (tempIndex !== -1) {
          this.ulWidth = (tempIndex + 1) * (100 / this.rules.length) + '%';
          this.backgroundColor = this.rules[tempIndex].color;
        } else {
          this.ulWidth = '0%';
          this.backgroundColor = '';
        }
        this.$emit('after-checked', tempIndex);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
 @import '../../../assets/scss/variables';
 @import '../../../assets/scss/mixin';
.strength-wrapper {
  width: 100%;
  margin: 5px 0 0px 0;
  @include  clearfix;
  position:relative;
  .wrapper {
    width: 0%;
    height: 6px;
    position: absolute;
    top: 1px;
    left: 0px;
    transition: width 2s ease;
    padding: 0 2px;
    z-index: 1;
    /*li {*/
      /*height: 8px;*/
      /*float: left;*/
      /*margin-right: 5px;*/
    /*}*/
  }
  .empty-wrapper {
    @include  clearfix;
    .divItem {
      float: left;
      position: relative;
      z-index: 2;
      .rule-item{
        height: 8px;
        color:#fff;
        position: relative;
        border: 1px solid $border-color;
        border-right: 0px;
        text-align: center;
      }
      .rule-rank{
        font-size: 12px;padding-top: 2px;height: 20px;
      }
      &:last-child .rule-item{
        border-right: 1px solid $border-color;
      }
    }
  }
}


</style>
