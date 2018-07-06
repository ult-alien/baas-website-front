<template>
  <div>
    <step-block step="1" type="left" title="申请回购链单">
      <div>
        <p>企业管理员授权的经办角色进入【链单回购】，对已融资未到期的链单申请回购，以节省融资利息。</p>
      </div>
      <div>
        <img src="./rpur_01.png">
      </div>
    </step-block>
    <step-block step="2" type="right" title="核对回购申请">
      <div>
        <p>核对回购信息，若信息无误确认提交。</p>
      </div>
      <div>
        <img src="./rpur_02.png">
      </div>
    </step-block>
    <step-block step="3" type="left" title="重新持有链单">
      <div>
        <p>回购申请完成，系统自动将应付回购金额从企业默认银行账户扣款至保理公司。</p>
      </div>
      <div>
        <img src="./rpur_03.png">
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
