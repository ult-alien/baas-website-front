<template>
  <div class="container-wrapper" v-loading="loading">
    <div class="container" v-loading="loading">
      <div class="block">
        <div id="userInfo" class="left">
          <h2>个人中心</h2>
          <table width="100%" class="block-table">
            <tr align="left">
              <td class="block-font">账户名称</td>
              <td>{{userInfo.userName}}</td>
            </tr>
            <tr align="left">
              <td class="block-font">注册邮箱</td>
              <td>{{userInfo.email}}</td>
            </tr>
            <tr align="left">
              <td class="block-font">注册手机号</td>
              <td>{{userInfo.phoneNo}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue2 from 'vue';
  import cookieUtil from '../../../../core/utils/cookie-util';
  export default {
    data() {
      return {
        loading: true,
        userInfo: {
          userName: "",
          email: "",
          phoneNo: ""
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loading = false;
      })
    },
    beforeCreate: function () {
      let temp = cookieUtil.getCookieByName('userName');
      Vue2.api.core.getUserInfo(temp).then(res => {
        this.userInfo.userName = res.user.user_name;
        this.userInfo.email = res.user.e_mail;
        this.userInfo.phoneNo = res.user.phone_no;
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .dot-list {
    .text-blod {
      font-weight: 600;
    }
    li {
      line-height: 30px;
      color: #5E5E5E;
    }
  }

  .container-wrapper {
    background: #fff;

    .bg {
      background: #f6f6f6;
    }
    img {
      vertical-align: middle;
    }
    .block {
      overflow: hidden;
      margin: 20px 0;
      position: relative;
      p {
        line-height: 30px;
        text-align: left;
      }
      .left {
        width: 50%;
        float: left;
        text-align: center;
        &.strength {
          height: 485px;
          line-height: 485px;
          vertical-align: middle;
        }
        &.bc2 {
          height: 308px;
          line-height: 308px;
        }
      }
      .right {
        float: right;
        width: 50%;
        text-align: center;
        &.whyuse {
          height: 820px;
          line-height: 820px;
        }
        &.bc1 {
          height: 465px;
          line-height: 465px;
        }
      }
      h2 {
        font-weight: 500;
        font-size: 1.8em;
        line-height: 40px;
        text-align: left;
      }
      .block-table {
        font-size: 15px;
        margin-bottom: 10px;
        @media only screen and (max-device-width: 1024px) {
          font-size: 12px;
        }
        .block-font {
          font-weight: lighter;
        }
        > tr {
          &:nth-child(1) {
            background: #e3e3e3;
          }
          &:nth-child(2) {
            background: #e3e3e3;
          }
          &:nth-child(3) {
            background: #e3e3e3;
          }
        }
        td {
          padding-left: 6px;
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }

      /**
      *  mobile
      */
      @media only screen and (max-device-width: 1024px) {
        .left {
          width: 100%;
          float: none;
          height: auto !important;
          line-height: normal !important;
        }
        .right {
          float: none;
          width: 100%;
          height: auto !important;
          line-height: normal !important;
        }
      }
    }
  }
</style>


