<template>
  <div>
    <div class="product-bg">
      <img src="static/images/product/product-bg.jpg" alt="背景图" style="max-width: 100%;">
      <div class="product-bg-content">
        <el-button type="primary" @click="toChainbill" size="medium" round><span>立即体验&nbsp;<i class="portal portal-enterinto"></i></span></el-button>
      </div>
    </div>
    <!--
    <div class="product-tabs-flex">
      <div class="product-tabs-pane" :class="{'is-active': activeName==='first'}" @click="changePane('first')">产品介绍</div>
      <div class="product-tabs-pane" :class="{'is-active': activeName==='second'}" @click="changePane('second')">产品价值</div>
    </div>-->
    <div class=" product-container" v-loading="loading">
      <div class="product-tabs">
        <div v-if="activeName==='first'" class="product-tabs-content">
          <common-title  border-color="#00acd7">产品概述</common-title>
          <!--<img src="static/images/product/flow.jpg" class="flowImg" @click="showBigImg = true" alt="产品概述配图">-->
          <img src="static/images/product/solution_trade_financing.png" class="flowImg" @click="showBigImg = true" alt="产品概述配图">
          <el-dialog
            title="产品概述"
            :visible.sync="showBigImg"
            width="94%"
            center>
            <img src="static/images/product/solution_trade_financing.png" style="max-width: 100%;" alt="产品概述配图">
          </el-dialog>

          <div  class="tabs-content-second-right">
            <div class="twentyeight-font-weight">为核心企业量身定制供应链金融综合解决方案，协同交易信息、物流信息，接入多个资金渠道，依托区块链技术实现信用价值的拆分和流转。</div>
          </div>

          <common-title  border-color="#00acd7">产品特性</common-title>
          <div class="tabs-content-desc container">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="24" :md="{'span': 6}" style="padding: 10px 0;" >
                <div class="tabs-content-col">
                  <div class="content-col-img">
                    <img src="static/images/product/product-desc1.png" align="middle">
                  </div>
                  <div class="content-col-title">
                    <span>支付</span>
                  </div>
                  <div class="content-col-content">
                    <p class="no-indent">替代传统银票和商票，对供应商支付货款</p>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="{'span': 6, 'offset': 3}" style="padding: 10px 0;" >
                <div class="tabs-content-col">
                  <div class="content-col-img">
                    <img src="static/images/product/product-desc2.png" align="middle">
                  </div>
                  <div class="content-col-title">
                    <span>拆分</span>
                  </div>
                  <div class="content-col-content">
                    <p class="no-indent">可在额度和期限内，任意金额拆分，大拆小</p>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="{'span': 6, 'offset': 3}" style="padding: 10px 0;" >
                <div class="tabs-content-col">
                  <div class="content-col-img">
                    <img src="static/images/product/product-desc3.png" align="middle">
                  </div>
                  <div class="content-col-title">
                    <span>流转</span>
                  </div>
                  <div class="content-col-content">
                    <p class="no-indent">可直接背书转让或者任意拆分后向上级具备真实贸易背景的供应商进行流转</p>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :xs="24" :sm="24" :md="{'span': 6, 'offset': 4}" style="padding: 10px 0;">
                <div class="tabs-content-col col-relative">
                  <div class="content-col-img">
                    <img src="static/images/product/product-desc4.png" align="middle">
                  </div>
                  <div class="content-col-title">
                    <span>融资</span>
                  </div>
                  <div class="content-col-content">
                    <p class="no-indent">链单额度和期限内，纯线上，无需开户，可任意金额任意期限融资，随借随还</p>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="{'span': 6, 'offset': 4}" style="padding: 10px 0;">
                <div class="tabs-content-col col-relative">
                  <div class="content-col-img">
                    <img src="static/images/product/product-desc5.png" align="middle">
                  </div>
                  <div class="content-col-title">
                    <span>回购</span>
                  </div>
                  <div class="content-col-content">
                    <p class="no-indent">链单融资后，扣除相应的手续费和利息后可进行赎回，以节省利息</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-content-ad">
           <span class="tabs-content-ad-span">
             <div>7x24</div>
             <div class="twenty-font">无间断</div>
             <div>无间断的运维管理，容灾能力</div>
            </span>
            <span  class="tabs-content-ad-span">
              <div>1500<span class="twenty-font">/S</span></div>
              <div class="twenty-font">交易量</div>
              <div>分布式架构，支持高并发交易量</div>
            </span>
            <span  class="tabs-content-ad-span">
              <div>0<span class="twenty-font">&nbsp;元</span></div>
              <div class="twenty-font">成本</div>
              <div>零成本打造供应链金融生态圈</div>
          </span>
          </div>

          <block style="margin-top: 300px;" class="tabs-content-comp container">
            <common-title slot="title">多方价值</common-title>
            <news-card class="partners-content-part">
              <img src="static/images/product/cbg1.png" style="max-width: 100%;" slot="pic">
              <div class="dot-list">
                <p class="no-indent">
                  获得基于核心企业良好兑付信用的应收账款优质资产，风险低，收益大；
                </p>
                <p class="no-indent">
                  资金脱虚向实，真正的符合国家政策，造福社会；
                </p>
                <p class="no-indent">
                  可追溯，可跟踪资金使用流转情况；
                </p>
                <p class="no-indent">
                  多种参与方式，方便灵活；
                </p>
                <p class="no-indent">
                  改变传统票据贴现和保理业务流程，降低操作成本。
                </p>
              </div>
            </news-card>
            <news-card class="partners-content-part">
              <img src="static/images/product/cbg2.png" style="max-width: 100%;" slot="pic">
              <div class="dot-list">
                <p class="no-indent">
                  即刻享有共赢链提供的 “产融结合”完整解决方案；
                </p>
                <p class="no-indent">
                  替换开立商业汇票模式以及自身直接融资支付货款模式，减少刚性负债；
                </p>
                <p class="no-indent">
                  可以延长账期，优化报表，同时维护与供应商之间的关系   通过资金流切入供应链管理，加强加深对供应商的管理，减少生产经营中的不确定性；
                </p>
                <p class="no-indent">
                  实现企业互联网转型以及市值提升
                </p>
              </div>
            </news-card>
            <news-card class="partners-content-part">
              <img src="static/images/product/cbg3.png" style="max-width: 100%;" slot="pic">
              <div class="dot-list">
                <p class="no-indent">
                  各级供应商可通过向保理公司申请链单贴现，获取融资，用于经营周转；
                </p>
                <p class="no-indent">
                  在体系内以“链单”流转，转让债权，传递信用，缓解自身付款压力；
                </p>
                <p class="no-indent">
                  全线上操作，降低操作成本；
                </p>
                <p class="no-indent">
                  任意金额，任意期限融资，可回购等金融创新方面真正意义上解决供应商融资难融资贵难题；
                </p>
                <p class="no-indent">
                  累积数据，积累信用，加深与核心企业往来。
                </p>
              </div>
            </news-card>
          </block>

          <common-title  border-color="#00acd7">适用行业</common-title>
          <div class="second-apply-flex container">
            <!--<el-row>
              <el-col :span="6"  style="margin-bottom: 25px;">
                <div><img src="static/images/product/u674.png" align="middle" width="58" height="65"></div>
                <h4>汽车</h4>
              </el-col>
              <el-col :span="6"  style="margin-bottom: 25px;">
                <div><img src="static/images/product/u676.png" align="middle" width="58" height="65"></div>
                <h4>医疗</h4>
              </el-col>
              <el-col :span="6"  style="margin-bottom: 25px;">
                <div><img src="static/images/product/u678.png" align="middle" width="58" height="65"></div>
                <h4>快消品</h4>
              </el-col>
              <el-col :span="6"  style="margin-bottom: 25px;">
                <div><img src="static/images/product/u680.png" align="middle" width="58" height="65"></div>
                <h4>制造业</h4>
              </el-col>
              <el-col :span="6"  style="margin-bottom: 25px;">
                <div><img src="static/images/product/u682.png" align="middle" width="58" height="65"></div>
                <h4>餐饮</h4>
              </el-col>
              <el-col :span="6" style="margin-bottom: 25px;">
                <div><img src="static/images/product/u680.png" align="middle" width="58" height="65"></div>
                <h4>化工</h4>
              </el-col>
            </el-row>-->
            <div class="second-apply-flex-item">
              <div><img src="static/images/product/manufacture.png" align="middle" width="120" height="120"></div>
              <h4>制造业</h4>
            </div>
            <!--<div class="second-apply-flex-item">
              <div><img src="static/images/product/car.png" align="middle" width="120" height="120"></div>
              <h4>汽车</h4>
            </div>-->
            <div class="second-apply-flex-item">
              <div><img src="static/images/product/medical.png" align="middle" width="120" height="120"></div>
              <h4>医疗保健</h4>
            </div>
            <div class="second-apply-flex-item ">
              <div><img src="static/images/product/architecture.png" align="middle" width="120" height="120"></div>
              <h4>建筑</h4>
            </div>
            <div class="second-apply-flex-item">
              <div><img src="static/images/product/consumption.png" align="middle" width="120" height="120"></div>
              <h4>批发零售</h4>
            </div>
            <div class="second-apply-flex-item">
              <div><img src="static/images/product/chemical.png" align="middle" width="120" height="120"></div>
              <h4>化工</h4>
            </div>
            <div class="second-apply-flex-item">
              <div><img src="static/images/product/restaurant.png" align="middle" width="120" height="120"></div>
              <h4>餐饮</h4>
            </div>
            <div class="second-apply-flex-item ">
              <div><img src="static/images/product/farming.png" align="middle" width="120" height="120"></div>
              <h4>农业</h4>
            </div>
            <div class="second-apply-flex-item">
              <div><img src="static/images/product/clothing.png" align="middle" width="120" height="120"></div>
              <h4>服装</h4>
            </div>
            <div class="second-apply-flex-item ">
              <div><img src="static/images/product/energy.png" align="middle" width="120" height="120"></div>
              <h4>租赁服务</h4>
            </div>
          </div>
        </div>



        <div v-if="activeName==='second'" class="product-tabs-content-second container">
          <div style="overflow: hidden;">
            <common-title  border-color="#00acd7">使用场景</common-title>
            <div class="tabs-content-second-img">
              <img src="static/images/product/solution_trade_financing.png" width="800" height="450">
            </div>
            <div class="tabs-content-second-right">
              <h3>核心企业</h3>
              <p class="twentyeight-font-weight no-indent">
                应付账款到期，使用链单支付货款，替代商票、银票，节省付款成本，提高工作效率。<br>
                向上无限穿透到N级供应商，增加供应商粘性，打造稳定、高效的供应链生态圈。
              </p>
            </div>
            <div  class="tabs-content-second-right">
              <h3>供应商</h3>
              <div class="twentyeight-font-weight">供应商签收链单，根据需要选择：</div>
              <ul class="twentyeight-font-weight">
                <li class="li-disc">不缺钱：持有到期，链单到期后可获得与链单金额等额的货款。</li>
                <li class="li-disc">谈判力强：替代商票、银票或现金支付给供应商，链单金额可拆分。</li>
                <li class="li-disc">缺钱：使用链单向平台内的保兑机构融资。</li>
              </ul>
            </div>
          </div>
          <div class="tabs-content-second-apply">
            <common-title  border-color="#00acd7">适用行业</common-title>
            <div class="second-apply-flex">
              <!--<el-row>
                <el-col :span="6"  style="margin-bottom: 25px;">
                  <div><img src="static/images/product/u674.png" align="middle" width="58" height="65"></div>
                  <h4>汽车</h4>
                </el-col>
                <el-col :span="6"  style="margin-bottom: 25px;">
                  <div><img src="static/images/product/u676.png" align="middle" width="58" height="65"></div>
                  <h4>医疗</h4>
                </el-col>
                <el-col :span="6"  style="margin-bottom: 25px;">
                  <div><img src="static/images/product/u678.png" align="middle" width="58" height="65"></div>
                  <h4>快消品</h4>
                </el-col>
                <el-col :span="6"  style="margin-bottom: 25px;">
                  <div><img src="static/images/product/u680.png" align="middle" width="58" height="65"></div>
                  <h4>制造业</h4>
                </el-col>
                <el-col :span="6"  style="margin-bottom: 25px;">
                  <div><img src="static/images/product/u682.png" align="middle" width="58" height="65"></div>
                  <h4>餐饮</h4>
                </el-col>
                <el-col :span="6" style="margin-bottom: 25px;">
                  <div><img src="static/images/product/u680.png" align="middle" width="58" height="65"></div>
                  <h4>化工</h4>
                </el-col>
              </el-row>-->
              <div class="second-apply-flex-item">
                <div><img src="static/images/product/manufacture.png" align="middle"></div>
                <h4>制造业</h4>
              </div>
              <!--<div class="second-apply-flex-item">
                <div><img src="static/images/product/car.png" align="middle" width="120" height="120"></div>
                <h4>汽车</h4>
              </div>-->
              <div class="second-apply-flex-item">
                <div><img src="static/images/product/medical.png" align="middle"></div>
                <h4>医疗保健</h4>
              </div>
              <div class="second-apply-flex-item ">
                <div><img src="static/images/product/architecture.png" align="middle"></div>
                <h4>建筑</h4>
              </div>
              <div class="second-apply-flex-item">
                <div><img src="static/images/product/consumption.png" align="middle"></div>
                <h4>批发零售</h4>
              </div>
              <div class="second-apply-flex-item">
                <div><img src="static/images/product/chemical.png" align="middle"></div>
                <h4>化工</h4>
              </div>
              <div class="second-apply-flex-item">
                <div><img src="static/images/product/restaurant.png" align="middle"></div>
                <h4>餐饮</h4>
              </div>
              <div class="second-apply-flex-item ">
                <div><img src="static/images/product/farming.png" align="middle"></div>
                <h4>农业</h4>
              </div>
              <div class="second-apply-flex-item">
                <div><img src="static/images/product/clothing.png" align="middle"></div>
                <h4>服装</h4>
              </div>
              <div class="second-apply-flex-item ">
                <div><img src="static/images/product/energy.png" align="middle"></div>
                <h4>租赁服务</h4>
              </div>
            </div>
          </div>
        </div>
        <!-- <component v-bind:is="activeName">
         </component>-->
      </div>
    </div>
    <br>
    <br>
    <br>
  </div>
