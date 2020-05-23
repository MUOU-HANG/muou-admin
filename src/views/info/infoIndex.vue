<!--
 * @Description:信息列表
 * @Author: ZHAN HANG
 * @Date: 2020-05-11 19:00:10
 * @LastEditTime: 2020-05-23 13:48:47
 * @LastEditors: ZHAN HANG
 -->
 <template>
  <div class="info-wrap">
    <el-row :gutter="10">
      <el-form :model="infoSearchForm" ref="form">
        <el-col :span="5">
          <el-form-item
            label="类型"
            class="item-box item-box-first"
            prop="category"
          >
            <el-select
              v-model="infoSearchForm.category"
              placeholder="请选择"
              style="width:110px;"
            >
              <el-option
                v-for="item in options.categoryOptions"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期" prop="date" class="item-box">
            <el-date-picker
              v-model="infoSearchForm.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:240px;"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy 年 MM 月 dd 日"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="关键字" prop="keyword" class="item-box">
            <el-select
              v-model="infoSearchForm.keyword"
              placeholder="ID"
              style="width:80px;"
            >
              <el-option
                v-for="item in options.keyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item class="item-box" prop="content">
            <el-input
              v-model="infoSearchForm.content"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item class="item-box">
            <el-button type="primary" @click="infoSearchBtn">搜索</el-button>
          </el-form-item></el-col
        >
        <el-col :span="2">
          <el-form-item class="item-box">
            <el-button
              type="primary"
              @click="dataList.infoAddDialogStatus = true"
              >新增</el-button
            >
          </el-form-item></el-col
        >
      </el-form>
    </el-row>
    <!-- 表格数据 -->
    <el-table
      :data="options.infoTableData"
      border
      stripe
      @selection-change="deleteSelections"
      class="info-table"
      size="mini"
      align="center"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="标题" align="center" size="mini">
      </el-table-column>
      <el-table-column
        prop="categoryId"
        label="类别"
        width="100px"
        align="center"
        :formatter="toCategory"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="150px"
        align="center"
        :formatter="toDate"
      >
      </el-table-column>
      <el-table-column prop="manger" label="管理人" width="70px" align="center">
      </el-table-column>
      <el-table-column prop="operate" label="操作" align="center" width="170px">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'InfoDetails', query: { id: scope.row.id } }"
          >
            <el-button type="info" plain size="mini">编辑详情 </el-button>
          </router-link>
          <el-button type="danger" @click="del(scope, index)" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row :gutter="30" class="info-pagination">
      <el-col :span="4">
        <el-button @click="delAll">批量删除</el-button>
      </el-col>
      <el-col :span="18">
        <el-pagination
          background
          :page-sizes="[6, 7, 8, 9, 10]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, prev, sizes, pager, next, jumper"
          :total="dataList.total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 新增 -->
    <InfoAddDialog
      :flag.sync="dataList.infoAddDialogStatus"
      :category="options.categoryOptions"
      :getInfo="getInfo"
    />
  </div>
</template>

 <script>
