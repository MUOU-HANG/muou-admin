/*
 * @Description: validate.js 文件，各类验证规则
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 17:05:13
 * @LastEditTime: 2020-05-08 15:17:37
 * @LastEditors: ZHAN HANG
 */
/* 特殊字符过滤 */
export function strpscript (str) {
  var patter = new RegExp(
    "[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"
  );
  var rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.sub(i, 1).replace(patter, "");
  }
  return rs;
}
/* 验证邮箱 */
export function validateVEmail (value) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return !reg.test(value) ? true : false;
}

/* 验证密码 6-20位，包含大小写字母和数字*/
export function validateVPassword (value) {
  let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/;
  return !reg.test(value) ? true : false;
}

/* 验证验证码 6位验证码，包含数字字母*/
export function validateVCheckCode (value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}