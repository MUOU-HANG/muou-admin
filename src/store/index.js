/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:48:34
 * @LastEditTime: 2020-05-14 06:48:37
 * @LastEditors: ZHAN HANG
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: 储存初始化数据，取值：this.$store.state.xxx
  state: {
    isCollapse: false,  // 全局数据
  },
  // getter： 对state里的数据进行二次处理,类似于computed,取值：this.$store.getters.xxx
  getters: {

  },
  // 对数据进行计算的方法，在页面中触发时使用,调用：this.$store.commit('方法名',value)
  mutations: {
    // 更改菜单的展开收缩
    SET_COLLAPSE (state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  // 处理mutations中已经写好的方法
  actions: {}
});
