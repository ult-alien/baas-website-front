<template>
  <div class="container">
    <h3>{{data.itemTitle}}</h3>
    <p class="ql-editor" v-if="data.isNotice">
      <span v-html="data.itemContent"></span>
    </p>
    <p class="content" v-else>
      <pre>{{data.itemContent}}</pre>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/variables";
  .container{
    max-width: 960px;
    h3{
      text-align: center;
      margin-bottom: 20px;
    }
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 26px;
  }
</style>
