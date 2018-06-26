<template>
  <div class="vue-images">
    <div ref="lightbox" class="lightbox" v-show="isShow" @click="isShow=!modalclose">
      <div v-if="images.length>0">
        <fancybox ref="fancybox" :images="images" :index="index" :reset="!isShow" @play="playImg" @pause="pauseImg"
                  @close="closeImg" @addIndex="nextImg" @decIndex="prevImg" :showclosebutton="true" :showcaption="true"
                  :imagecountseparator="imagecountseparator" :showimagecount="true"></fancybox>
        <paginator :images="images" :activeIndex="index" @changeIndex="changeImg($event)"
                   v-show="showthumbnails"></paginator>
      </div>
    </div>
  </div>
</template>
<script>
  import 'animate.css/animate.min.css';
  import 'lazysizes/lazysizes.min.js';
  import fancybox from './components/fancybox';
  import paginator from './components/paginator';
  import * as mousewheel from './components/js/mousewheel';

  export default {
    name: 'lightbox',
    props: {
      imgs: {  // 图片列表
        type: Array,
        default: []
      },
      modalclose: { // 点击遮罩层是否关闭
        type: Boolean,
        default: false
      },
      keyinput: { // 是否显示后退、前进、esc按钮
        type: Boolean,
        default: true
      },
      mousescroll: {  // 是否允许鼠标滚轮或者手机滑动事件
        type: Boolean,
        default: false
      },
      showclosebutton: {  // 是否显示关闭按钮
        type: Boolean,
        default: true
      },
      showcaption: {  // 是否显示图片描述信息
        type: Boolean,
        default: false
      },
      imagecountseparator: { // 轮播的数量间隔方式（第几张imagecountseparator总数）
        type: String,
        default: ''
      },
      showimagecount: {  // 是否显示图片总数
        type: Boolean,
        default: true
      },
      showthumbnails: {  // 是否显示下方的缩略导航图
        type: Boolean,
        default: true
      },
      currentSelectTitle: {  // 当前选中的图片路径
        type: String,
        default: ''
      }
    },
    computed: {
      images () {
        console.log('I am computed');
        let retArr = [];
        let filterImg = this.imgs.filter((item) => {
          return item.isImg;
        });
        let len = filterImg.length;
        filterImg.forEach((item, index) => {
          item.index = index + 1;
          item.total = len;
          if (item.url === this.currentSelectTitle) {
            this.index = index;
            item.isActive = true;
          } else {
            item.isActive = false;
          }
          retArr.push(item);
        });
        return retArr;
      }
    },
    data () {
      return {
        index: 0,
        playTimer: null,
        isShow: false,
        touchPoint: {
          prev: 0,
          now: 0
        }
      };
    },
    methods: {
      openImg () {
        this._filterImages();
        this.isShow = true;
      },
      playImg () {
        let that = this;
        this.playTimer = window.setInterval(that.nextImg, 2000);
      },
      pauseImg () {
        window.clearInterval(this.playTimer);
      },
      closeImg () {
        this.isShow = false;
      },
      nextImg () {
        console.log('left', this.index);
        if (this.index < this.images.length - 1) {
          this.index++;
        } else {
          this.index = 0;
        }
      },
      prevImg () {
        if (this.index > 0) {
          this.index--;
        }
      },
      changeImg (event) {
        this.isShow = true;
        this.index = event;
      },
      _filterImages () {  //  监听作用
        this.imgs.filter((item) => {
          return item.isImg;
        }).forEach((item, index) => {
          if (item.url === this.currentSelectTitle) {
            this.index = index;
            item.isActive = true;
          } else {
            item.isActive = false;
          }
        });
      },
      keyFun (event) {
        event.preventDefault();
        if (this.keyinput) {
          switch (event.keyCode) {
            case 27:
              this.closeImg();
              break;
            case 37:
              this._handlerRightEvent();
              break;
            case 39:
              this._handlerLeftEvent();
              break;
            default:
              return;
          }
        } else {
          return;
        }
      },
      wheelFun (event) {
        if (this.mousescroll) {
          event.stopPropagation();
          if (event.deltaY > 0) {
            this._handlerLeftEvent();
          } else {
            this._handlerRightEvent();
          }
        } else {
          return;
        }
      },
      touchFun (event) {
        event.stopPropagation();
        this.touchPoint.prev = event.touches[0].clientX;
      },
      endFun (event) {
        event.stopPropagation();
        this.touchPoint.now = event.changedTouches[0].clientX;
        if (this.touchPoint.prev > this.touchPoint.now + 50) {
          this._handlerLeftEvent();
        } else if (this.touchPoint.now > this.touchPoint.prev + 50) {
          this._handlerRightEvent();
        }
      },
      _handlerLeftEvent () {
        let that = this;
        if (this.index < this.images[this.index].total - 1) {
          that.$refs.fancybox.$refs.images[this.index].classList.add('slideOutLeft');
          window.setTimeout(() => {
            that.$refs.fancybox._data.next = false;
            that.$refs.fancybox._data.animation = true;
            that.nextImg();
          }, 375);
        }
      },
      _handlerRightEvent () {
        let that = this;
        if (this.index > 0) {
          that.$refs.fancybox.$refs.images[this.index].classList.add('slideOutRight');
          window.setTimeout(() => {
            that.$refs.fancybox._data.next = true;
            that.$refs.fancybox._data.animation = true;
            that.prevImg();
          }, 375);
        }
      }
    },
    watch: {
      isShow () {
        if (this.isShow) {
          document.body.style.position = 'fixed';
          window.addEventListener('keydown', this.keyFun);
          mousewheel.bindMouseWheel(this.$refs.lightbox, this.wheelFun);
          // this.$refs.lightbox.addEventListener('mousewheel', this.wheelFun);
          this.$refs.lightbox.addEventListener('touchstart', this.touchFun);
          this.$refs.lightbox.addEventListener('touchend', this.endFun);
        } else {
          this.pauseImg();
          document.body.style.position = 'static';
          window.removeEventListener('keydown', this.keyFun);
          mousewheel.unbindMouseWheel(this.$refs.lightbox, this.wheelFun);
          // this.$refs.lightbox.removeEventListener('mousewheel', this.wheelFun);
          this.$refs.lightbox.removeEventListener('touchstart', this.touchFun);
          this.$refs.lightbox.removeEventListener('touchend', this.endFun);
        }
      }
    },
    components: {
      fancybox,
      paginator
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    padding: 2px;
    background: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    font-size: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
