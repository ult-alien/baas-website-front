import httpUtil from '../../../core/utils/http-util';
const fileCss = {
  doc: 'doc',
  docx: 'docx',
  xls: 'xls',
  xlsx: 'xlsx',
  txt: 'txt',
  pdf: 'pdf',
  rar: 'rar',
  zip: 'zip',
  file: 'file-lg'
};
const isImage = (fileName) => {
  let type = fileName.slice(fileName.lastIndexOf('.') + 1).toLocaleLowerCase();
  return '|jpg|png|jpeg|bmp|gif|'.indexOf('|' + type + '|') !== -1;
};
const setFileLogo = (fileName, fileId, HttpPrefix) => {
  let type = fileName.slice(fileName.lastIndexOf('.') + 1).toLocaleLowerCase();
  let imgName = 'file-lg';
  if (isImage(fileName)) {
    return httpUtil.genPath(HttpPrefix + '/file/pub-file/download?id=' + fileId);
  } else if (type in fileCss) {
    imgName = fileCss[type];
  }
  return imgName;
};
const handleFileType = (acceptType, filename) => {
  if (acceptType) {
    let type = filename.slice(filename.lastIndexOf('.') + 1);
    if (type) {
      type = type.toLowerCase();
    }
    let arrowTypeArr = acceptType.split(',');
    let flag = false;
    for (let i = 0; i < arrowTypeArr.length; i++) {
      if (type.indexOf(arrowTypeArr[i]) !== -1) {
        flag = true;
        break;
      }
    }
    return flag;
  }
  return true;
};

export {isImage, setFileLogo, handleFileType};
