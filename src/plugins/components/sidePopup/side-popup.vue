<template>
  <div class="overflow-box">
    <div class="right-box"
           :class="{rightMove:rightMove, leftMove:leftMove, rightMoves:rightMoves, leftMoves:leftMoves}"
           :style="{position:position,width:width,top:top + 'px'}">
        <pl-content-box-title v-if="title" :min="true">{{title}}</pl-content-box-title>
        <div class="content-box" :style="{height:height + 'px'}">
          <slot name="content"></slot>
        </div>
        <pl-content-box-toolbar class="text-center toolbar-box">
          <slot name="toolbar"></slot>
        </pl-content-box-toolbar>
      </div>
    <div class="content-big-box" @click="close()" v-if="this.leftMove">
    </div>
  </div>
</template>
<script>
  import config from '../config';
  export default {
    name: config.prefix + 'RightPopup',
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      container: {
        type: String,
        default: 'body'
      },
      placement: {
        type: String,
        default: 'right'
      },
      width: {
        type: String,
        default: '30%'
      },
      top: {
        type: String,
        default: 0
      }
    },
    computed: {
      position () {
        return this.container === 'body' ? 'fixed' : 'absolute';
      }
    },
    data () {
      return {
        rightMove: true,
        leftMove: false,
        rightMoves: true,
        leftMoves: false,
        GetScreenHeight: 0,
        topHeight: 102,
        height: 0
      };
    },
    methods: {
      close () {
        document.documentElement.style.overflowY = 'scroll';
        if (this.placement === 'right') {
          this.rightMove = true;
          this.leftMove = false;
        }
        if (this.placement === 'left') {
          this.rightMoves = true;
          this.leftMoves = false;
        }
      },
      show () {
        document.documentElement.style.overflowY = 'hidden';
        this.GetScreenHeight = document.documentElement.clientHeight;
        this.height = this.GetScreenHeight - this.topHeight - this.top;
        if (this.placement === 'right') {
          this.rightMoves = false;
          this.leftMove = true;
          this.rightMove = false;
        }
        if (this.placement === 'left') {
          this.leftMoves = true;
          this.rightMoves = false;
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";

  $title-box: 60px;
  $toolbar-box: 50px;
  .overflow-box {
    overflow: hidden;
    z-index: 1200;
  }

  .right-box {
    position: absolute;
    height: 100%;
    background: $dark-white;
    border: 1px solid $border-color;
    box-sizing: border-box;
    z-index: 1500;
  }

  .content-big-box {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: transparent;
  }

  .rightMove {
    right: -31%;
    transition: right .4s linear;
    box-shadow: 2px 2px 5px $border-shadow-color;
  }

  .leftMove {
    right: 0;
    transition: right .4s linear;
    box-shadow: -2px 2px 5px $border-shadow-color;

  }

  .rightMoves {
    left: -31%;
    transition: left .4s linear;
  }

  .leftMoves {
    left: 0;
    transition: left .4s linear;
  }

  .toolbar-box {
    width: 100%;
    border-top: 1px solid $border-color;
    border-bottom: 0;
    position: absolute;
    padding-bottom: 12px;
  }

  .content-box {
    overflow-y: auto;
    background: #fff;
  }

  .title-box {
    height: $title-box;
  }
</style>
