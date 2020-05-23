/*
 * @Description: vuex方法封装常用函数
 * @Author: ZHAN HANG
 * @Date: 2020-05-19 08:22:28
 * @LastEditTime: 2020-05-19 11:31:49
 * @LastEditors: ZHAN HANG
 */

import { GetCategory } from "@/api/news";
const actions = {
  //  获取分类信息
  getCategoryInfo () {
    return new Promise((resolve, reject) => {
      GetCategory().then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
export default {
  namespaced: true,
  actions
}