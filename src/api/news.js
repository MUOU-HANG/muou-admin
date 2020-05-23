/*
 * @Description: 新闻接口
 * @Author: ZHAN HANG
 * @Date: 2020-05-07 14:04:41
 * @LastEditTime: 2020-05-23 13:33:39
 * @LastEditors: ZHAN HANG
 */
import service from "@/utils/request";

/**
 * 获取列表
 */
export function GetList (data) {
  return service.request({
    method: "post",
    url: "	/news/getList/",
    data
  })
}

/**
* 新增
*/
export function AddInfo (data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  })

}

/**
 * 删除
 */
export function DeleteInfo (data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  })
}

/**
 * 更新
 */

export function EditInfo (data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  })
}
/**
 * 增加一级标题
 */
export function AddFirstCategory (data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  })
}

/**
 * 获取分类信息
 */
export function GetCategory () {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/"
  })
}

/**
 * 删除一级分类
 */

export function DeleteCategory (data) {
  console.log('object :>> ', data);
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  })
}

/**
 * 增加二级分类
 */
export function AddChildrenCategory (data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data
  })
}

/**
 *修改分类
 */

export function EditCategory (data) {
  return service.request({
    method: "post",
    url: "	/news/editCategory/",
    data
  })
}