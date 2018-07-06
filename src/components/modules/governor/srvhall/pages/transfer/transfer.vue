<template>
  <div>
    <step-block step="1" type="left" title="经办员申请链单转让">
      <div>
        <p>企业管理员授权的经办角色进入【链单转让】界面，使用持有的链单支付给交易对手。</p>
      </div>
      <div>
        <img src="./xfe_01.png">
      </div>
    </step-block>
    <step-block step="2" type="right" title="经办员填写转让信息">
      <div>
        <p>给一家或多家收款人转单，按约定贸易价款填写付款金额，也可根据货物质量及风险情况延长供货方的收款日（到期日），您将获得延期收益。</p>
      </div>
      <div>
        <img src="./xfe_02.png">
      </div>
    </step-block>
    <step-block step="3" type="left" title="核对表单信息并提交">
      <div>
        <p>核对表单信息无误后，选择“确认提交”发起转让申请。</p>
      </div>
      <div>
        <img src="./xfe_03.png">
      </div>
    </step-block>
    <step-block step="4" type="right" title="通知复核员审批">
      <div>
        <p>
          对于经办角色发起的转单申请，会通知您企业的复核角色审批。
        </p>
      </div>
      <div>
        <img src="./xfe_04.png">
      </div>
    </step-block>
    <step-block step="5" type="left" title="复核员审批转单">
      <div>
        <p>
          企业管理员授权的复核角色进入【转单复核】，审批通过转单申请后，将通知收单人签收。
          若信息有误可驳回经办，由经办角色重新发起转单申请。
        </p>
      </div>
      <div>
        <img src="./xfe_05.png">
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
