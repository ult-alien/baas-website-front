<template>
  <div>
    <step-block step="1" type="left" title="经办员申请链单融资">
      <div>
        <p>企业管理员授权的经办员进入【链单融资】，使用持有的链单向金融机构融资，以提前获得货款。</p>
      </div>
      <div>
        <img src="./dct_01.png">
      </div>
    </step-block>
    <step-block step="2" type="right" title="经办员填写融资信息">
      <div>
        <p>根据融资需求填写融资金额、融资日期及入账账户。为保证时效，仅可在工作日融资。
          融资成功后将获得扣除融资利息后的融资款。
        </p>
      </div>
      <div>
        <img src="./dct_02.png">
      </div>
    </step-block>
    <step-block step="3" type="left" title="核对表单信息并提交">
      <div>
        <p>核对表单信息无误后，选择“确认提交”发起融资申请。</p>
      </div>
      <div>
        <img src="./dct_03.png">
      </div>
    </step-block>
    <step-block step="4" type="right" title="通知复核员审批">
      <div>
        <p>
          对于经办角色发起的转单申请，会通知您企业的复核角色审批。
        </p>
      </div>
      <div>
        <img src="./dct_04.png">
      </div>
    </step-block>
    <step-block step="5" type="left" title="复核员审批融资">
      <div>
        <p>
          企业管理员授权的复核角色进入【融资复核】，复核通过融资申请。上午12点前复核通过，将在融资日当日收到融资款；上午12点后复核通过，将在融资日下个工作日之前收到融资款。
        </p>
      </div>
      <div>
        <img src="./dct_05.png">
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
