<template>
  <div>
  <input 
    :placeholder="searchPlaceholder"
    :class="[prefixCls, 'ant-input']"
    @input="handleChange"
    v-model="searchValue">
  <a href="#" 
    v-if="searchValue && searchValue.length > 0"
    :class="`${prefixCls}-action`" 
    @click="clear($event)">
            <i class="anticon icon-closecircleo"></i>
      </a>
    <span
      v-else
      :class="prefixCls + '-action'">
      <i class="anticon icon-search"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    prefixCls: {
      type: String,
      default: ''
    },
    placeholder: Array,
    onChange: Function,  // 输入值后执行的函数
    handleClear: Function, // 点击 X 之后执行的函数
    searchPlaceholder: String
  },
  data () {
    return {
      searchValue: '' // 输入的值
    };
  },
  methods: {
    // 当输入框获取数据时，向list广播一个值，然后list获取进行修改
    handleChange () {
      this.$emit('getFilter', this.searchValue);
    },
    clear (e) {
      e.preventDefault();
      this.handleClear();
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .ant-input {
      position: relative;
      display: inline-block;
      padding: 4px 7px;
      width: 100%;
      height: 28px;
      cursor: text;
      font-size: 12px;
      line-height: 1.5;
      color: #333;
      background-color: #fff;
      background-image: none;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      transition: all .3s;
    }
    .ant-input::-moz-placeholder {
      color: #ccc;
      opacity: 1;
    }
    .ant-input:-ms-input-placeholder {
      color: #ccc;
    }
    .ant-input::-webkit-input-placeholder {
      color: #ccc;
    }
    .ant-input:hover {
      border-color: #5eafed;
    }
    .ant-input:focus {
      border-color: #5eafed;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(54, 155, 233, 0.2);
    }
    .ant-transfer-list-search-action {
        color: #ccc;
        position: absolute;
        top: 2px;
        right: 2px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
    }
    .ant-transfer-list-search-action .anticon {
      transition: all .3s;
      font-size: 12px;
      color: #ccc;
    }
    .ant-transfer-list-search-action .anticon:hover {
      color: #999;
    }
  
</style>