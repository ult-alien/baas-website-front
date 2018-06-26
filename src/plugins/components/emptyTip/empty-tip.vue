<template>
  <div class="text-center text-tip" style="padding: 30px;">
    <div v-if="type">
      <span style="font-size: 30px;"><i :class="iconClass"></i></span>
      <br>
      <small class="text-muted">{{text}}</small>
    </div>
    <div v-else="">
      <div style="width:220px; margin: 0px auto;">
        <img src="./img/empty-1.png" width="220px" v-if="iconType === '1'">
        <img src="./img/empty-2.png" width="220px" v-else>
      </div>
      <br>
      <div>{{text}}<slot></slot></div>
    </div>
  </div>
</template>

<script>
  import config from '../config';
  const iconClass = {
    info: 'anticon icon-infocirlce text-info',
    error: 'anticon icon-closecircle text-danger',
    warning: 'anticon icon-exclamationcircle text-warning',
    success: 'anticon icon-checkcircle text-success'
  };
  export default {
    name: config.prefix + 'EmptyTip',
    props: {
      type: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: '暂时没有数据！',
        required: true
      },
      iconType: {
        type: String,
        default: '1'
      }
    },
    computed: {
      iconClass () {
        return iconClass[this.type];
      }
    }

  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


