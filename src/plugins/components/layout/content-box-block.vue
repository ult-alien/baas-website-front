<template>
  <div class="content-box-block">
    <div ref='content-box-block-slot'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import config from '../config';
  export default {
    name: config.prefix + 'ContentBoxBlock',
    props: {
      fixedWidth: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      if (this.fixedWidth) {
        this.$refs['content-box-block-slot'].style.width = this.$refs['content-box-block-slot'].clientWidth + 'px';
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .content-box-block{
    padding: 20px 30px;
  }
</style>
