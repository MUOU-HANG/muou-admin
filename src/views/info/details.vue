<!--
 * @Description: 信息管理的详情页
 * @Author: ZHAN HANG
 * @Date: 2020-05-22 22:46:46
 * @LastEditTime: 2020-05-23 13:47:06
 * @LastEditors: ZHAN HANG
-->
<template>
  <div class="detail-wrap">
    <el-form
      ref="detailForm"
      :model="data.detailForm"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="信息分类">
        <el-select v-model="data.detailForm.category" placeholder="请选择">
          <el-option
            v-for="item in data.category"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-input
          v-model="data.detailForm.title"
          style="width:250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload action="" :show-file-list="false" class="avatar-uploader">
          <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker
          v-model="data.detailForm.datetime"
          type="date"
          format="yyyy 年 mm 月 dd 日"
          value-format="yyyy-mm-dd"
          placeholder="选择日期"
          disabled
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容">
        <quill-editor v-model="data.detailForm.content"> </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
// 引入接口模块
import { GetCategory, GetList, EditInfo } from "@/api/news";
// 引入通用的方法
import { timestampToTime } from "@/utils/common";
export default {
  name: "infoDetails",
  setup(props, { root }) {
    console.log("object :>> ", root.$route.query.id);
    /**
     * ! 数据区
     **/
    // 数据
    const data = reactive({
      id: root.$route.query.id, // 当前信息ID
      // 表单数据
      detailForm: {
        category: "",
        title: "",
        datetime: "",
        imageUrl: "",
        content: ""
      },
      category: "" // 信息分类数据
    });
    /**
     * !方法区
     */
    // 获取信息分类
    const getCategory = () => {
      GetCategory().then(res => {
        // 将获取到的信息赋值到category上
        data.category = res.data.data;
      });
    };
    // 获取当前ID的信息
    const getList = () => {
      let requestData = {
        id: data.id,
        pageNumber: 1,
        pageSize: 1
      };
      GetList(requestData).then(res => {
        let resData = res.data.data.data;
        // 将获取到的信息赋值到各表单上
        data.detailForm.category = resData[0].categoryId; // id
        data.detailForm.title = resData[0].title; // title
        data.detailForm.datetime = timestampToTime(resData[0].createDate); // date
        data.detailForm.content = resData[0].content; // content

        console.log("res.data.data :>> ", res.data.data.data[0]);
      });
    };
    // 保存按钮
    const save = () => {
      const requestData = {
        id: data.id,
        categoryId: data.detailForm.category,
        title: data.detailForm.title,
        content: data.detailForm.content
      };
      // 调用接口更新数据
      EditInfo(requestData)
        .then(res => {
          root.$message.success("保存成功");
          // 成功后跳转回信息列表
          root.$router.push({ name: "InfoIndex" });
        })
        .catch(error => {
          root.$message.error("保存失败");
        });
    };
    /**
     * !生命周期
     */
    onMounted(() => {
      getCategory();
      getList();
    });
    /**
     * !返回数据
     */
    return {
      // 数据
      data,
      // 方法
      save
    };
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
.detail-wrap {
  padding: 30px 0 0 30px;
}
// 图片样式
.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 140px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>