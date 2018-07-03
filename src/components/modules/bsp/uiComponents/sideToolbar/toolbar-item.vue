<template>
  <div class="side-toolbar-item">
    <div class="side-toolbar-item-content-warpper">
      <div class="side-toolbar-item-content">
        <div  class="side-toolbar-item-icon">
          <i :class="icon"></i>
        </div>
        <div  class="side-toolbar-item-text">
          {{text}}
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      icon: String,
      text: String
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../../assets/scss/_variables";
  $item-height: 45px;
  .side-toolbar-item {
    height: $item-height;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 2px;
    position: relative;
    .side-toolbar-item-content-warpper {
      overflow: hidden;
      height: $item-height;
      width: 100%;
      position: relative;
      .side-toolbar-item-content {
        position: relative;
        top: 0px;
        width: 100%;
        transition: top 1s;
        background: #fff;
        cursor: pointer;
        .side-toolbar-item-icon{
          height: $item-height;
          width: 100%;
          background: $primary-bg-color;
          text-align: center;
          font-size: 20px;
          color: #fff;
          line-height: $item-height;
        }
        .side-toolbar-item-text{
          height: $item-height;
          width: 100%;
          background: #eff7ff;
          padding: 5px 5px;
          text-align: center;
        }
    }
    }
    &:hover {
      .toolbar-layer {
        opacity: 1;
        filter: alpha(opacity=100);
        transform: scale(1);
      }
      .side-toolbar-item-content {
         top: -$item-height;
      }
    }
  }
</style>


