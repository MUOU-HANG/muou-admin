/*
 * @Description:通用的方法
 * @Author: ZHAN HANG
 * @Date: 2020-05-22 16:34:37
 * @LastEditTime: 2020-05-22 16:38:45
 * @LastEditors: ZHAN HANG
 */

export function timestampToTime (params) {
  const now = new Date(params * 1000);
  const year = now.getFullYear();
  const month = now.getMonth();
  const data = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return year + "-" + month + "-" + data + "  " + hour + ":" + minute + ":" + second
}