</template>
<script>
  import hexagon from './ui/hexagon.vue';
  import commonTitle from './ui/common-title.vue';
  import block from './ui/block.vue';
  import newsCard from './ui/news-card.vue';
  export default {
    components: {
      hexagon,
      commonTitle,
      block,
      newsCard
    },
    data () {
      return {
        activeName: 'first',
        loading: true,
        showBigImg: false
      };
    },
    methods: {
      changePane (activeName) {
        this.activeName = activeName;
      },
      toChainbill () {
        window.open('http://www.chainbill.cn');
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loading = false;
      })
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~assets/scss/_variables.scss";
  .twenty-font {
    font-size: 20px;
    /**
    * mobile
    */
    @media only screen and (max-device-width: 1024px) {
      font-size: 13px;
    }
  }
  .twentyeight-font-weight {
    line-height: 28px;
  }
  .i-font-css {
    /*vertical-align: middle;*/
    font-size: 35px!important;
  }
  .product-bg {
    width: 100%;
    position: relative;
    margin-top: 60px;
    .product-bg-content {
      color:#fff;
      position: absolute;
      top: 70%;
      left: 14%;
      /*left: 138px;*/
      h2 {
        font-weight: bold
      }
      img {
        vertical-align: bottom;
        margin-left: 3px;
      }
      span{
        font-size: 16px;
        vertical-align: middle;
      }
      i{
        vertical-align: middle;
      }
      /**
      *  mobile
      */
      @media only screen
      and (max-device-width: 1024px) {
        top: 60%;
        left: 8%;
        .el-button--medium.is-round {
          padding: 2px 4px;
        }
        span{
          font-size: 12px;
          vertical-align: middle;
        }
      }
    }
  }
  .product-tabs-flex {
    display: flex;
    height: 55px;
    font-size: 16px;
    line-height: 55px;
    border-bottom: 1px solid #e5e5e5;
    justify-content: center;
    /*border: 1px solid #e5e5e5;*/
    .product-tabs-pane {
      flex: 0 0 25%;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      &:hover:not(.is-active) {
        color: #00acd7;
      }
      &.is-active {
        position: relative;
        &:after {
          position: absolute;
          content: "";
          margin: 0 auto;
          display: block;
          border-bottom: 3px solid #00acd7;
          width: 46%;
          bottom: 0;
          left: 27%;
        }
      }
    }
  }
  .product-container {
    /**
    *  mobile
    */
    @media only screen
    and (max-device-width: 1024px) {
      margin-top:30px;
    }
    .product-tabs {
      background: #fff;
      min-height: 549px;
      .product-tabs-content {
        .flowImg{
          max-width: 66%;
          cursor:pointer;
          margin-left: 17%;
          image-rendering: -webkit-optimize-contrast;
        }
        .tabs-content-desc {
          text-align: center;
          width: 54%;
          margin: 0 23%;
          padding-bottom: 20px;
          .tabs-content-col {
            height: 250px;
            /*background: #ffffffde*/;
            padding-top: 20px;
            @media only screen and (min-device-height: 1024px) {
              &.col-relative {
                position: relative;
                top: -75px;
                z-index: 10;
              }
            }
            &:hover {
              border-color: #00acd7;
              position: relative;
              z-index: 20;
              .content-col-title {
                color: #00acd7;
              }
            }
            .content-col-img {
              text-align: center;
              /*height: 105px;
              background: url("../../../../../static/images/product/product-desc1.png") no-repeat;
              background-position: center;
              background-size: 105px 105px;*/
            }
            .content-col-title {
              margin-top:10px;
              font-size: 18px;
              span {
                font-weight: 600;
              }
            }
            .content-col-content {
              /*margin-top:25px;*/
              margin-top: 8px;
              color: #666666;
            }
          }
        }
        .tabs-content-ad {
          height: 300px;
          position: absolute;
          left: 0;
          width: 100%;
          background: url("../../../../../static/images/product/product-ad.jpg");
          background-size: 100% 100%;
          color:#fff;
          text-align: center;
          padding-top: 60px;
          padding-bottom: 60px;
          /**
           *mobile
           */
          @media only screen and (max-device-width: 1024px) {
            padding-top: 15px;
          }
          .tabs-content-ad-span {
            display: inline-block;
            background-color: #fcfcfb;
            background-color:rgba(252,252,251,0.08);
            width: 23%;
            height: 100%;
            padding-top: 25px;
            &:not(:first-child) {
              margin-left: 15px;
            }
            padding-left: 60px;
            text-align: left;
            /***
            * mobile
             */
            @media only screen and (max-device-width: 1024px) {
              width: 100%;
              height: auto;
              // background: transparent;
              text-align: center;
              margin-top: 13px;
              padding-top: 0px;
              padding-left: 0px;
              margin-left: 0px!important;
            }
            >div {
              &:first-child {
                font-size: 45px;
                /***
                 * mobile
                */
                @media only screen and (max-device-width: 1024px) {
                  font-size: 20px;
                }
              }
              &:last-child {
                margin-top: 5px;
              }
            }
          }
        }
        .tabs-content-comp {
          margin: 0 auto;
          /*mobile*/
          @media only screen and (max-device-width: 1024px) {
            width: auto;
          }
          .item-img {
            /*margin-left: 70px;*/
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            float: left;
            border-radius: 10px;
            border: 1px solid #00acd7;
            box-sizing: border-box;
            /*mobile*/
            @media only screen and (max-device-width: 1024px) {
              width: 80px;
              height: 80px;
              line-height: 80px;
            }
            img {
              display: inline-block;
              vertical-align: middle;
            }
            i {
              font-size: 50px;
            }
          }
          .item-text {
            vertical-align: bottom;
            padding-left: 18px;
            margin-top: 10px;
            color: #8A94A1;
            font-size: 16px;
            overflow: hidden;
            vertical-align: middle;
            width: 380px;
            /*mobile*/
            @media only screen and (max-device-width: 1024px) {
              font-size: 12px;
              width: auto;
            }
          }
          .partners-content-part {
            min-height: 450px;
            .dot-list{
              padding: 15px;
            }
            .box-card {
              width: 30%;
              min-height: 580px;
              margin: 1.5% 1%;
              border-radius: 4px;
              &:nth-child(1) {
                margin-left: 3%;
              }
              &:nth-child(3) {
                margin-right: 3%;
              }
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

              /**
               *  mobile
               */
              @media only screen
              and (max-device-width: 1024px) {
                width: 98%;
                min-height: 580px;
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
          }
        }
      }
      .tabs-content-second-title {
        font-weight: 500;
      }
      .tabs-content-second-img {
        width: 100%;
        text-align: center;
        @media only screen and (max-device-width: 1024px) {
          width: 30%;
          float: none;
          margin-top: 15px;
          img {
            width: 330px;
            height: 250px;
          }
        }
        /* margin-top: 90px;*/
      }
      .tabs-content-second-right {
        overflow: hidden;
        width: 50%;
        margin: 0 auto;
        padding: 20px 40px;
        margin-top: 40px;
        position: relative;
        @media only screen and (max-device-width: 1024px) {
          width: auto;
        }
        &:before {
          content: "";
          position: absolute;
          top: 0px;
          right: 4px;
          width: 60px;
          height: 60px;
          border: 1px solid #00acd7;
          border-left: 0px;
          border-bottom: 0px;
        }
        &:after {
          content: "";
          position: absolute;
          left: 4px;
          bottom: 0px;
          width: 60px;
          height: 60px;
          border: 1px solid #00acd7;
          border-right: 0px;
          border-top: 0px;
        }
        .li-disc {
          &:before {
            content: "";
            width:8px;
            height:8px;
            display: inline-block;
            line-heigth:8px;
            background: #666666;
            border-radius:8px ;
            margin-right: 5px;
          }
        }
      }
      .second-apply-flex {
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /*mobile*/
        @media only screen and (max-device-width: 1024px) {
          width: auto;
        }
        .second-apply-flex-item {
          flex: 0 0 20%;
          padding-bottom: 20px;
          @media only screen and (max-device-width: 1024px) {
            padding: 0 4px;
          }
          img{
            height: 120px;
            width: 120px;
            @media only screen and (max-device-width: 1024px) {
              width: 100px;
              height: 100px;
            }
          }
          &:hover {
            transform: translateY(-10px);
            transition: transform .5s ease-in-out;
          }
        }
      }
    }
  }
</style>
