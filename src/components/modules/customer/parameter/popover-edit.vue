<template>
  <el-popover
    placement="bottom-start"
    :title="title"
    v-model="visible"
    trigger="click"
    @show="handleShow"
    @hide="handleHide">
    <div class="popover-content-wrapper">
      <div  ref="parameter-from-wrapper" class="parameter-from-wrapper"></div>
      <div class="popover-content-toolbar">
        <el-button type="default" size="mini" @click="close">取消</el-button>
        <el-button type="primary" size="mini" @click="sure">确定</el-button>
      </div>
    </div>
    <span slot="reference"><slot></slot></span>
  </el-popover>
</template>

<script>
  import Vue from 'vue';
  const helper = {
    'String': {
      parser (value) {
        return value + '';
      },
      formatter (value) {
        return value;
      }
    },
    'Boolean': {
      parser (value) {
        return value === 'true';
      },
      formatter (value) {
        return value + '';
      }
    },
    'Number': {
      parser (value) {
        if (!value) {
          value = 0;
        }
        return Number(value);
      },
      formatter (value) {
        return value + '';
      }
    },
    'Array': {
      parser (value) {
        if (value) {
          return value.split(',');
        } else {
          return [];
        }
      },
      formatter (value) {
        return value.join(',');
      }
    }
  };
  export default {
    props: {
      value: {
        default: '',
        type: String
      },
      type: {
        default: 'String',
        type: String
      },
      title: {
        default: '',
        type: String
      },
      template: {
        require: true,
        type: String
      },
      popoverKey: {
        default: '',
        type: String
      },
      displayTemplate: {
        default: '',
        type: String
      }
    },
    data () {
      return {
        visible: false,
        formComponent: null
      };
    },
    methods: {
      sure () {
        this.formComponent.$refs['form'].validate((valid) => {
          this.formComponent.$refs['form'].validate((valid) => {
            if (valid) {
              let value = helper[this.type] ? helper[this.type].formatter(this.formComponent.$data.form.value) : helper['String'].formatter(this.formComponent.$data.form.value);
              this.$emit('save', this.popoverKey, value);
              this.close();
            } else {
              return false;
            }
          });
        });
      },
      close () {
        this.visible = false;
      },
      handleHide () {
        this.formComponent.$destroy();
        this.formComponent = null;
      },
      handleShow () {
        if (this.formComponent) {
          this.formComponent.$destroy();
        }
        this.$refs['parameter-from-wrapper'].innerHTML = `<div id="parameter-from"></div>`;
        console.info(this.type);
        let value = helper[this.type] ? helper[this.type].parser(this.value) : helper['String'].parser(this.value);
        let template = `<el-form label-width="0px"  :model="form" ref="form">${this.template}</el-form>`;
        let FormComponent = Vue.extend({
          data () {
            return {
              form: {
                value: value
              }
            };
          },
          template: template
        });
        this.formComponent = new FormComponent().$mount('#parameter-from');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/scss/variables";
  .popover-content-wrapper{
    margin: -10px;
    padding-top: 10px;
    .parameter-from-wrapper{
      padding: 20px 20px;
      border-top:1px solid $border-color ;
      .el-form-item{
        margin-bottom: 0px !important;
      }
    }
    .popover-content-toolbar{
      padding: 10px;
      text-align: center;
      border-top:1px solid $border-color ;
    }
  }
</style>


