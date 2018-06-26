<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .wrapper{
    margin: 25px 0 0 0;
    overflow: hidden;
    > *{
      width: 22%;
      float: left;
      margin-right: 1%;
      &:first-child{
        width: 30%;
      }
    }
  }
</style>


