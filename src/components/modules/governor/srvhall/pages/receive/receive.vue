<template>
  <div>
    <step-block step="1" type="left" title="申请签收链单">
      <div>
        <p>企业管理员授权的企业用户进入【链单签收】，签收付款人支付的链单。签收成功后贵司结算账户将在链单到期日收到链单金额对应款项，也可通过平台提前获得货款。</p>
      </div>
      <div>
        <img src="./rcv_01.png">
      </div>
    </step-block>
    <step-block step="2" type="right" title="等待签收审批">
      <div>
        <p>上传贸易相关的合同、发票、结算单等，签收提交后，平台会在1-2个工作日完成审核。（如果申请被退回，请按要求重新上传附件后再提交）</p>
      </div>
      <div>
        <img src="./rcv_02.png">
      </div>
    </step-block>
  </div>
</template>

<script>
  import stepBlock from '../com/step-block.vue';
  export default {
    components: {
      stepBlock
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
