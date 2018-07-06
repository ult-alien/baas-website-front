<template>
  <div>
    <br><br>
    <pl-empty-tip type="success" text="修改成功！"></pl-empty-tip>
    <p class="text-center"><span class="text-info"> {{time}} </span>秒之后自动跳转到登录页面,<a @click="toLogin" class="text-info">直接登录</a>...</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        time: 5,
        timer: null
      };
    },
    created () {
      this.setTimer();
    },
    methods: {
      toLogin () {
        clearInterval(this.timer);
        this.$router.push({name: 'login'});
      },
      setTimer () {
        this.time = 5;
        this.timer = setInterval(() => {
          this.time--;
          if (this.time === 0) {
            this.toLogin();
          }
        }, 1000);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  a:hover{
    text-decoration:underline;
    cursor: pointer;
  }
</style>


