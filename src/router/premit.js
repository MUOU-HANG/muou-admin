/*
 * @Description: 路由守卫：用户判断用户是否合法登录。通过获取store里的缓存数据token和username进行判断
 * @Author: ZHAN HANG
 * @Date: 2020-05-15 17:09:38
 * @LastEditTime: 2020-05-22 22:48:33
 * @LastEditors: ZHAN HANG
 */
import router from './index'
import store from '../store/index'
import { getToken, removeToken, removeUserName } from '../utils/app'

const whiteRouter = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path == '/login') {
      removeToken()
      removeUserName()
      store.commit("login/SET_TOKEN", '')
      store.commit("login/SET_USERNAME", '')

      next()
    } else
      next()
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login')
    }
  }
})
