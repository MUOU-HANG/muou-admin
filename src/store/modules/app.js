/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-15 16:32:07
 * @LastEditTime: 2020-05-15 16:53:26
 * @LastEditors: ZHAN HANG
 */
// state: 储存初始化数据，取值：this.$store.state.xxx
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,  // 全局数据
}
// getter： 对state里的数据进行二次处理,类似于computed,取值：this.$store.getters.xxx
const getters = {

}
// 对数据进行计算的方法，在页面中触发时使用,调用：this.$store.commit('方法名',value)，同步，不能回调
const mutations = {
  // 更改菜单的展开收缩
  SET_COLLAPSE (state) {
    state.isCollapse = !state.isCollapse;
    // H5本地存储
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  }
}
// 处理mutations中已经写好的方法,处理异步操作,可以回调
const actions = {
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
