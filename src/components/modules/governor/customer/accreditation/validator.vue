<script>
export default {
  methods: {
    // 统一社会信用代码校验器
    socCrCodeValidator (rule, value, callback) {
      if (!value || value === '') {
        callback(new Error('请输入统一社会信用代码'));
      } else {
        if (!(/(^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$)/.test(value))) {
          callback(new Error('请输入合理的统一社会信用代码'));
        }
        callback();
      }
    },
    // 证件号码校验器
    certNoValidator (rule, value, callback) {
      let certType = rule.certType;
      switch (certType) {
        case 'id_type_1':
          if (!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value))) {
            callback(new Error('请输入正确的证件号码'));
          } else {
            callback();
          }
          break;
        case 'id_type_2':
          if (!(/^[a-zA-Z0-9]{5,17}$/.test(value))) {
            callback(new Error('请输入正确的证件号码'));
          } else {
            callback();
          }
          break;
        case 'id_type_3':
          if (!(/^[HMChmc]{1}([0-9]{8,10})$/.test(value))) {
            callback(new Error('请输入正确的证件号码'));
          } else {
            callback();
          }
          break;
        case 'id_type_4':
          if (!(/^[0-9]{8,10}$/.test(value))) {
            callback(new Error('请输入正确的证件号码'));
          } else {
            callback();
          }
          break;
        default:
          callback(new Error('请输入正确的证件号码'));
      }
    },
    // 银行卡号校验器
    bankNoValidator (rule, value, callback) {
      if (!value || value === '') {
        callback(new Error('银行卡号码不能为空'));
      } else {
        if (!(/^([1-9]{1})\d{1,30}$/.test(value))) {
          callback(new Error('请输入合理的银行卡号码'));
        }
        callback();
      }
    },
    // 验证电话号码
    telephoneValidator (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入合理手机号码'));
        } else {
          let params = {'phoneNo': value};
          if (rule.userId) {
            params.userId = rule.userId;
          }
          if (rule.excludeCurUser) {
            params.excludeCurUser = rule.excludeCurUser;
          }
          this.$api.bsp.accreditation.checkUserExist(params).then(ret => {
            if (ret) {
              callback(new Error('手机号码已注册'));
            } else {
              callback();
            }
          });
        }
      }
    },
    // 验证邮件
    emailValidator (rule, value, callback) {
      if (!value || value === '') {
        callback();
      }
      let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!reg.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    },
    // 检验登录名是否存在
    loginNameValidator (rule, value, callback) {
      if (!value) {
        callback();
      } else {
        this.$api.bsp.user.checkCode(rule.userId, value).then(ret => {
          if (ret.type === 'success' && !ret.msg) {
            callback(new Error('登录名已存在'));
          } else {
            callback();
          }
        });
      }
    },
    checkNum (rule, value, callback) {
      if (value) {
        if (!(/^\d*$/.test(value))) {
          callback(new Error('请输入数字!'));
        } else {
          callback();
        }
      }
      callback();
    }
  }
};
</script>