//  vue3.0的相关函数
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
// 引入组件
import InfoAddDialog from "../dialog/infoAdd";
// 封装的提示函数
import { global } from "@/utils/global";
// 封装的普通函数
import { common } from "@/api/common";
// 封装的请求接口函数
import { GetList, GetCategory, DeleteInfo } from "@/api/news";
// 封装的普通方法
import { timestampToTime } from "@/utils/common";
export default {
  name: "InfoIndex",
  components: { InfoAddDialog },
  setup(porps, { root }) {
    /* 解析需要的函数、接口 */
    const { delConfirm } = global(); // 解析提示函数
    const { getCategory, categoryCommon } = common(); //解析普通函数
    /************************************** 数据区 *************************************************/

    let dataList = reactive({
      infoAddDialogStatus: false, // 父组件传给子组件的值
      pageNumber: 1, // 当前页码
      pageSize: 8, // 每页条数
      total: 0,
      deleteId: ""
    });
    // 表单数据
    const infoSearchForm = reactive({
      category: "",
      date: "",
      keyword: "",
      content: "",
      deleteId: ""
    });
    /* 各数组元素 */
    const options = reactive({
      categoryOptions: [], // 分类数组
      infoTableData: [], // 信息列表数组
      // 关键名字数组
      keyOptions: [
        { label: "ID", value: "id" },
        { label: "标题", value: "title" }
      ]
    });
    /************************************** 方法区 *************************************************/
    // 处理数据
    const formaData = () => {
      let requestData = {};
      // 分类
      if (infoSearchForm.category) {
        requestData.categoryId = infoSearchForm.category;
      }
      // 日期
      if (infoSearchForm.date.length > 0) {
        requestData.startTiem = infoSearchForm.date[0];
        requestData.endTime = infoSearchForm.date[1];
      }
      // 关键字
      requestData[infoSearchForm.keyword] = infoSearchForm.content;
      // 分页信息
      requestData.pageNumber = dataList.pageNumber;
      requestData.pageSize = dataList.pageSize;
      return requestData;
    };
    // 获取信息列表
    const getInfo = () => {
      let requestData = formaData();
      GetList(requestData).then(res => {
        options.infoTableData = res.data.data.data;
        dataList.total = res.data.data.data.length;
      });
    };
    // 搜索按钮
    const infoSearchBtn = () => {
      getInfo();
    };
    // 删除信息
    const del = (scope, index) => {
      let id = [scope.row.id];
      delConfirm({
        confirmText: "是否删除该信息，删除后不可恢复！",
        tip: "删除",
        id: id,
        fn: doDel
      });
    };
    const delAll = () => {
      if (!dataList.deleteId || dataList.deleteId == "") {
        root.$message.error("请先选择要删除的消息！");
        return false;
      }
      let id = dataList.deleteId;
      delConfirm({
        confirmText: "是否删除选中的所有信息，删除后不可恢复！",
        tip: "删除",
        id: id,
        fn: doDel
      });
    };
    const deleteSelections = val => {
      let id = val.map(item => item.id);
      dataList.deleteId = id;
    };
    const doDel = data => {
      DeleteInfo({ id: data })
        .then(res => {
          root.$message.success(res.data.message);
          getInfo();
        })
        .catch(error => {
          console.log("erreor :>> ", erreor);
        });
    };
    // 改变每页条数
    const handleSizeChange = val => {
      dataList.pageSize = val;
      getInfo();
    };
    //改变当前页
    const handleCurrentChange = val => {
      dataList.pageNumber = val;
      getInfo();
    };
    // 更改时间显示
    const toDate = (row, cloumn, cellValue, index) => {
      return timestampToTime(row.createDate);
    };
    // 更改分类显示
    const toCategory = (row, cloumn, cellValue, index) => {
      let categoryId = row.categoryId;
      let categoryText = options.categoryOptions.filter(
        item => item.id == categoryId
      );
      return categoryText[0].category_name;
    };
    /************************************** 生命函数 *************************************************/
    onMounted(() => {
      getCategory();
      getInfo();
    });
    watch(
      () => categoryCommon.item,
      value => {
        options.categoryOptions = value;
      },
      getInfo()
    );
    /************************************** 返回区 *************************************************/
    return {
      // ref
      dataList,
      // reactive
      options, // 各类数组元素
      infoSearchForm, // 表单数据
      // 方法
      getCategory, // 获取信息分类
      infoSearchBtn, //搜索按钮
      handleSizeChange, // 改变每页条数
      handleCurrentChange, // 改变当前页
      getInfo, // 获取信息
      del, // 删除
      delAll,
      toDate, // 转换时间格式
      toCategory, // 转换类别
      deleteSelections
    };
  }
};
</script>

 <style lang="scss" scoped>
.info-wrap {
  width: 95%;
  margin: 0 auto;
  text-align: center;
}
.item-box {
  padding: 20px 0 0 0px;
  &.item-box-first {
    padding-left: 10px;
  }
}
.info-pagination {
  margin-top: 30px;
}
</style>
