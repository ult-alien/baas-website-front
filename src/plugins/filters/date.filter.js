import moment from 'moment';
export default function (value, newFormat, oldFormat = 'YYYYMMDD HH:mm:ss', target) {
  if (value && newFormat) {
    return moment(value, oldFormat).format(newFormat);
  }
  return value;
}
