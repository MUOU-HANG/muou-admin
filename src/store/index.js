/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:48:34
 * @LastEditTime: 2020-05-19 08:33:58
 * @LastEditors: ZHAN HANG
 */
import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import login from "./modules/login";
import common from "./modules/common";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    login,
    common
  }
})