<template>
  <div class="content-box-card-group">
    <slot></slot>
  </div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'ContentBoxCardGroup'
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixin";
  .content-box-card-group {
    .content-box-card {
      &:not(:first-child) {
        border-top: none;
      }
    }
  }
</style>


