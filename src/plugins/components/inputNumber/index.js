/**
 * 为了让数字输入框可以支持小数点精度和可以输入控制，重新写了pl-imput-number.vue 组件，
 * pl-imput-number.vue 是在 input-number-elm.vue（element-ui自带的组件）基础上修改。
 * 如果element-ui自带的组件input-number-elm.vue组件有修改，需要升级，请对比两个文件，所做修改的部分
 */
import InputNumber from './pl-input-number';

InputNumber.install = function (Vue) {
  Vue.component(InputNumber.name, InputNumber);
};

export default InputNumber;
