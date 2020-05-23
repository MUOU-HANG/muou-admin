/*
 * @Description:svgIcon
 * @Author: ZHAN HANG
 * @Date: 2020-05-12 08:28:49
 * @LastEditTime: 2020-05-12 16:03:24
 * @LastEditors: ZHAN HANG
 */
import Vue from 'vue';

import SvgIcon from './svgIcon.vue';
Vue.component('svg-icon', SvgIcon)
/* 解析svg文件 */
const req = require.context("./svg", false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)


