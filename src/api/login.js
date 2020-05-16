/*
 * @Description: 登录接口
 * @Author: ZHAN HANG
 * @Date: 2020-05-07 14:00:51
 * @LastEditTime: 2020-05-09 11:41:01
 * @LastEditors: ZHAN HANG
 */
import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetSms (data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
  })
}
/**
* 获取用户角色
*/

/**
* 登录
*/
export function Login (data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  })
}

/**
* 注册
*/
export function Register (data) {
  console.log(data)
  return service.request({
    method: "post",
    url: "/register/",
    data
  })
}