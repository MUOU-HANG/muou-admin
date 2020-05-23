/*
 * @Description:封装一些常用的方法，如提示框等
 * @Author: ZHAN HANG
 * @Date: 2020-05-16 16:46:11
 * @LastEditTime: 2020-05-22 17:24:57
 * @LastEditors: ZHAN HANG
 */
import { MessageBox } from "element-ui";
// import { ref } from "@vue/composition-api";
export function global () {
  const delConfirm = ((params) => {
    MessageBox.confirm(params.confirmText + params.id, params.tip || "提示", {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      .then(() => {
        params.fn && params.fn(params.id || '')
      })
      .catch((error) => {
        MessageBox({
          type: "info",
          message: "已取消删除"
        });
        params.catchFn && params.catchFn()
      });
  })
  const updateComfirm = ((params) => {
    console.log('params.category_name :>> ', params);
    MessageBox.prompt("输入修改后的分类标题", {
      inputValue: params.data.category_name
    }).then(({ value }) => {
      let data = {
        id: params.id,
        categoryName: value
      }
      params.fn && params.fn(data)
    }).catch((error) => {
      console.log('error :>> ', error);
    })
  })

  return {
    delConfirm,
    updateComfirm
  }
}

