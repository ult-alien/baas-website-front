<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': disabled,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon
    }
  ]" style="position: relative;">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend"  tabindex="0">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <div v-if="tips && tips !== '' && showTips" class="tips-container">
        <div class="tips-content">
          {{tips}}
        </div>
      </div>
      <div v-if="warningTips && warningTips !== ''" style="display: inline-block; position: absolute; top: 0; left: 100%;overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 360px;margin-left: 1em;color: red;">
        <i class="el-icon-warning"></i>&nbsp;{{warningTips}}
      </div>
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon" :style="prefixOffset">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="el-input__suffix"
        v-if="$slots.suffix || suffixIcon || validateState && needStatusIcon"
        :style="suffixOffset">
        <span class="el-input__suffix-inner">
          <slot name="suffix"></slot>
          <i class="el-input__icon"
            v-if="suffixIcon"
            :class="suffixIcon">
          </i>
        </span>
        <i class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="el-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
  import { Input } from 'element-ui';

  export default {
    name: 'ElInput',
    componentName: 'ElInput',
    mixins: [Input],
    props: {
      tips: {
        type: String
      },
      warningTips: {
        type: String
      }
    },
    data () {
      return {
        currentValue: this.value,
        textareaCalcStyle: {},
        prefixOffset: null,
        suffixOffset: null,
        showTips: false
      };
    },
    methods: {
      handleFocus (event) {
        this.showTips = true;
        this.$emit('focus', event);
      },
      handleBlur (event) {
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
        }
        this.showTips = false;
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/variables";
  .tips-container{
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 100%;
    max-width: 180px;
    width: 340px;
    width: fit-content;
    margin-left: 1.2em;
    color: #888;
    border-radius: 0px;
    line-height: 20px;
    background: #fff;
 /*   transform: translateY(-50%);*/
    padding: 7px;
    border: 1px solid $border-color;
    box-shadow: 2px 2px 5px rgba(0,0,0,.2);
    .tips-content{
      &:before{
        content: '';
        height: 0;
        width: 0;
        border-left: 8px solid transparent;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid $border-color;
        position: absolute;
        left: -16px;
        top: 10px;
       /* transform: translateY(-70%);*/
      }
      &:after{
        content: '';
        height: 0;
        width: 0;
        border-left: 8px solid transparent;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #fff;
        position: absolute;
        left: -15px;
        top: 10px;
       /* transform: translateY(-70%);*/
      }
    }
  }
</style>
