import md5 from 'md5';
import httpUtil from './http-util';
import {HttpPrefix} from '../../core/constants';
export default {
  /**
   * 加密
   * @param string
   * @returns {*}
   */
  encryptor (string) {
    return md5(string).toLocaleUpperCase();
  },
  /**
   * html转字符串
   * @param str
   * @returns {*}
   */
  htmlToStr (str) {
    /* eslint-disable */
    var RexStr = /\<|\>|\"|\'|\&|　| /g;
    str = str.replace(RexStr,
      function (MatchStr) {
        switch (MatchStr) {
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
          case '"':
            return '&quot;';
          case '\'':
            return '&#39;';
          case '&':
            return '&amp;';
          case ' ':
            return '&ensp;';
          case '　':
            return '&emsp;';
          default:
            break;
        }
      }
    );
    return str;
  },
  /**
   * 下载文件
   * @param url
   * @param paramTemp
   */
  download (url, paramTemp) {
    let param = {...paramTemp};
    param.doPage = false;
    /*
     if (sorting) {
     param.sort = this.getSortStr(sorting);
     }
     */
    let formObj = param;
    if (formObj) {
      let exportFrames = document.getElementById('export-frame');
      if (exportFrames === null || exportFrames.length === 0) {
        let exportFrame = document.createElement('iframe');
        exportFrame.name = 'export-frame';
        exportFrame.hidden = 'hidden';
        exportFrame.id = 'export-frame';
        document.body.appendChild(exportFrame);
      }
      let formStr = document.createElement('form');
      formStr.method = 'post';
      formStr.hidden = 'hidden';
      formStr.action = url;
      formStr.target = 'export-frame';
      for (let key in formObj) {
        if (formObj[key] === null || formObj[key] === undefined) {
          continue;
        }
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formObj[key];
        formStr.appendChild(input);
      }
      let $form = document.body.appendChild(formStr);
      $form.submit();
      $form.remove();
    }
  },
  changeMsgForlog (msg) {
    let url = HttpPrefix.API;
    url = httpUtil.genPath(url);
    return msg.replace('{contextPath}', url);
  }
};
