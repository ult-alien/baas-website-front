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
    /* border: 1px solid #e4e4e4; */
    margin-right: 30px;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
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
    &.scale:hover{
      .icon-wrapper{
        transform: scale(1.2);
      }
    }
    .icon-wrapper{
      padding: 20px 14px;
      transition: all 0.4s;
      /* border-bottom: 1px solid #e4e4e4; */
      text-align: center;
      i{
        font-size: 10em;
        color: steelblue;
      }
    }
  }
</style>


