
export default {
  install (Vue, options) {
    // tip组件模板
    const TipComponent = Vue.extend({
      template: `
                <div  :class="placeClass" v-if="show" :style="style" transition="fade">
                    <div class="ant-tooltip-content">
                            <div class="ant-tooltip-arrow"></div>
                            <div class="ant-tooltip-inner"><span  v-html="tip" ></span></div>
                    </div>
                </div>`
    });

    let config = {
      openTrigger: 'mouseenter',
      closeTrigger: 'mouseleave',
      leftFactor: 0.5, // 默认水平位置系数
      topFactor: 0.5, // 默认垂直位置系数
      place: ''
    };

    const getOffset = (el) => {
      let x = 0;
      let y = 0;
      let ele = el;
      while (ele) {
        x += parseInt(ele.offsetLeft, 10);
        y += parseInt(ele.offsetTop, 10);
        ele = ele.offsetParent;
      }
      return {top: y, left: x};
    };

    const position = {
      left: 'left',
      right: 'right',
      top: 'top',
      bottom: 'bottom'
    };

    // 定义指令
    Vue.directive('tooltip', {
      bind: function (el, binding, vnode) {
        el.openTrigger = config.openTrigger;
        el.closeTrigger = config.closeTrigger;
        if (binding.arg === 'focus') {
          el.openTrigger = 'focus';
          el.closeTrigger = 'blur';
        }

        // 获取位置
        el.place = Object.keys(binding.modifiers)[0] || position.top;

        // 设置位置系数
        el.leftFactor = config.leftFactor;
        el.topFactor = config.topFactor;
        if (el.place.toLowerCase().includes(position.left)) {
          el.leftFactor = 0;
        } else if (el.place.toLowerCase().includes(position.right)) {
          el.leftFactor = 1;
        }
        if (el.place.toLowerCase().includes(position.top)) {
          el.topFactor = 0;
        } else if (el.place.toLowerCase().includes(position.bottom)) {
          el.topFactor = 1;
        }

        el.value = binding.value;

        // 显示提示
        const open = () => {
          if (!el) return;
          const offset = getOffset(el);
          const eleWidth = el.offsetWidth;
          const eleHeight = el.offsetHeight;
          if (el.vm) {
            el.vm.$data.style = {
              left: `${offset.left + (eleWidth * el.leftFactor)}px`,
              top: `${offset.top + (eleHeight * el.topFactor)}px`
            };
            el.vm.show = !el.vm.show;
            return;
          }

          el.vm = new TipComponent({
            data: {
              tip: el.value, // 支持html内容
              show: true,
              style: {
                left: `${offset.left + (eleWidth * el.leftFactor)}px`,
                top: `${offset.top + (eleHeight * el.topFactor)}px`
              },
              place: el.place,
              placeClass: 'ant-tooltip ant-tooltip-placement-' + el.place
            }
          }).$mount();
          document.body.appendChild(el.vm.$el);
          el.tooltip = el.vm.$el;
        };

        // 关闭提示
        const close = () => {
          el.vm.show = false;
        };

        // 绑定触发事件
        el.addEventListener(el.openTrigger, open);
        el.addEventListener(el.closeTrigger, close);
        el.addEventListener('click', close);
      },
      update: function (el, binding, vnode) {
        // 值更新时的工作
        el.value = binding.value;
        if (el.vm) {
          el.vm.tip = el.value;
        }
      },
      unbind: function (el, binding, vnode) {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        el.removeEventListener(el.openTrigger, () => {});
        el.removeEventListener(el.closeTrigger, () => {});
        if (el.vm) {
          el.vm.$destroy();
          document.body.removeChild(el.vm.$el);
        }
      }
    });
  }
};
