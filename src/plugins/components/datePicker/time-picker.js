import Picker from './picker';
import config from '../config';
import {TimePicker} from 'element-ui';
import moment from 'moment';
export default {
  mixins: [TimePicker, Picker],
  name: config.prefix + 'TimePicker',
  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (this.type) {
          return;
        }
        this.type = this.isRange ? 'timerange' : 'time';
        let value = val;
        let format = this.format || 'HH:mm:ss';
        if (format) {
          format = format.replace(/y/g, 'Y').replace(/d/g, 'D');
        }
        if (val) {
          if (this.type === 'timerange') {
            if (Array.isArray(val) && typeof val[0] === 'string') {
              value = [moment(val[0], format)._d, moment(val[1], format)._d];
            }
          } else {
            value = moment(value, format)._d;
          }
        }
        this.currentValue = value;
      }
    }
  }
};
