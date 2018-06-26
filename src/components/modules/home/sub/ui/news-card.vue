<template>
  <div class="block-card-wrapper" :class="canScale ? 'scale' : ''">
    <div class="icon-wrapper">
      <slot name="pic"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      canScale: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .block-card-wrapper{
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23), 0 0 1px rgba(0, 0, 0, 0.22);
    margin-right: 5%;
    width: 30%;
    float: left;
    /**
    *  mobile
    */
    @media only screen
    and (max-device-width: 1024px) {
      width: 100%;
      margin: 0;
    }
    &:last-child{
      margin-right: 0;
    }
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    &.scale:hover{
      transform: scale(1.08);
    }
    &:hover{
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22), 0 0 4px rgba(0, 0, 0, 0.22);
    }
    .icon-wrapper{
      border: none;
      text-align: center;
      i{
        font-size: 10em;
        color: steelblue;
      }
    }
  }
</style>


