/*
 * @Description: 登录接口
 * @Author: ZHAN HANG
 * @Date: 2020-05-07 14:00:51
 * @LastEditTime: 2020-05-08 15:12:39
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

/**
* 注册
*/