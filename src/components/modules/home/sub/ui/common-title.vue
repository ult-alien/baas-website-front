<template>
  <div class="title">
    <div :style="{'border-color': borderColor}" :class="[noUnderline ? '' : 'underline']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      borderColor: {
        type: String,
        default: '#06b7e9'
      },
      noUnderline: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .title{
    padding: 34px 0;
    text-align: center;
    > div{
      padding: 10px;
      font-size: 1.8em;
      display: inline-block;
      text-align: center;
      &.underline{
        border-bottom: 3px solid #06b7e9;
      }
    }
  }


  /**
  *  mobile
  */
  @media only screen
  and (max-device-width: 1024px) {
    .title{
      padding: 16px 0;
      > div{
        padding: 10px 16px;
        font-size: 1.5em;
        &.underline{
          border-bottom: 2px solid #00c2c2;
        }
      }
    }
  }
</style>


