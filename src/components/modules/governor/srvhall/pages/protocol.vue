<template>
  <div>
    <ul class="srvhall-items">
      <li>
        <router-link :to="{name: 'protocol.send-prot'}" target="_blank"  >链单开具协议</router-link>
      </li>
      <li>
        <router-link :to="{name: 'protocol.transfer-prot'}" target="_blank">链单转让协议</router-link>
      </li>
      <li>
        <router-link :to="{name: 'protocol.discount-prot'}" target="_blank">链单商业保理融资业务协议</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../../assets/scss/variables";
  .srvhall-items{
    li{
      padding: 10px 0;
      cursor: pointer;
      border-bottom: 1px solid #eee;
      &:hover{
        color: $primary-color !important;
      }
    }
  }
</style>


