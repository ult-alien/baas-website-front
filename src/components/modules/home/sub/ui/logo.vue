<template>
  <div class="logo">
    <img src="static/images/index/logo-green.png" alt="logo">
    <p class="companyName"><slot name="companyName"></slot></p>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .logo{
    vertical-align: middle;
    > img {
      max-width: 50px;
      vertical-align: inherit;
    }
    .companyName{
      font-size: 1.6em;
      display: inline;
      vertical-align: inherit;
      color: #fff;
    }
  }
</style>


