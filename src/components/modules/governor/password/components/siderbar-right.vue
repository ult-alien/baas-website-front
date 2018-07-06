<template>
  <div class="siderbar_right" :class="className">
      <p>如遇到问题请联系：</p>
      <p>电话：<i class="anticon icon-phone"></i><span>4006-230057</span></p>
     
   <!--    <p><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1395110441&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1395110441:41" alt="在线咨询" title="在线咨询"/></a></p>  -->
<!--     <p><a target="_blank" href="http://b.qq.com/webc.htm?new=0&sid=4006230066&o=im.qq.com&q=7"><img border="0" src="http://wpa.qq.com/pa?p=1:4006230066:10" alt="在线咨询" title="在线咨询"/></a></p> -->
      <p>已有登录平台账户，<a @click="login">直接登录</a></p>
  </div>
</template>
<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      }
    },
    methods: {
      login () {
        this.$router.push({name: 'login'});
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";
    .siderbar_right{
     width:35%;
     float: left;
     padding: 50px 0 50px 75px;
     p {
      color: $font-color;
      span{
        color: $danger-color;
        font-weight:700;
        padding-left:5px;
        cursor:pointer;
       }
         i {
          color: $warning-color;
        }
       a{
          text-decoration:underline;
          color:$primary-color;
          cursor: pointer;
       }
       .srvCns {
        text-decoration: none;
       }
     }
  }
</style>