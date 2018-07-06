<template>
  <pl-content-box>
    <pl-page-nav>
      <div slot="nav-tip">
        <i class="text-primary anticon icon-infocirlceo"></i>&nbsp;<small class="text-muted">点击日期即可设置节假日或取消设置为节假日
      </small>
      </div>
    </pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <el-date-picker
          style="width: 150px;"
          :editable="false"
          :clearable="false"
          v-model="pickerValue"
          type="month"
          @change="changeDatePicker"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM-dd"
          placeholder="选择月">
        </el-date-picker>
      </div>
      <div class="pull-right">
        <el-button type="default"  @click="toPrev">上月</el-button>
        <el-button type="default"  @click="goNext">下月</el-button>
        <el-button type="primary" :disabled="disabled" @click="toToday">今天</el-button>
      </div>
    </pl-content-box-toolbar>
    <full-calendar ref="fcal" style="padding: 10px;" :events="fcEvents" lang="zh" @dayClick.self="dayClick" @changeMonth="changeMonth"
                   @eventClick="eventClick">
    </full-calendar>
  </pl-content-box>
</template>
<script>
  // 优化显示
  import fullCalendar from 'vue-fullcalendar'; // 可以全局使用
  import moment from 'moment';
  import {MsgType} from 'core/constants';
  export default {
    components: {
      'full-calendar': fullCalendar
    },
    data () {
      return {
        fcEvents: [],
        disabled: 'disabled',
        isDisabled: true,
        title: '',
        pickerValue: new Date()
      };
    },
    methods: {
      dayClick (day, event) {
        if (day) {
          let that = this;
          this.$api.bsp.holidayConf.setHolidayStatus({
            dateValue: moment(day).format('YYYY-MM-DD'),
            isHoliday: '1'
          }).then((response) => {
            if (response.type === MsgType.SUCCESS) {
              that.setFcEvents(day);
            }
          }).catch(() => {
          });
        }
        // console.info(moment(day).format('YYYY-MM-DD'));
      },
      changeMonth (start, end, current) {
        this._isCurrentMonth(current);
        this.title = moment(current).format('YYYY年MM月');
      },
      /* moreClick (day, event, jsevent) {
       console.log('moreClick', day, event, jsevent);
       }, */
      eventClick (event, jsEvent, pos) {
        // console.info('eventClick', event, jsEvent, pos);
        let that = this;
        this.$api.bsp.holidayConf.cancelHoliday({dateValue: event.start, isHoliday: '1'}).then((response) => {
          if (response.type === MsgType.SUCCESS) {
            that.fcEvents = that.fcEvents.filter(item => {
              return item.start !== event.start;
            });
          }
        });
      },
      toPrev () {
        this.$refs.fcal.$children[0].goPrev();
      },
      _isCurrentMonth (date) {
        this.pickerValue = date;
        const nowDate = moment().format('YYYY-MM');
        const changeMonth = moment(date).format('YYYY-MM');
        if (moment(nowDate).isSame(changeMonth)) {
          this.disabled = 'disabled';
          this.isDisabled = true;
        } else {
          this.disabled = null;
          this.isDisabled = false;
        }
      },
      goNext () {
        this.$refs.fcal.$children[0].goNext();
      },
      toToday () {
        const today = moment().format('YYYY-MM-DD');
        this.$refs.fcal.emitChangeMonth(null, null, today, today);
      },
      setFcEvents (dateValue, item = {}) {
        item.start = moment(dateValue).format('YYYY-MM-DD');
        item.title = '节假日';
        item.cssClass = 'holiday-family';
        this.fcEvents.push(item);
      },
      changeDatePicker () {
        this.$refs.fcal.emitChangeMonth(null, null, this.pickerValue, this.pickerValue);
      }
    },
    created () {
      let that = this;
      this.$api.bsp.holidayConf.queryHoliday().then((response) => {
        response.forEach((item) => {
          that.setFcEvents(item.dateValue, item);
        });
      });
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .holiday-family {
    position: absolute;
    top: 0;
    width: 100%;
    color: #B4B4B4 !important;
    font-size: 16px !important;
    background: rgba(188, 232, 241, 0.3) !important;
    height: 100px !important;
    margin: 0 auto !important;
    text-align: center !important;
    padding-top: 30px !important;
  }

  .full-calendar-body {
    margin-top: 5px !important;
  }

  .fc-button-group {
    display: inline-block;
    margin-right: .75em;
  }

  .fc-button {
    outline: none;
    box-sizing: border-box;
    height: 2.1em;
    padding: 0 .6em;
    font-size: 1em;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 4px;
    background: #f5f5f5 linear-gradient(to bottom, #fff, #e6e6e6) repeat-x;
    border-color: rgba(0, 0, 0, .1) rgba(0, 0, 0, .1) rgba(0, 0, 0, .25);
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .75);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .2), 0 1px 2px rgba(0, 0, 0, .05);
    &:hover {
      color: #333;
      color: #333;
      text-decoration: none;
      background: #e6e6e6 0 -15px;
      -webkit-transition: background-position .1s linear;
      -moz-transition: background-position .1s linear;
      -o-transition: background-position .1s linear;
      transition: background-position .1s linear
    }
    &:active {
      background: #ccc none;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, .15), 0 1px 2px rgba(0, 0, 0, .05);
    }
  }

  .fc-state-disabled {
    opacity: .65;
    filter: alpha(opacity=65);
    box-shadow: none;
    background: #e6e6e6 none;
    color: #333;
  }

  .fc-prev-button {
    margin: 0 0 0 -1px;
  }

  .prev-month {
    display: none;
  }

  .next-month {
    display: none;
  }

  .title {
    display: none;
  }

  .events-day {
    position: relative;
    min-height: 100px !important;
    &.today {
      .day-number {
        opacity: 1 !important;
        color: red;
        font-weight: bold;
      }
    }
  }

  .header-center {
    font-weight: bold;
  }

  .picker-active {
    &:hover{
      .el-input__inner {
        outline: none;
        border-color: #41b883;
      }
    }
  }
</style>
