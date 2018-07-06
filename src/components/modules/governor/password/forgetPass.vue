<template>
  <div>
    <pl-header></pl-header>
    <pl-layout class="layout-contianer" :show-left='false'>
       <router-view slot="right"></router-view>
    </pl-layout>
  </div>
</template>

<script type="text/javascript">
  export default {
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  body{
    background: url(../../../../assets/img/bg.jpg) repeat;
  }
</style>
