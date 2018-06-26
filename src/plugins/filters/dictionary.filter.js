import dictionaryUtil from '../../core/utils/dictionary-util';
export default function (value, codeName) {
  if (!value) {
    return;
  }
  let parentDictionary = dictionaryUtil.getDic(codeName);
  if (!parentDictionary) {
    return;
  }

  value = ',' + value + ',';

  let dictionary = parentDictionary.children;
  let vals = dictionary.filter((item) => {
    let inedxCode = ',' + item.dicCode + ',';
    return value.indexOf(inedxCode) !== -1;
  }).map((item) => {
    return item.dicName;
  }).join(',');
  return vals;
}
