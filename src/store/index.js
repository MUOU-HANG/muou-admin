/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:48:34
 * @LastEditTime: 2020-05-15 16:47:41
 * @LastEditors: ZHAN HANG
 */
import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import login from "./modules/login";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    login
  }
})