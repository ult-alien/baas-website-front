<template>
  <span ref="template-wrapper"></span>
</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      template: String,
      scope: Object,
      alias: String,
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        templateComponent: null
      };
    },
    watch: {
      scope: {
        handler () {
          if (this.scope && this.alias) {
            this.genComponent();
          }
        },
        deep: true
      }
    },
    methods: {
      genComponent () {
        let data = {};
        let template = `<span>${this.template}</span>`;
//        console.info(this.scope);
        if (this.scope && this.alias) {
          data[this.alias] = this.scope;
//          console.info(this.scope);
          if (!this.scope.parmValue || !this.scope.parmValue.trim()) {
            template = !this.readonly ? '<span>点击编辑参数</span>' : '<span>暂未设置</span>';
          }
        }
        let Component = Vue.extend({
          data () {
            return data;
          },
          template: template
        });
        // let id = Math.random();
        this.$refs['template-wrapper'].innerHTML = `<span id="parameter-value"></span>`;
        this.templateComponent = new Component().$mount('#parameter-value');
      }
    },
    mounted () {
      this.genComponent();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


