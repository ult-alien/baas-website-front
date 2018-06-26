import constantUtil from '../../core/utils/constant-util';
export default function (vaule, key) {
  let constant = constantUtil.getConstant(key);
  return constant[vaule];
}
