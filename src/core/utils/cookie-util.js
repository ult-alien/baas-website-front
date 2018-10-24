export default {

  getCookies () { // 获取cookie
    if (!document.cookie) {
      return null;
    }
    let cookies = {};
    let cookieArray = document.cookie.split(';');
    cookieArray.forEach(function (cookie) {
      let parts = cookie.split('=');
      cookies[ parts[ 0 ].trim() ] = (parts[ 1 ] || '').trim();
    });
    console.log(cookies);
    return cookies;
  },
  getCookieByName (name) { // 获取cookie
    let cookies = this.getCookies();
    if (!cookies) {
      return null;
    }
    if (name in cookies) {
      return cookies[name];
    } else {
      return null;
    }
  },
  setCookie (name, value, expiredays) { // 设置cookie,增加到vue实例方便全局调用
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
  },
  delCookie (name) { // 删除cookie
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookies(name);
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
    }
  }

};
