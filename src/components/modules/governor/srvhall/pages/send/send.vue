<template>
  <div>
    <step-block step="1" type="left" title="经办员填写表单">
      <div>
        <p>企业管理员授权的经办角色进入【我要开单】，填写表单信息，可选单张或批量开单。</p>
      </div>
      <div>
        <img src="./send_01.png">
      </div>
    </step-block>
    <step-block step="2" type="right" title="核对表单信息并提交">
      <div>
        <p>核对表单信息无误后，选择“确认提交”发起开单申请。</p>
      </div>
      <div>
        <img src="./send_02.png">
      </div>
    </step-block>
    <step-block step="3" type="left" title="通知复核员审批">
      <div>
        <p>对于经办角色发起的开单申请，会通知您企业的复核角色审批。</p>
      </div>
      <div>
        <img src="./send_03.png">
      </div>
    </step-block>
    <step-block step="4" type="right" title="复核员审批开单">
      <div>
        <p>
          企业管理员授权的复核角色进入【开单复核】，审批通过开单申请后，将通知收单人签收。
          若信息有误可驳回经办，该单据作废。
        </p>
      </div>
      <div>
        <img src="./send_04.png">
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
