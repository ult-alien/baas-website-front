// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // 箭头函数参数可以不要括号
    'arrow-parens': 0,
    // 不强制生成器函数*的前后空格
    'generator-star-spacing': 0,
    // 开发模式可以使用debugger，生产模式不可以
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 需要分号结尾
    'semi': ['error', 'always'],
    'no-multi-spaces': 0,
    'no-trailing-spaces': 0,
    'no-useless-return': 0
  }
}
