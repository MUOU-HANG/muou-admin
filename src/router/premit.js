/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-15 17:09:38
 * @LastEditTime: 2020-05-16 08:52:51
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
