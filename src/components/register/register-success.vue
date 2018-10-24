<template>
      <pl-content-box>
        <pl-content-box-block>
          <div class="success-msg">
            <div class="icon"><i class="el-icon-success"></i></div>
            <div>
              <h1>
                恭喜，注册成功！
              </h1>
              <p style="font-size: 120%;">您已经成功注册成为GBaaS平台的用户，下次登录请使用已注册的手机号及密码。</p>
            </div>
          </div>
          <div class="content-info">
            <span style="color: red;">{{timeLeft}}</span>秒后自动跳转至主页面...... <br>
            如未跳转，<router-link to="/accreditation/step" class="link">请点击此处&nbsp;<i class="anticon icon-link"></i></router-link>
          </div>
        </pl-content-box-block>
      </pl-content-box>
</template>

<script>
  export default {
    data () {
      return {
        timeLeft: 5,
        timer: []
      };
    },
    methods: {
      changeTime () {
        if (this.timeLeft > 0) {
          let handler = setTimeout(() => {
            this.timeLeft = this.timeLeft - 1;
            this.changeTime();
          }, 1000);
          this.timer.push(handler);
        } else {
          // 清除定时器
          for (let i = 0; i < this.timer.length; i++) {
            window.clearTimeout(this.timer[i]);
          }
          this.$router.push({'name': 'home'});
        }
      }
    },
    created () {
      this.timer = [];
      this.changeTime();
    },
    computed: {
      menus () {
        return this.$store.state.menus;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/scss/_variables.scss";
  .success-msg{
    color: cadetblue;
    background-color: $primary-color-light;
    padding: 18px 0;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .icon{
      width: 28%;
      text-align: right;
      display: inline-block;
      height: 100px;
      line-height: 100px;
      .el-icon-success{
        color: $primary-color;
        font-size: 60px;
        line-height: inherit;
        margin-right: 4%;
      }
    }
  }
  .content-info{
    margin: 30px 0 0 28%;
    font-size: 120%;
    line-height: 2;
  }
  .link{
    color: $primary-color;
  }
</style>


