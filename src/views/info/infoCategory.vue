<!--
 * @Description: 信息分类
 * @Author: ZHAN HANG
 * @Date: 2020-05-11 19:10:15
 * @LastEditTime: 2020-05-22 22:01:16
 * @LastEditors: ZHAN HANG
 -->
 <template>
  <div class="category-wrap">
    <div class="category-content">
      <div class="addBtn">
        <el-button type="primary" size="small" @click="showAddCategory"
          >添加一级分类</el-button
        >
      </div>
      <el-row>
        <el-col :span="10">
          <div
            class="category"
            v-for="firstItem in category.categoryItem"
            :key="firstItem.id"
          >
            <h4 @click="toggleChange">
              <svg-icon
                :iconName="data.listDisplay ? 'minus' : 'plus'"
                :className="data.listDisplay ? 'minus' : 'plus'"
              ></svg-icon>
              {{ firstItem.category_name }}
              <div class="operateBtn">
                <el-button
                  type="primary"
                  size="mini"
                  round
                  @click="edit(firstItem)"
                  >编辑</el-button
                >
                <el-button
                  type="success"
                  size="mini"
                  @click="addChildrenCategory(firstItem.id)"
                  round
                  >添加子级</el-button
                >
                <el-button size="mini" @click="del(firstItem.id)" round
                  >删除</el-button
                >
              </div>
            </h4>
            <ul v-show="data.listDisplay" v-if="firstItem.children">
              <li v-for="childItem in firstItem.children" :key="childItem.id">
                {{ childItem.category_name }}
                <div class="operateBtn">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="edit(childItem)"
                    >编辑</el-button
                  >
                  <el-button size="mini" round @click="del(childItem.id)"
                    >删除</el-button
                  >
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="category-edit">
            <h4>分类编辑</h4>
            <div>
              <el-form :model="titleForm">
                <el-form-item
                  label="一级分类名称："
                  v-if="data.first_category_input"
                  ref="titleForm"
                >
                  <el-input
                    v-model="titleForm.titleOne"
                    style="width:300px;"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="二级分类名称："
                  v-if="data.children_category_input"
                >
                  <el-input
                    v-model="titleForm.titleTwo"
                    style="width:300px;"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="addCategory"
                    class="titleBtn"
                    :loading="data.addCategoryLoading"
                    >确定</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

 <script>
// 引入vue3.0的composition-api
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
// 引入MessageBox
import { MessageBox } from "element-ui";
// 引入请求接口
import {
  AddFirstCategory,
  DeleteCategory,
  AddChildrenCategory,
  EditCategory
} from "@/api/news";
// 引入封装的提示函数
import { global } from "@/utils/global";

export default {
  name: "InfoCategory",
  setup(props, { root, refs }) {
    /**
     * 解析函数
     **/
    const { delConfirm, updateComfirm } = global();
    /**
     * 数据区
     **/
    let data = reactive({
      listDisplay: true,
      first_category_input: true,
      children_category_input: true,
      addCategoryLoading: false
    });
    const titleForm = reactive({
      titleOne: "",
      titleTwo: ""
    });
    const category = reactive({
      categoryItem: []
    });
    /**
     * 方法区
     **/
    // 显示一级分类
    const showAddCategory = () => {
      data.first_category_input = true;
      data.children_category_input = false;
    };
    // 提交一级分类
    const addCategory = () => {
      if (!titleForm.titleOne) {
        root.$message.error("一级标题不能为空");
      }
      data.addCategoryLoading = true;
      AddFirstCategory({ categoryName: titleForm.titleOne })
        .then(res => {
          let data = res.data;
          if (data.resCode == 0) {
            root.$message.success(data.message);
            category.categoryItem.push(res.data.data);
          } else {
            root.$message.error(data.message);
          }
        })
        .catch(error => {
          root.$message.error("添加失败");
        });
      titleForm.titleOne = "";
      data.addCategoryLoading = false;
    };
    // 展开与收缩
    const toggleChange = () => {
      data.listDisplay = !data.listDisplay;
    };
    // 分类编辑
    const edit = data => {
      console.log("data :>> ", data);
      updateComfirm({
        data: data,
        fn: doEdit
      });
    };
    const doEdit = data => {
      EditCategory(data)
        .then(res => {
          let data = res.data;
          if (data.resCode == 0) {
            root.$message.success(data.message);
          }
        })
        .catch(error => {
          root.$message.error("失败");
        });
    };
    // 删除一级分类
    const del = data => {
      delConfirm({
        confirmText: "是否删除当前分类，删除后不可恢复！",
        tip: "删除",
        id: data,
        fn: doDel
      });
    };
    const doDel = data => {
      DeleteCategory({ categoryId: data })
        .then(res => {
          let data = res.data;
          if (data.resCode == 0) {
            root.$message.success(data.message);
          }
          // 删除页面上的显示
          let index = category.categoryItem.findIndex(
            categoryItem => categoryItem.id == data
          );
          category.categoryItem.splice(index, 1);
          // 第二种方法
          // let newData = category.categoryItem.filter(
          //   categoryItem => categoryItem.id != data
          // );
          // console.log("newData :>> ", newData);
          // category.categoryItem = newData;
        })
        .catch(error => {
          console.log(error);
        });
    };

    // 增加二级分类
    const addChildrenCategory = data => {
      MessageBox.prompt("输入二级分类", {
        inputPlaceholder: "请输入二级分类",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "输入不能为空"
      }).then(({ value }) => {
        let addChildData = {
          categoryName: value,
          parentId: data
        };
        AddChildrenCategory(addChildData).then(res => {
          console.log("res :>> ", res);
          // 在页面上显示
          getCategoryInfo();
        });
      });
      return false;
      let addChildData = {
        categoryName: titleForm.titleTwo,
        parentId: data
      };
    };
    const getCategoryInfo = () => {
      root.$store
        .dispatch("common/getCategoryInfo")
        .then(res => {
          category.categoryItem = res.data.data;
        })
        .catch(error => {
          console.log("error :>> ", error);
        });
    };
    /*********************************** 生命周期 ************************************************/
    onMounted(() => {
      // getCategory();
      getCategoryInfo();
    });
    /**返回区 */
    return {
      // ref
      data,
      // reactive
      titleForm,
      category,
      // methods
      toggleChange,
      showAddCategory,
      addCategory,
      edit,
      del,
      addChildrenCategory
    };
  }
};
</script>

 <style lang="scss" scoped>
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.category-content {
  padding: 30px 30px 0 30px;
}
.addBtn {
  padding: 20px 0;
  border-bottom: 1px solid #f3f3f3;
}
.category {
  cursor: pointer;
  position: relative;
  line-height: 34px;
  &:before {
    content: " ";
    position: absolute;
    left: 22px;
    top: 0px;
    bottom: 0px;
    width: 32px;
    border-right: 1px dotted #000;
  }
  svg {
    color: #000;
  }
  h4 {
    padding-left: 40px;
  }
  ul {
    list-style: none;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: " ";
      position: absolute;
      left: -9px;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    position: relative;
    .operateBtn {
      display: none;
      position: absolute;
      top: 0;
      right: 20px;
    }
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background: #f3f3f3;
      .operateBtn {
        display: block;
      }
    }
  }
}
.listDisplay {
  display: none;
}
.el-button--mini {
  font-size: 10px !important;
}
.minus,
.plus {
  border: 1px solid red;
  color: red;
}
// 右侧
.titleBtn {
  margin-left: 110px;
}
.category-edit {
  margin-left: 30px;
}
</style>
