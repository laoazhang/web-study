/*
 * Eslint config file
 * Documentation: https://eslint.org/docs/user-guide/configuring/
 * Install the Eslint extension before using this feature.
 */
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    // ES2020 版本才支持 ?. 可选链操作符
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  extends: 'eslint:recommended',

  rules: {},
}
