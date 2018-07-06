<template>
  <div class="toolbar-layer">
    <div v-if="title" class="text-muted toolbar-layer-title">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: String
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .toolbar-layer{
    position: absolute;
    bottom: 0px;
    right: 100%;
    padding: 10px;
    min-height: 50px;
    background: #fff;
    opacity: 0;
    filter: alpha(opacity=0);
    transform-origin: 100% 100%;
    transform: scale(0.01);
    transition: all 1s;
    box-shadow: 2px 2px 5px #cccccc;
    .toolbar-layer-title {
      font-size: 12px;
      text-align: center;
      margin-bottom: 5px;
    }
  }
</style>


