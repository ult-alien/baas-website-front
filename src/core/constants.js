/**
 * 消息类型
 * @type {{SUCCESS: string, WARING: string, ERROR: string, INFO: string, TOLOGIN: string, RELOAD: string}}
 */
export const MsgType = {
  SUCCESS: 'success', // 成功
  WARING: 'warning', // 警告
  ERROR: 'error', // 错误
  INFO: 'info', // 消息
  TOLOGIN: 'tologin', // 跳转到登录页面
  RELOAD: 'reload' // 刷新
};

/**
 * 请求的前缀
 * @type {{API: string}}
 */
export const HttpPrefix = {
  API: '/api'
};

/**
 * 系统模式
 * @type {{DEVELOPMENT: string, PRODUCTION: string, TEST: string}}
 */
export const SystemMode = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
};

/**
 * 状态
 * @type {{ENABLE: string, UNABLE: string, DELETE: string}}
 */
export const State = {
  ENABLE: 'E',
  UNABLE: 'U',
  DELETE: 'D'
};
/**
* 导入常量类
*
*/
export default {
  State,
  SystemMode,
  MsgType
};
