<template>
  <div class="about-wrapper" v-loading="loading">
    <div class="intro">
      <div class="container block" id="intro">
        <common-title border-color="#fff">公司简介</common-title>
        <p>
          共赢链取谐音“供应链”，全称“共赢链信息科技（深圳）有限公司”。我们致力于用区块链和云计算技术重塑传统供应链金融，帮助核心企业零人力零投入打造“商票、银票”体系外的创新支付体系和随借随还、互联网创新保理体系。
        </p>
        <p>
          共赢链信息科技创新的将区块链应用到供应链中的资金流和信息流。信息流方面，从核心企业与供应商签订合同开始上链，将物流、仓单、发票、对账等相关信息串成一条完整的链条；资金流方面，将应付账款、应收账款债权数据化和电子化，运用区块链Stellar的技术底层将其发行成数字资产凭证，命名为链单。该链单由核心企业进行承兑，具备支付、拆分、流转、回购和融资五大功能，整个业务流程都在线上完成，大大降低操作成本和提高执行效率，真正意义上为中小微供应商减负减重。
        </p>
        <p>
          公司的目标是：为核心企业赋能，助力核心企业从产业中来到金融中去，更好的服务其供应链中各级供应商，提升整体供应链实力，进而提升企业市场竞争力。同时，携手核心企业，助其零成本零人力打造商业保理公司、小贷公司、基金公司，发行ABS等金融业务，将本来就属于核心企业的供应链金融利益从传统金融机构中拿回来。
        </p>
        <!--<img src="static/images/about/company-intro.jpg" style="width: 100%;" alt="公司简介图片">-->
      </div>
    </div>

    <div class="container">
      <div class="block" id="team">
        <common-title>核心团队</common-title>
        <p>
          公司金融核心团队均来自平安租赁、招商银行、怡亚通、TCL金融等知名公司；技术核心团队均具有10年以上IT经验，来自支付宝大数据专家、万向区块链实验室等。
        </p>
        <about-team class="team-box">
          <div class="team-card" @click="teamClick(index)" v-for="(item, index) in team">
            <div class="bg"></div>
            <img :src="item.photo" style="max-width: 100%">
            <div class="desc">
              <p class="resume-title no-indent">
                <span class="name">{{item.name}}</span> <span class="post">{{item.post}}</span>&nbsp;{{item.edu}}
              </p>
              <p class="no-indent">{{item.desc}}</p>
            </div>
          </div>
        </about-team>
      </div>
    </div>

    <div class="block" id="leader">
      <common-title>战略股东</common-title>
      <div class="bg">
        <div class="container">
          <about-leader style="border-bottom: 1px solid #ebebeb;">
            <div class="logo zhengxuan" slot="photo"></div>
            <div slot="resume">
              <p class="desc">深圳市正轩投资有限公司成立于2003年6月，实收资本1.8亿元。公司旗下有正轩前海股权投资基金、正轩联合投资和北京正轩等公司。公司大股东暨董事长夏佐全先生为比亚迪（股票代码：002594）创始人之一。</p>
              <p class="desc">正轩投资是一家致力于高科技、创新型企业发展的投资机构，秉着“诚信、专业、创造、共赢”的投资理念，先后在机器人和智能制造、航空航天、芯片设计、生物基因等领域投资企业30余家（其中5家公司已成功上市），旗下管理的资产超过100亿人民币。</p>
              <p class="desc">未来十年，将在智能制造和机器人、航空航天、TMT、新能源、生物医学等领域加大投资力度，并搭建一个所投资企业资源共享的平台，使每一个被投资企业不仅能得到资金上的支持，还能获得企业发展的其它资源；所投企业总资产价值达到1000亿元，成为中国知名的投资集团。</p>
              <p class="desc">目前，正轩投资已投资企业包括比亚迪、优必选、安诺优达、联合利丰、台海玛、云讯通、测聘网、中国人力资源网、懒投资、德堡数控等。</p>
            </div>
          </about-leader>
        </div>
      </div>

      <div class="container">
        <about-leader>
            <div class="logo shiwei"  slot="photo"></div>
          <!--<div>
            <div class="logo shiwei1"></div>
          </div>-->
          <div slot="resume">
            <p class="desc">PreAngel Fund 由王利杰于 2011 年创办，已经连续成立了 6 支基金，共管理 6亿人民币，合伙人包括张军、胡炜、顾浩、孙真臻、李卓桓、吴泽强（旧金山）、庄严（圣地亚哥）。</p>
            <p class="desc">经过近 6 年的发展，PreAngel Fund 已经演变成了一个基金家族，裂变出十维资本，伽利略资本，荷多资本等 7 个品牌，累计投资 300+项目，天使轮和种子轮，95%的投资是在第一轮，单个项目 100-500 万元投资；其中十维资本由张军、胡炜和王利杰于 2015 年组建成立，重点关注新 IT、金融科技和医疗创新等领域的 A 轮前项目。</p>
            <p class="desc">十维资本自成立起，依托于其强大的项目挖掘能力和快速投资决策的风格，重点布局了新 IT、金融科技和医疗创新等领域的 A 轮前项目。</p>
            <p class="desc">十维资本以股权投资作为手段，以早期项目为入口，可以说是创新 X 资本的最好践行者。其中十维一期基金目前已经进入退出期，总计投了 28 个项目，2/3 的项目获得后续融资，内部 IRR 达到 59.64%；十维二期 18 个月投资了 24 个项目，另外有 3 个新项目在走流程，接近 60%项目获得后轮融资，5 个项目到达 B 轮，已投项目整体回报达到 1.88X；</p>
          </div>
        </about-leader>
      </div>
    </div>

    <div class="bg">
      <div class="container">
        <div class="block" id="contract">
          <common-title>联系方式</common-title>
          <div class="contract-content">
            <el-amap class="amap" :zoom="12" :center="marker.position" ref="map" :events="mapEvents">
              <el-amap-marker vid="component-marker" :events="marker.events" :position="marker.position"></el-amap-marker>
              <el-amap-info-window :position="marker.position" :content="marker.content" :visible="marker.visible"></el-amap-info-window>
            </el-amap>
            <!--<p><span class="text-bold">我们的地址：</span>深圳市南山区深圳软件园产业基地5C栋2楼--3A</p>
            <p><span class="text-bold">我们的电话：</span>0755-86720669</p>
            <p><span class="text-bold">我们的邮箱：</span>gylsz@gylsz.cn</p>-->
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
    <!--锚点-->
    <!--
    <div class="navPoint" :style="{'right': navMrgR + 'px'}">
      <div class="point" v-for="(item, index) in navPoint">
        <div class="point-content" @click="jump(item.target)" :style="{'transform': 'scale('+ item.scale +')'}">
          <div class="dot" :style="{'background': (item.scale >= 1.11 ? '#06b7e9' : '#f1f1f1'), 'color': (item.scale >= 1.11 ? '#fff' : '#606060')}">
            <div class="title">{{item.title}}</div>
          </div>
        </div>
        <div class="point-line" v-if="index != (navPoint.length - 1)"></div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
  import commonTitle from './ui/common-title.vue';
  import aboutTeam from './ui/about-team.vue';
  import aboutLeader from './ui/about-leader.vue';
  import $ from 'jquery';
  export default {
    components: {
      commonTitle,
      aboutTeam,
      aboutLeader
    },
    data () {
      return {
        navPoint: [
          {title: '公司简介', target: 'intro', scale: 1},
          {title: '核心团队', target: 'team', scale: 1},
          {title: '战略股东', target: 'leader', scale: 1},
          {title: '联系方式', target: 'contract', scale: 1}
        ],
        loading: true,
        navMrgR: 28,
        team: [
          {
            name: '徐立',
            post: '公司法人',
            edu: '大连海事大学',
            photo: 'static/images/about/xuli1.jpg',
            desc: '2007年大连海事大学毕业，4年招商银行工作经验，4年创业经验，2015年公司被并购，2016年转型VC/PE投资。'
          },
          {
            name: '梁然',
            post: '监理',
            edu: '浙江大学硕士',
            photo: 'static/images/about/liangran.jpg',
            desc: '10年以上IT经验，曾任美国道富银行亚太区开发经理。区块链技术专家，中国分布式总账基础协议联盟ChinaLedger高级研究员，万向区块链实验室项目经理，中国计算机协会区块链讲师。主要研究区块链中资产的发行和交易，参与编写了ChinaLedger技术白皮书，工信部中国区块链技术和应用发展白皮书等。从12年开始关注研究区块链，是RippleFox创始人。'
          },
          /* {
            name: '徐季秋',
            edu: '浙江大学 硕士',
            photo: 'static/images/about/liangran.jpg',
            desc: '10年IT经验，7年大数据全链路经验，曾任阿里巴巴数据科学团队专家，支付宝国际风控数据专家，第一届阿里巴巴数据大学讲师，IBM大数据平台BigInsights的Hadoop组件负责人。 有丰富的数据平台,数据处理, 数据挖掘,机器学习等技术积累和实战经验. 在反欺诈,反作弊风控领域,曾负责支付宝风控产品eBuckler。'
          }, */
          /* {
            name: '张亚龙',
            edu: '郑州大学',
            photo: 'static/images/about/zhangyalong.jpg',
            desc: '租赁和保理行业7年以上工作经验，供应链管理5年以上工作经验；先后任职于海通证券、平安集团等知名企业，和全国主要券商、信托、银行、资管、基金子公司等机构建立了良好的合作关系，并有一定的核心客户资源。'
          }, */
          {
            name: '严莉萍',
            edu: '北京大学汇丰商学院硕士',
            photo: 'static/images/about/yanliping.jpg',
            desc: '曾就职于中国农业银行，前海金融管理学院华南负责人，深圳市前海和智金控集团合伙人兼商学院执行院长。曾负责广发银行总行，平安银行总行，江西银行总行等年度战略咨询和培训项目。'
          },
          {
            name: '钱多多',
            edu: '社科院 金融硕士',
            photo: 'static/images/about/qianduoduo.jpg',
            desc: '法律、金融、互联网科技跨行业经验，7年金融从业经验，互联网投资，VC/PE股权投资，互联网技术方案供应商，为比亚迪、中信银行、康佳等上市公司提供互联网技术解决方案，前任中正联储投资VP副总裁，腾泰翼科技总裁CEO。'
          },
          {
            name: '张友钟',
            edu: '',
            photo: 'static/images/about/zhangyouzhong.jpg',
            desc: '2008年部队退伍，自主创业，2009年承接上饶农商行银行装修、2010年承接上饶高铁电力迁改项目、2012年成功获批江西省重点物流企业，公司销售过亿元，在房地产行业、金融行业拥有广泛的人脉和资源。'
          },
          {
            name: '王辉',
            edu: 'CTO',
            photo: 'static/images/about/wanghui.jpg',
            desc: '10+年IT架构和项目管理经验，主持思贝克、广西糖网等企业的IT建设规划以及中信银行、TCL、格力等企业金融产品架构和开发，先后任职于浪潮、安邦保险、中信银行等知名企业。'
          },
          {
            name: '闪仁雪',
            edu: '',
            photo: 'static/images/about/shanrenxue.jpg',
            desc: '5+年金融产品设计和项目质量管理经验，参与广发银行、中信银行、TCL、格力、思贝克等多家银行企业的金融产品设计。'
          }
        ],
        marker: {
          position: [113.941049,22.523824],
          events: {
            click: () => {
              this.marker.visible = false;
              this.$nextTick(() => {
                this.marker.visible = true;
              });
            }
          },
          content:`<div>
              <p style="font-weight: bold;">共赢链信息科技（深圳）有限公司</p>
              <p>深圳市南山区深圳软件园产业基地5C栋2楼--3A</p>
              <p><i class="el-icon-phone" style="font-size: 16px;display: inline;"></i>&nbsp;0755-86720669</p>
              <p><i class="el-icon-message" style="font-size: 16px;display: inline;"></i>&nbsp;gylsz@gylsz.cn</p>
            </div>`,
          visible: true
        },
        mapEvents: {
          zoomchange: (o) => {
            this.$nextTick(() => {
              this.$refs.map.$$getInstance().setCenter(this.marker.position);
            });
          }
        }
      }
    },
    methods: {
      calPointScale (proportion) { // 最大放大倍数是1.2
        return (1 - proportion) * 0.2;
      },
      calAllScale () {
        this.navPoint.forEach((item, index) => {
          let offsetScreenTop = document.querySelector('#' + item.target).getBoundingClientRect().top;
          this.navPoint[index].scale = (offsetScreenTop < 24 || offsetScreenTop > window.screen.availHeight) ? 1: this.calPointScale((offsetScreenTop - 24) / (window.screen.availHeight - 24)) + 1;
        });
      },
      jump (target) { // 平滑滚动
        let total = document.querySelector('#' + target).offsetTop - 30;
        $('html, body').animate({scrollTop: total}, 400)
      },
      teamClick (index) {
        if (window.innerWidth * window.devicePixelRatio < 1024) {
          this.$alert('<p>'+ this.team[index].desc +'<p>', this.team[index].name, {
            dangerouslyUseHTMLString: true,
            customClass: 'messageBox'
          });
        }
      }
    },
    mounted () {
      this.calAllScale();
      // 计算滚动到哪里
      window.onscroll = () => {
        this.calAllScale();
      }
      this.$nextTick(function () {
        this.loading = false;
      });
      this.navMrgR += document.querySelector('.about-wrapper').offsetLeft;
    },
    destroyed () {
      // 跳转之后需要注销时间
      window.onscroll = null;
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
 .messageBox{
    width: 80%;
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~assets/scss/_variables.scss";

  .about-wrapper{
    margin-top: 60px;
    .amap {
      height: 400px;
    }
    .bg{
      background: #f6f6f6;
    }
    .intro{
      background: url('../../../../../static/images/about/company-intro1.jpg') no-repeat;
      background-position: top center;
      background-size: cover;
      color: #fff;
      padding-bottom: 60px;
    }

    .team-box{
      .team-card{
        position: relative;
        margin-top: 5px;
        .bg{
          opacity: 0;
          background: $primary-color;
          transition: all .2s;
          width: 100%;
          height: calc(100% - 5.6px);
          position: absolute;
          top: 0;
          left: 0;
        }
        &:hover{
          .bg{
            opacity: 0.6;
          }
          .desc{
            opacity: 1;
          }
          .main{
            opacity: 0;
          }
        }
        .desc{
          position: absolute;
          opacity: 0;
          transition: all .2s;
          width: 96%;
          left: 2%;
          color: #fff;
          p{
            margin-bottom: 4px;
          }
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          line-height: 18px;
          margin: 0 0;
          .name{
            font-size: 1.4em;
            font-weight: 500;
          }
        }
      }
    }
    .navPoint{
      position: fixed;
      width: 60px;
      right: 175px;
      top: 40%;
      transform: translateY(-50%);
      .point{
        position: relative;
        margin-top: 40px;
        vertical-align: middle;
        .point-content{
          transition: all .3s;
          &:hover{
            transform: scale(1.2) !important;
            cursor: pointer;
            .dot{
              background: $primary-color !important;
              color: #fff !important;
            }
          }
          .dot{
            width: 60px;
            height: 60px;
            text-align: center;
            color: #000;
            line-height: 60px;
            background: #f1f1f1;
            border-radius: 100%;
            display: inline-block;
            vertical-align: middle;
            position: relative;
            .title{
              width: 2em;
              line-height: normal;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
        .point-line{
          position: absolute;
          top: 66px;
          height: 28px;
          border-left: 4px dotted #ccc;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    #contract{
      p{
        line-height: 38px;
        font-size: 16px;
      }
      text-align: center;
      .contract-content{
        /* background: url('../../../../../static/images/about/contract-bg.png') no-repeat; */
        background-position: bottom center;
        background-size: 100%;
      }
    }
    .text-bold{
      font-weight: bold;
    }
    #leader{
      .logo{
        background-size: contain;
        background-position: top center, bottom center;
        background-repeat: no-repeat;
        height: 50%;
        margin-top: 25%;
        width: 100%;
        &.zhengxuan{
          background-image: url('../../../../../static/images/about/zhengxuan.png');
          background-position: center;
        }
        &.shiwei{
          background-image: url('../../../../../static/images/about/PreAngel.png'), url('../../../../../static/images/about/shiwei2.jpg');
        }
      }
    }


    /**
    *  mobile
    */
    @media only screen
    and (max-device-width: 1024px) {
      .navPoint{
        display: none;
      }
      .content{
        margin-right: 0;
      }
      .team-box{
        .team-card{
          margin-top: 0;
          &:hover{
            .bg{
              opacity: 0;
            }
            .desc{
              opacity: 0;
            }
            .main{
              opacity: 1;
              background-color: rgba(0, 0, 0, 0.4);
            }
          }
          .main{
            .resume-title {
              font-size: 10px;
              .name{
                font-size: 12px;
                font-weight: 500;
              }
              &.name{
                font-size: 12px;
                font-weight: 500;
              }
            }
          }
        }
      }

      #leader{
        .logo{
          background-size: 181px;
          height: 100%;
          margin-top: 0;
        }
      }
    }
  }
</style>


