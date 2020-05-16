/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-15 17:09:21
 * @LastEditTime: 2020-05-16 08:49:05
 * @LastEditors: ZHAN HANG
 */
import cookie from "cookie_js"

let adminToken = "admin_token";
let adminUserName = "admin_username";
export function getToken () {
  return cookie.get(adminToken)
}
export function getUserName () {
  return cookie.get(adminUserName)
}
export function setToken (value) {
  return cookie.set(adminToken, value)
}

export function setUserName (value) {
  return cookie.set(adminUserName, value)
}

export function removeToken () {
  return cookie.remove(adminToken)
}
export function removeUserName () {
  return cookie.remove(adminUserName)
}