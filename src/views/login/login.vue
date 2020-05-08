<!--
 * @Description:登录页
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:52:06
 * @LastEditTime: 2020-05-08 15:26:28
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="login">
    <el-row class="login-wrap">
      <el-col :span="24">
        <ul v-for="item in navTab" :key="item.id" class="menu-tab">
          <li :class="{ select: item.select }" @click="toggleTab(item)">
            {{ item.text }}
          </li>
        </ul>
      </el-col>
      <!-- 表单开始 -->
      <el-col :span="24">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          label-width="80px"
          class="login-form"
          size="medium"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="请输入密码"
              minlength="6"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="重复密码"
            prop="checkPassword"
            v-if="model == 'register'"
          >
            <el-input
              v-model="loginForm.checkPassword"
              type="password"
              show-password
              placeholder="再次输入密码"
              minlength="6"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input
                  v-model="loginForm.checkCode"
                  minlength="6"
                  maxlength="6"
                ></el-input>
              </el-col>
              <el-col :span="10">
                <el-button type="success" class="block" @click="getCode"
                  >获取验证码</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-button
            type="primary"
            class="block"
            @click="submit()"
            :disabled="submitDisable"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form>
      </el-col>
      <!-- 表单结束 -->
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import { GetSms } from "@/api/login";
import {
  strpscript,
  validateVEmail,
  validateVPassword,
  validateVCheckCode
} from "@/utils/validate";
export default {
  name: "login",
  setup(props, { refs, root }) {
    /**
     * 表单校验
     */
    // 邮箱验证
    let validateEmail = (rule, value, callback) => {
      if (value == "") callback(new Error("邮箱不能为空！"));
      else if (validateVEmail(value)) {
        callback(new Error("邮箱格式有误！"));
      } else {
        callback();
      }
    };
    // 密码验证
    let validatePassword = (rule, value, callback) => {
      console.log(strpscript(value));
      if (value == "") callback(new Error("密码不能为空！"));
      else if (validateVPassword(value)) {
        callback(new Error("密码格式有误！"));
      } else callback();
    };
    // 密码重复验证
    let validateCheckPassword = (rule, value, callback) => {
      console.log(strpscript(value));
      if (value == "") callback(new Error("密码不能为空！"));
      else if (validateVPassword(value)) {
        callback(new Error("密码格式有误！"));
      } else callback();
    };
    // 验证码验证
    let validateCheckCode = (rule, value, callback) => {
      if (value == "") callback(new Error("验证码不能为空！"));
      else if (validateVCheckCode(value)) {
        callback(new Error("验证码格式错误！"));
      } else {
        callback();
      }
    };
    /**
     * 数据区
     */
    // 登录注册切换,select用于判读是否选中
    const navTab = reactive([
      { text: "登录", select: true, type: "login" },
      { text: "注册", select: false, type: "register" }
    ]);
    // 表单绑定数据
    const loginForm = reactive({
      email: "",
      password: "",
      checkPassword: "",
      checkCode: ""
    });
    // 表单验证
    const rules = reactive({
      email: [
        {
          validator: validateEmail,
          trigger: "blur"
        }
      ],
      password: [
        {
          validator: validatePassword,
          trigger: "blur"
        }
      ],
      checkPassword: [
        {
          validator: validateCheckPassword,
          trigger: "blur"
        }
      ],
      checkCode: [
        {
          validator: validateCheckCode,
          trigger: "blur"
        }
      ]
    });
    // 重复密码模块值
    const model = ref("login");
    // 提交按钮的值
    const submitBtn = ref("登录");
    // 按钮禁用状态
    const submitDisable = ref(true);
    /**
     * 声明函数
     */
    const toggleTab = item => {
      // 用一个for循环将navTab的select的值改成相反
      navTab.forEach(element => {
        element.select = false;
      });
      item.select = !item.select;
      model.value = item.type;
    };
    // 登录
    const submit = () => {
      if (submitBtn.value == "登录") console.log("login");
      else console.log("register");
    };
    // 获取验证码
    const getCode = () => {
      if (loginForm.email == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validateVEmail(loginForm.email)) {
        root.$message.error("邮箱格式有误，请重新输入！");
        return false;
      }
      let data = { username: loginForm.email, model: "login" };
      GetSms(data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**
     *  生命周期
     */
    //  挂载完成后
    onMounted(() => {
      console.log(process.env.NODE_ENV);
    });
    return {
      navTab,
      loginForm,
      model,
      toggleTab,
      submit,
      rules,
      submitBtn,
      getCode,
      submitDisable
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
}
.login-wrap {
  width: 400px;
  margin: 0 auto;
}
.menu-tab {
  list-style: none;
  text-align: center;
  display: inline-block;
  li {
    width: 88px;
    line-height: 38px;
    border-radius: 2px;
    cursor: pointer;
  }
}
.login-form {
  margin-top: 20px;
  border: 1px solid grey;
  padding: 20px;
  .block {
    width: 100%;
    display: block;
  }
}
// navTab选中的样式
.select {
  background: rgb(177, 175, 175);
}
</style>
