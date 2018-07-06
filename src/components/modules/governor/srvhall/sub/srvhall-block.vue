<template>
  <div class="container" :class="[hover ? 'hover' : '']">
    <div class="content">
      <slot></slot>  
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      hover: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/variables";
  .container{
    padding: 20px;
    height: 200px;
    margin: 10px 0;
    width: 100%;
    background-color: #fff;
    position: relative;
    font-size: 16px;
    cursor: pointer;
    .content{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .icon{
      vertical-align: middle;
    }
    &:hover, &.hover{
      background-color: $primary-bg-color;
      color: #fff !important;
      .icon{
        color: #fff !important;
      }
    }
  }
</style>
