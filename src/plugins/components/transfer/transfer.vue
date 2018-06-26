<template>
  <div :class="prefixCls">
    <list
      :prefixCls = "prefixCls + '-list'"
      :data-source="leftDataSource"
      :checked-key="leftCheckedKey"
      :className="className"
      :title-text="titles[0]"
      :style="listStyle"
      @getCheckedKeys = "getLeftCheckedKey"
      :show-search="showSearch"
      :search-placeholder="searchPlaceholder"
      :handle-clear="handleLeftClear"
    ><slot></slot></list>
    <operation
      :prefix-cls="prefixCls"
      :operations="operations"
      :left-active="leftActive"
      :right-active="rightActive"
      :move-to-left = "moveToLeft"
      :move-to-right="moveToRight"
     ></operation>
     <list
      :prefix-cls = "prefixCls + '-list'"
      :data-source="rightDataSource"
      :checked-key="rightCheckedKey"
      :className="className"
      :title-text="titles[1]"
      :style="listStyle"
      @getCheckedKeys = "getRightCheckedKey"
      :show-search="showSearch"
      :search-placeholder="searchPlaceholder"
      :handle-clear="handleRightClear"
     ><slot></slot></list>
  </div>
 </template>
<script type="text/javascript">
  import config from '../config';
  import list from './list';
  import operation from './operation';
  export default {
    name: config.prefix + 'Transfer',
    props: {
      prefixCls: {
        type: String,
        default: 'ant-transfer'
      },
      targetKeys: Array,
      dataSource: Array,
      className: String,
      operations: Array,
      titles: {
        type: Array,
        default () {
          return ['源列表', '目的列表'];
        }
      },
      listStyle: Object,
      notFoundContent: {
        type: String,
        default () {
          return '列表为空';
        }
      },
      showSearch: {
        type: Boolean,
        default: false
      },
      searchPlaceholder: {
        type: String,
        default () {
          return '请输入搜索内容';
        }
      }
    },
    data () {
      return {
        leftCheckedKeys: [],
        rightCheckedKeys: [],
        leftDataSource: [],
        rightDataSource: [],
        leftCheckedKey: [],
        rightCheckedKey: [],
        leftActive: false,
        rightActive: false,
        leftFilter: '',
        rightFilter: ''
      };
    },
    watch: {
      leftCheckedKeys () {
        this.leftActive = this.leftCheckedKeys.length > 0;
      },
      rightCheckedKeys () {
        this.rightActive = this.rightCheckedKeys.length > 0;
      },
      targetKey () {
        this.splitDataSource();
      }
    },
    created () {
      this.splitDataSource();
    },
    methods: {
      splitDataSource () {
        // 返回的数据 this.dataSource {key:'', title:'', description:'', chosen:''}
        this.leftDataSource = [...this.dataSource];
        this.rightDataSource = [];
        // 如果右边显示的数据不为0，则从左边删除对应的数据，在右边添加上对应的数据
        if (this.targetKeys.length > 0) {
          this.targetKeys.forEach((targetKey) => {
            this.rightDataSource.push(
              this.leftDataSource.filter((data, index) => {
                if (data.key === targetKey) {
                  this.leftDataSource.splice(index, 1);
                  return true;
                }
                return false;
              })[0]);
          });
        }
      },
      getLeftCheckedKey (getLeftCheckedKeys) {
        this.leftCheckedKeys = getLeftCheckedKeys;
      },
      getRightCheckedKey (getRightCheckedKeys) {
        this.rightCheckedKeys = getRightCheckedKeys;
      },
      moveTo (direction) {
        const resultDataSource = [];
        // 获取的数据  {key:'0',title:'内容',description:'',chosen:''}  需要进行分割
        const leftCheckedKeys = this.leftCheckedKeys;
        const rightCheckedKeys = this.rightCheckedKeys;
        const holder = direction === 'right' ? [...leftCheckedKeys] : [...rightCheckedKeys];
        const targetDirection = direction === 'right' ? 'left' : 'right';
        holder.forEach((key) => {
          this[`${targetDirection}DataSource`].forEach((data) => {
            if (key === data.key) {
              this[`${direction}DataSource`].push(data);
              resultDataSource.push(data);
            }
          });
        });
        resultDataSource.forEach((data) => {
          this[`${targetDirection}DataSource`].forEach((value, index) => {
            if (data.key === value.key) {
              this[`${targetDirection}DataSource`].splice(index, 1);
            }
          });
        });
        this[`${targetDirection}CheckedKey`] = [];
      },
      moveToLeft () {
        this.moveTo('left');
      },
      moveToRight () {
        this.moveTo('right');
      },
      handleLeftClear () {
        this.leftFilter = '';
      },
      handleRightClear () {
        this.rightFilter = '';
      },
      handleLeftFilter (value) {
        this.leftFilter = value;
      },
      handleRightFilter (value) {
        this.rightFilter = value;
      }
    },
    components: {
      list,
      operation
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.ant-transfer {
  position: relative;
  line-height: 1.5;
}
.ant-transfer-list-body-search-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 28px;
    padding: 4px;
    width: 100%;
  }
        
</style>