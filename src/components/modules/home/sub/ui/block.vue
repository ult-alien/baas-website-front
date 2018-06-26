<template>
  <div class="block-wrapper">
    <slot name="title"></slot>
    <div class="block-card-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .block-wrapper{
    min-height: 200px;
    .block-card-container{
      &:after{
        display: table;
        content: "";
        clear: both;
      }
    }
    /**
    *  mobile
    */
    @media only screen
    and (max-device-width: 1024px) {
      .block-card-container{
        display: block;
        > * {
          margin-top: 20px;
          &:first-child{
            margin-top: 0;
          }
        }
      }
    }
  }
</style>


