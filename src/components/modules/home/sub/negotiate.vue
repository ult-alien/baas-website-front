<template>
  <div>
    <div class="partners-bg">
      <img src="static/images/negotiate/solution-partners.jpg" style="max-width: 100%;" alt="合作洽谈">
    </div>
    <div class="partners-container" v-loading="loading">
      <div class="partners-content">
        <block class="container">
          <common-title slot="title" :no-underline="true">我们推荐的合作模式</common-title>
          <div class="partner-content-card">
            <div class="box-container">
              <el-card class="box-card has-mask">
                <div class="text-center">
                  <img src="static/images/negotiate/zhengfu.png" align="middle" width="112" height="112">
                </div>
                <p class="no-indent text-center box-card-title">核心企业</p>
                <p class="no-indent" style="font-size: 16px;">信用资质优良的上市公司</p>
                <p class="no-indent">
                  我司提供一揽子金融服务，赋能和服务我们的天职，数据、版权、收益归核心企业所有，我司按照贡献价值获取回报。
                </p>
                <div class="dot-list">
                  <p class="no-indent">
                    全程协助核心企业成立保理公司
                   </p>
                  <p class="no-indent">
                    全程定制化提供全线上创新支付结算及保理平台
                  </p>
                  <div class="mask">
                    <div  class="mask-child"></div>
                  </div>
                  <p class="no-indent">
                    在线签合同、在线验证发票、直接对接中登网、建立风控体系
                  </p>
                  <p class="no-indent">
                    全程提供成员企业、供应商宣导营销运营工作
                  </p>
                  <p class="no-indent">
                    全力协助保理公司对接银行、保险、产业基金、ABS等低成本第三方资金
                  </p>
                  <p class="no-indent">
                    衍生为核心企业搭建小贷平台并提供运营
                  </p>
                </div>
              </el-card>
              <el-card class="box-card" >
                <div class="text-center">
                  <img src="static/images/negotiate/qiye.png" align="middle" width="112" height="112">
                </div>
                <p class="no-indent text-center box-card-title">渠道伙伴</p>
                <p class="no-indent" style="font-size: 16px;">融资租赁公司、保理公司、供应链管理公司</p>
                <p class="no-indent">
                  为各渠道合作伙伴赋合作由渠道伙伴进行客户拓展，我方提供全流程平台搭建和运营服务，为伙伴们降低操作成本并提供资金支持。
                </p>
              </el-card>
              <el-card class="box-card" :class="{'has-mask': hashMask}"  ref="boxCard">
                <div class="text-center">
                  <img src="static/images/negotiate/zijin.png" align="middle" width="112" height="112">
                </div>
                <p class="no-indent text-center box-card-title">银行等资金端</p>
                <div class="dot-list">
                  <p class="no-indent">
                    将整个方案封装成供应链金融产品给予银行等资金端
                  </p>
                  <p class="no-indent">
                    银行等资金端负责客户的准入机制与授信等事宜，我司负责营销客户和运营，我司是渠道，建立银企直连，为银行等资金端拓展供应链金融业务
                  </p>
                  <div class="mask" v-if="hashMask">
                    <div  class="mask-child"></div>
                  </div>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text-center">
                  <img src="static/images/negotiate/zijin.png" align="middle" width="112" height="112">
                </div>
                <p class="no-indent text-center box-card-title">有资源或者资金的个人/机构</p>
                <p class="no-indent">双方合资成立保理公司或者科技公司，在共赢链的平台上二次创业</p>
              </el-card>
            </div>
          </div>
        </block>

        <block class="container">
          <common-title slot="title" :no-underline="true">合作内容与流程</common-title>
          <div class="partners-content-part">
            <div class="flow">
              <div class="box">
                <img src="static/images/negotiate/qianding.png" alt="签订协议">
                <p class="no-indent" style="position: absolute;left: 50%;transform: translateX(-50%);width: 8em;">签订战略合作协议</p>
              </div>
              <div class="box">
                <img src="static/images/negotiate/yunying.png" alt="实施与试运营">
                <p class="no-indent">实施与试运营</p>
              </div>
              <div class="box">
                <img src="static/images/negotiate/shangxian.png" alt="正式上线">
                <p class="no-indent">正式上线</p>
              </div>
              <div class="box">
                <img src="static/images/negotiate/tuiguang.png" alt="持续推广">
                <p class="no-indent">持续推广</p>
              </div>
            </div>

            <div class="solutions">
              <div class="solution-card">
                <div class="bg"></div>
                <div class="content content1">
                  <h3 class="title">定制方案</h3>
                  <p class="desc">能结合每家需求，定制差异化的链单业务解决方案；与企业ERP系统个性化对接</p>
                </div>
              </div>
              <div class="solution-card">
                <div class="bg"></div>
                <div class="content content2">
                  <h3 class="title">系统搭建与迭代</h3>
                  <p class="desc">为核心企业搭建系统，根据业务运营情况，每周快速迭代产品优化</p>
                </div>

              </div>
              <div class="solution-card">
                <div class="bg"></div>
                <div class="content content3">
                  <h3 class="title">业务运营</h3>
                  <p class="desc">能提供线上线下全渠道的运营服务体系，进行市场培育，低成本，高效率支持碎片化金融需求</p>
                </div>

              </div>
              <div class="solution-card">
                <div class="bg"></div>
                <div class="content content4">
                  <h3 class="title">体系外优势</h3>
                  <p class="desc">发挥核心企业体系外的灵活优势，可突破体制内流程过长、牵涉部门较多、IT支持不足等弊端</p>
                </div>
              </div>
            </div>
          </div>
        </block>

        <div class="bottom-bg">
          <block class="container">
            <common-title slot="title" :no-underline="true">立即合作洽谈</common-title>
            <div class="join">
              <p class="no-indent">我们希望得到您的信息，无论您是否是一个潜在客户，是否有兴趣加入这个团队，即便您只是一个关注者，都请给我们一个联系方式，我们将努力在最短时间内给您回复。</p>
              <p class="no-indent"><span class="text-bold">我们的地址：</span>深圳市南山区深圳软件园产业基地5C栋2楼--3A</p>
              <p class="no-indent"><span class="text-bold">我们的电话：</span>0755-86720669</p>
              <p class="no-indent"><span class="text-bold">我们的邮箱：</span>gylsz@gylsz.cn</p>
              <!--
              <p class="info no-indent"><span class="text">如对本公司提供的业务感兴趣请留下您的联系方式及内容</span></p>
              
                <el-form :model="formInline" label-width="82px">
                  <el-form-item label="您的姓名："  >
                    <el-input v-model="formInline.user"></el-input>
                  </el-form-item>
                  <el-form-item label="您的电话：">
                    <el-input v-model="formInline.user"></el-input>
                  </el-form-item>
                  <el-form-item label="留言内容：">
                    <el-input type="textarea" v-model="formInline.user"></el-input>
                  </el-form-item>

                  <el-button type="primary" size="medium" round style="padding: 10px 74px;"><span>提交</span>&nbsp;<i class="portal portal-enterinto" ></i></el-button>

                </el-form>
              </div>
              -->
            </div>
          </block>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import block from './ui/block.vue';
  import commonTitle from './ui/common-title.vue';
  export default {
    data () {
      return {
        activeName: 'first',
        formInline: {

        },
        loading: true,
        hashMask: false
      };
    },
    methods: {
      changePane (activeName) {
        this.activeName = activeName;
      }
    },
    components: {
      block,
      commonTitle
    },
    mounted: function () {
      this.hashMask = this.$refs.boxCard.$el.scrollHeight-20>380;
      this.$nextTick(function () {
        this.loading = false;
      })
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~assets/scss/_variables.scss";
  .partners-bg {
    width: 100%;
    img{
      max-width: 100%;
    }
    margin-top: 60px;
  }
  .partners-container {
    .bottom-bg{
      background: url('../../../../../static/images/negotiate/bg-block.png') no-repeat;
      background-size: 100%;
      background-position: bottom center;
      padding: 0 0 40px;
    }

    .partners-content {
      background: #fff;
      min-height: 549px;
      h3{
        margin: 30px 0;
      }
      .partner-content-card {
        position: relative;
        width: 100%;
        height: 380px;
        .box-container {
          position: absolute;
          width: 98%;
          margin: 0 1%;
          z-index:30;
          .box-card {
            width: 23.5%;
            overflow: hidden;
            height: 380px;
            margin: 0 1%;
            &:last-child {
              margin: 0 0 0 1%;
            }
            &:first-child {
              margin: 0 1% 0 0;
            }
            border-radius: 4px;
            float: left;
            p {
              line-height: 24px;
              color:#666;
            }
            &.scale{
              transition: all .2s;
              min-height: 390px;
              position: relative;
              .title{
                margin: -20px -20px 20px -20px;
                background-color: #293948;
                color: #fff;
                padding: 20px;
                border-radius: 4px 4px 0 0 ;
              }
              &:hover{
                transform: scale(1.06);
                .title{
                  background-color: $primary-color;
                }
              }
            }
            .box-card-title {
              font-size: 18px;
              font-weight: 600;
            }
            .mask {
              position: relative;
              z-index: 9999;
              top:-115px;
              .mask-child {
                height: 100px;
                background-image: -moz-linear-gradient(bottom,rgba(255,255,255,.1),rgba(255,255,255,0));
                background-image: -webkit-gradient(linear,0 top,0 bottom,from(rgba(255,255,255,0)),to(#fff));
              }
            }
            &.has-mask:hover {
              height: auto;
              background: #fff;
              transition: all 2s;
              .mask {
                display: none;
              }
            }
            /**
           *  mobile
           */
            @media only screen
            and (max-device-width: 1024px) {
              width: 98%;
              margin: 1.5% 1%;
              &:nth-child(1) {
                margin-left: 1%;
              }
              &:nth-child(3) {
                margin-right: 1%;
              }
            }
            /**
             *  mobile end
             */
          }
          /*mobile*/
          @media only screen and (max-device-width: 1024px) {
            position: relative;
          }
        }
      }
      .partners-content-part {
        width: 100%;
        overflow: hidden;
        .flow{
          width: 98%;
          margin: 0 1% 0 1%;
          display: flex;
          .box{
            flex-grow: 1;
            text-align: center;
            img{
              max-width: 120px;
            }
            position: relative;
            &:after{
              content: '';
              height: 0px;
              width: 0px;
              border-top: 14px solid transparent;
              border-left: 14px solid #a7a7a7;
              border-bottom: 14px solid transparent;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: calc(100% - 7px);
            }
            &:before{
              content: '';
              height: 0px;
              width: 0px;
              border-top: 14px solid transparent;
              border-left: 14px solid #fff;
              border-bottom: 14px solid transparent;
              z-index: 99;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: calc(100% - 9px);
            }
            &:last-child{
              &:after{
                border: none;
              }
              &:before{
                border: none;
              }
            }
            p{
              font-size: 18px;
            }

            /**
             *  mobile
             */
            @media only screen
            and (max-device-width: 1024px) {
              img{
                max-width: 60px;
              }
              &:after{
                border-top: 7px solid transparent;
                border-left: 7px solid #606060;
                border-bottom: 7px solid transparent;
              }
              &:before{
                border-top: 7px solid transparent;
                border-left: 7px solid #fff;
                border-bottom: 7px solid transparent;
              }
              p{
                font-size: 12px;
              }
            }
            /**
             *  mobile end
             */
          }
        }
        .solutions{
          margin-top: 30px;
          overflow: hidden;
          background: url('../../../../../static/images/negotiate/shangwu1.jpg') no-repeat;
          background-size: 100% 100%;
          width: 98%;
          margin: 20px 1% 0 1%;
          height: 400px;
          .solution-card{
            height: 100%;
            position: relative;
            .bg{
              background: #000;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
            float: left;
            width: 25%;
            text-align: center;
            color: #fff;
            /**
            *  mobile
            */
            @media only screen
            and (max-device-width: 1024px) {
              width: 100%;
            }
            .content{
              transition: margin-top .4s;
              position: relative;
              z-index: 9;
              margin-top: 60px;
              padding-top: 146px;
              &.content1 {
                background: url('../../../../../static/images/negotiate/1.png') no-repeat;
                background-position: top center;
              }
              &.content2 {
                background: url('../../../../../static/images/negotiate/2.png') no-repeat;
                background-position: top center;
              }
              &.content3 {
                background: url('../../../../../static/images/negotiate/3.png') no-repeat;
                background-position: top center;
              }
              &.content4 {
                background: url('../../../../../static/images/negotiate/4.png') no-repeat;
                background-position: top center;
              }
              .title{
                font-weight: bold;
                position: relative;
                margin: 20px 0;
                margin-bottom: 20px;
                &:before{
                  content: '';
                  width: 20px;
                  height: 4px;
                  background: #fff;
                  position: absolute;
                  top: -20px;
                  left: calc(50% - 10px);
                  transition: all .4s;
                  opacity: 1;
                }
                transition: all .4s;
              }
              .desc{
                width: 90%;
                margin-left: 5%;
                display: inline-block;
                opacity: 0;
                transition: all .4s;
                text-align: left;
              }
              img{
                max-width: 120px;
              }
            }
            &:nth-child(odd){
              .bg{
                opacity: .4;
              }
            }
            &:nth-child(even){
              .bg{
                opacity: .7;
              }
            }
            &:hover{
              color: #353535;
              .bg{
                background: #dadbdc;
                opacity: .7;
              }
              .content{
                &.content1 {
                  background-image: url('../../../../../static/images/negotiate/1-hover.png');
                }
                &.content2 {
                  background-image: url('../../../../../static/images/negotiate/2-hover.png');
                }
                &.content3 {
                  background-image: url('../../../../../static/images/negotiate/3-hover.png');
                }
                &.content4 {
                  background-image: url('../../../../../static/images/negotiate/4-hover.png');
                }
                margin-top: 40px;
                .desc{
                  opacity: 1;
                }
                .title{
                  &:before{
                    opacity: 0;
                  }
                  margin-top: 0px;
                  padding-bottom: 10px;
                }
              }
            }
          }

          /**
          *  mobile
          */
          @media only screen
          and (max-device-width: 1024px) {
            display: block;
            height: auto;
            background: url('../../../../../static/images/negotiate/shangwu2.jpg') no-repeat;
            .solution-card{
              float: left;
              .content{
                img{
                  max-width: 50%;
                }
              }
            }
          }
        }
      }

      .join{
        margin: 0 1%;
        width: 98%;
        font-size: 14px;
        p{
          .text-bold{
            font-weight: bold;
          }
          &.info{
            text-align: center;
            position: relative;
            .text{
              font-size: 1.4em;
              display: inline-block;
              position: relative;
              z-index: 99;
              background: #fff;
              padding: 0 8px;
            }
            &:before{
              position: absolute;
              width: 100%;
              height: 2px;
              content: '';
              background-color: #06b7e9;
              top: 50%;
              left: 0%;
            }
          }
        }
        form{
          width: 482px;
          margin: 20px auto;
          text-align: center;
          input{
            width: 400px;
          }
          button{
            margin-top: 22px;
            span{
              font-size: 17px;
              vertical-align: middle;
            }
            i{
              vertical-align: middle;
            }
          }
        }

        /**
        *  mobile
        */
        @media only screen
        and (max-device-width: 1024px) {
          margin: 0;
          p.info{
            .text{
              font-size: 1.2em;
            }
          }
          form{
            width: 100%;
            margin: 0;
            input{
              width: 150px;
            }
            button{
              padding: 4px 8px;
              span{
                font-size: 14px;
              }
              i{
                font-size: 18px;
              }
            }
          }
        }
        /**
        *  mobile end
        */
      }
    }
  }
</style>
