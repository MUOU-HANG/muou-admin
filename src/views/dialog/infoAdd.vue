<!--
 * @Description:info新增的弹窗
 * @Author: ZHAN HANG
 * @Date: 2020-05-16 13:54:53
 * @LastEditTime: 2020-05-23 10:00:50
 * @LastEditors: ZHAN HANG
-->
<template>
  <el-dialog
    title="新增"
    :visible.sync="infoAddDialogVisible"
    @close="close"
    @opened="opened"
    width="30%"
  >
    <el-form :model="infoAddForm" inline>
      <el-form-item label="类型">
        <el-select v-model="infoAddForm.category" placeholder="请选择">
          <el-option
            v-for="item in options.categoryOptions"
            :key="item.value"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="infoAddForm.title"></el-input>
      </el-form-item>
      <el-form-item label="概要">
        <el-input v-model="infoAddForm.summary"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="infoAddDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="infoAdd" @loading="loading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch, onMounted } from "@vue/composition-api";
import { AddInfo } from "@/api/news";
export default {
  name: "infoAdd",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { root, emit }) {
    /************************************ 数据区 **************************************/
    // 新增表单是否显示
    const infoAddDialogVisible = ref(false);
    const loading = ref(false);
    //
    // 表单数据
    const infoAddForm = reactive({
      title: "",
      type: "",
      summary: ""
    });
    const options = reactive({
      categoryOptions: []
    });
    /************************************ 方法区 **************************************/
    const close = () => {
      infoAddDialogVisible.value = false;
      emit("update:flag", false);
      emit("getInfo");
    };
    const opened = () => {
      options.categoryOptions = props.category;
    };
    //增加信息
    const infoAdd = () => {
      let requestData = {
        category: infoAddForm.category,
        title: infoAddForm.title,
        content: infoAddForm.summary
      };
      console.log("requestData :>> ", requestData);
      loading.value = true;
      AddInfo(requestData)
        .then(res => {
          root.$message.success(res.data.message);
          infoAddForm.title = "";
          infoAddForm.content = "";
          infoAddForm.summary = "";
          loading.value = false;
        })
        .catch(error => {
          root.$message.success(error.data.message);
        });
      infoAddDialogVisible.value = false;
    };
    /************************************ 生命周期 **************************************/
    onMounted(() => {});
    // 监听
    watch(() => {
      infoAddDialogVisible.value = props.flag;
    });
    /************************************ 返回区 **************************************/
    return {
      infoAddDialogVisible, //新增弹窗
      infoAddForm, // 新增表单
      close,
      opened,
      options,
      infoAdd,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
</style>