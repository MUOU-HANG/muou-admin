/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-15 16:32:07
 * @LastEditTime: 2020-05-16 09:08:36
 * @LastEditors: ZHAN HANG
 */
import { Login } from "@/api/login";
import { setToken, setUserName, removeToken, removeUserName, getUserName } from "../../utils/app";
// state: 储存初始化数据，取值：this.$store.state.xxx
const state = {
  to_ken: "",
  username: getUserName() || ""
}
// getter： 对state里的数据进行二次处理,类似于computed,取值：this.$store.getters.xxx
const getters = {

}
// 对数据进行计算的方法，在页面中触发时使用,调用：this.$store.commit('方法名',value)，同步，不能回调
const mutations = {
  SET_TOKEN (state, value) {
    state.to_ken = value
  },
  SET_USERNAME (state, value) {
    state.username = value
  }

}
// 处理mutations中已经写好的方法,处理异步操作,可以回调
const actions = {
  // 登录接口
  login ({ commit }, loginData) {
    return new Promise((resolve, reject) => {
      Login(loginData).then((response) => {
        console.log(response)
        let data = response.data.data;
        commit('SET_TOKEN', data.token);
        commit('SET_USERNAME', data.username);
        setToken(data.token)
        setUserName(data.username)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  exit ({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken()
      removeUserName()
      commit("SET_TOKEN", '')
      commit("SET_USERNAME", '')
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
