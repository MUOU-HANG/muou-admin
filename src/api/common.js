/*
 * @Description: 封装各类函数
 * @Author: ZHAN HANG
 * @Date: 2020-05-18 20:42:18
 * @LastEditTime: 2020-05-22 15:55:43
 * @LastEditors: ZHAN HANG
 */
/**
 * 引入必要的文件
 **/
/* 引入接口请求函数 */
import { GetCategory } from "./news";
import { reactive } from "@vue/composition-api";

/**
 * 封装的函数
 **/
/* 信息模块-获取信息分类 */
export function common () {
  const categoryCommon = reactive({
    item: []
  })
  const getCategory = () => {
    GetCategory()
      .then(res => {
        categoryCommon.item = res.data.data;
      })
      .catch(error => {
        console.log("error :>> ", error);
      });
  };
  return { getCategory, categoryCommon }
}
