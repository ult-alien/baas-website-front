<template>
  <div class="container-wrapper" v-loading="loading">

    <div class="bg">
      <div class="container">
        <div class="block">
          <div class="left">
            <h2>资产上链</h2>
            <p class="no-indent">将现实中的实体资产在区块链上进行登记流通。</p>
            <p class="no-indent">在金融业务典型的资产交易、大数据交易、共享经济、积分通兑等场景下，对接BaaS平台，可以让资产轻松上链，让区块链在数字资产的发行和流通中扮演资产确权、交易确认、记账、对账和清算的角色；而区块链技术的防篡改能力，将有效防止数据篡改，规避内部作弊风险，提高资产公信力</p>
          </div>
          <div class="right bc1">
            <img src="static/images/block-chain/bc1.png" style="max-width: 96%;">
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="block">
        <div class="right">
          <h2>防伪溯源</h2>
          <p class="no-indent">企业商品的生产销售过程信息通过BaaS平台上链，轻松帮助企业记录商品安全透明、不可篡改、可追溯的生产和流转信息，为客户提供一站式区块链服务。协助客户进行商品生产销售的信息披露，为企业客户快速抓住消费者，提高核心竞争力。</p>
        </div>
        <div class="left bc2">
          <img src="static/images/block-chain/bc2.png" style="max-width: 90%;">
        </div>
      </div>
    </div>

    <div class="bg">
      <div class="container">
        <div class="block">
          <div class="left">
            <h2>为什么使用Stellar</h2>
            <p class="no-indent">区块链技术目前主流的主要有专注价值传递的比特币技术，在比特币技术中增加智能合约的以太坊技术，还有专注于资产发行，清算、支付的Ripple和Stellar技术，对比如下：</p>
            <!--<p></p>-->
            <table width="100%"  class="block-table">
              <tr>
                <td></td>
                <td class="block-font">Bitcoin</td>
                <td class="block-font">Ethereum</td>
                <td class="block-font">Stellar</td>
              </tr>
              <tr>
                <td class="block-font">确认时间</td>
                <td >约1小时</td>
                <td>约15分钟</td>
                <td>3到5秒</td>
              </tr>
              <tr>
                <td style="font-weight: 600">平均交易费用</td>
                <td>每笔35元</td>
                <td>每笔2元</td>
                <td>30万笔只要1元</td>
              </tr>
              <tr >
                <td style="font-weight: 600">每秒吞吐量</td>
                <td>7笔</td>
                <td>30笔</td>
                <td>3000笔</td>
              </tr>
              <tr>
                <td style="font-weight: 600">共识机制</td>
                <td>工作量证明</td>
                <td>工作量证明</td>
                <td>SCP恒星共识协议</td>
              </tr>
            </table>
            <p class="no-indent">可以看到，恒星是一种高性能和高实时性的分布式账本技术。在确认时间上，只要3到5秒。而采用其他的技术，都需要较长时间来等待确认。而且性能也比另外两种技术高两个数量级。这就为实时性较高的企业级应用场景提供了基础设施。采用其他的技术，就容易变成POC（概念型验证），并且止步于POC，无法落地。恒星的共识机制是基于联邦拜占庭容错的。目前用拜占庭容错方式进行共识已经得到了学术界的认可。不用挖矿，不会分叉，性能更高，成本更低。</p>
            <p class="no-indent">恒星也是有智能合约概念，只不过不是图灵完备的。在实际使用过程中，足以满足大部分的需求。而且恒星是针对金融领域解决方案的技术，特别适合使用在资产发行、拆分、流转、清算等的应用上。因此，我们将恒星应用于供应链领域，使得供应链金融系纺如虎添翼。另外，恒星与IBM达成了合作。IBM正在与银行合作集成恒星。不仅仅是普通银行，还有央行。这也从侧面验证了恒星技术的强大与可靠。</p>
          </div>
          <div class="right whyuse">
            <img src="static/images/block-chain/whyuse1.png" style="max-width: 90%;">
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="block">
        <div class="right">
          <h2>存证取证</h2>
          <p class="no-indent">BaaS平台整合了ipfs分布式存储协议，提供安全可靠的分布式数据存储服务。在传统的电子票据、合同、用户信息、存证等记录保全过程中，存在效率底下、流程繁琐、票据作假等弊端。BaaS为用户提供便捷的接口服务，使用户使用简单易懂的接口就可以实现区块链存证取证服务。</p>
        </div>
        <div class="left strength">
          <img src="static/images/block-chain/strength.png" style="max-width: 90%;">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true
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
  .dot-list{
    .text-blod{
      font-weight: 600;
    }
    li{
      line-height: 30px;
      color: #5E5E5E;
    }
  }
  .container-wrapper{
    padding-top: 60px;
    background: #fff;

    .bg{
      background: #f6f6f6;
    }
    img{
      vertical-align: middle;
    }
    .block{
      overflow: hidden;
      margin: 20px 0;
      position: relative;
      p{
        line-height: 30px;
        text-align: left;
      }
      .left{
        width: 50%;
        float: left;
        text-align: center;
        &.strength{
          height: 485px;
          line-height: 485px;
          vertical-align: middle;
        }
        &.bc2{
          height: 308px;
          line-height: 308px;
        }
      }
      .right{
        float: right;
        width: 50%;
        text-align: center;
        &.whyuse{
          height: 820px;
          line-height: 820px;
        }
        &.bc1{
          height: 465px;
          line-height: 465px;
        }
      }
      h2{
        font-weight: 500;
        font-size: 1.8em;
        line-height: 40px;
        text-align: left;
      }
      .block-table {
        font-size: 18px;
        margin-bottom: 10px;
        @media only screen
        and (max-device-width: 1024px) {
          font-size: 12px;
        }
        .block-font {
          font-weight: 600;
        }
        >tr {
          &:nth-child(2){
            background: #D0DCF0;
          }
         &:nth-child(4) {
           background: #D0DCF0;
         }
        }
        td {
          padding-left: 6px;
          padding-top: 10px;
          padding-bottom:10px;
        }
      }

      /**
      *  mobile
      */
      @media only screen
      and (max-device-width: 1024px) {
        .left{
          width: 100%;
          float: none;
          height: auto !important;
          line-height: normal !important;
        }
        .right{
          float: none;
          width: 100%;
          height: auto !important;
          line-height: normal !important;
        }
      }
    }
  }
</style>


