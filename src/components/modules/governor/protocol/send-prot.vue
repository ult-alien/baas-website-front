<template>
  <div :style="{height: height}" style="overflow: hidden">
    <iframe width="100%" :height="height" src="static/html/send-prot.htm"></iframe>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        height: 0
      };
    },
    created () {
      this.setHeight();
      let _this = this;
      window.onresize = function () {
        _this.setHeight();
      };
    },
    methods: {
      setHeight () {
        this.height = document.documentElement.clientHeight + 'px';
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
