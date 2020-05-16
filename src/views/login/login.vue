<!--
 * @Description:login.vue 登录页
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:52:06
 * @LastEditTime: 2020-05-15 22:08:46
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
                <el-button
                  type="success"
                  class="block"
                  @click="getCode"
                  :disabled="checkCodeBtn.status"
                  >{{ checkCodeBtn.text }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-button
            type="primary"
            class="block"
            @click="submit('loginForm')"
            :disabled="submitBtnStatus"
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
import { GetSms, Register, Login } from "@/api/login";
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
    /***************************************************************************************
     ************************************ 数据区********************************************
     */
    // 登录注册切换,select用于判读是否选中
    const navTab = reactive([
      { text: "登录", select: true, type: "login" },
      { text: "注册", select: false, type: "register" }
    ]);
    // 表单绑定数据
    const loginForm = reactive({
      email: "2725780178@qq.com",
      password: "Dancer3918",
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
    // 验证码按钮禁用状态
    const checkCodeBtn = reactive({
      status: false,
      text: "发送验证码"
    });
    // 重复密码模块值
    const model = ref("login");
    // 提交按钮的值
    const submitBtn = ref("登录");
    // 按钮禁用状态
    const submitBtnStatus = ref(false);
    // 倒计时的值
    const timer = ref(null);
    /*******************************************************************
     ************************* 方法声明 ********************************
     *******************************************************************/
    // tab的切换
    const toggleTab = item => {
      // 用一个for循环将navTab的select的值改成相反
      navTab.forEach(element => {
        element.select = false;
      });
      item.select = !item.select;
      model.value = item.type;
      // 跳转回来后默认清空
      resetForm("loginForm");
      // 还原验证码按钮的状态和文字
      resetCheckBtn(false, "发送验证码");
      // 清楚定时器
      clearCountDown();
    };
    // 清空表单
    const resetForm = formName => {
      refs[formName].resetFields();
    };
    // 提交按钮
    const submit = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          model.value === "login" ? login() : register();
        }
      });
    };
    // 登录
    const login = () => {
      let loginData = {
        username: loginForm.email,
        password: loginForm.password,
        code: loginForm.checkCode,
        module: "login"
      };
      // 使用vuex进行登录
      root.$store.dispatch("login/login", loginData).then(res => {
        console.log("登录成功！");
        root.$router.push({ name: "Console" });
      });
      // .then(response => {
      //   cnosole.log("login-success");
      //   console.log(response);
      // root.$massage.success("登录成功！");
      //   root.$router.push("/console");
      // })
      // .catch(error => {
      //   root.$message.error("登录失败！");
      // });
      // 传统方式
      // Login(loginData)
      //   .then(response => {
      //     root.$massage.success("登录成功！");
      //     root.$router.push("/console");
      //   })
      //   .catch(error => {
      //     root.$message.error("登录失败！");
      //   });
    };
    // 注册
    const register = () => {
      console.log("register");
      let requestData = {
        username: loginForm.email,
        password: loginForm.password,
        code: loginForm.checkCode,
        module: "register"
      };
      console.log(requestData);
      Register(requestData)
        .then(response => {
          root.$message.success("注册成功！");
          toggleTab(navTab[0]);
          // 还原验证码按钮的状态和文字
          resetCheckBtn(false, "发送验证码");
          // 清楚计时器
          clearCountDown();
        })
        .catch(error => {
          root.$message.error("注册失败！");
        });
    };
    // 还原验证码按钮的状态和文字 status:按钮状态，text：按钮文字
    const resetCheckBtn = (status, text) => {
      checkCodeBtn.status = status;
      checkCodeBtn.text = text;
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
      // 修改验证码按钮的状态
      resetCheckBtn(true, "发送中...");
      let data = { username: loginForm.email, module: model.value };
      // 延时时间
      setTimeout(() => {
        GetSms(data)
          .then(response => {
            // 调用计时器
            root.$message.success("验证码发送成功！");
            submitBtnStatus.value = false;
            countDown(5);
            console.log(response);
          })
          .catch(error => {
            resetCheckBtn(false, "发送验证码");
            console.log(error);
          });
      }, 1000);
    };
    // 倒计时
    const countDown = number => {
      if (timer.value) {
        clearInterval(timer.value);
      }
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          resetCheckBtn(false, "重新发送");
        } else {
          checkCodeBtn.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    // 清除倒计时
    const clearCountDown = () => {
      clearInterval(timer.value);
    };
    /**
     *  生命周期
     */
    //  挂载完成后
    onMounted(() => {
      console.log(process.env.NODE_ENV);
    });
    return {
      navTab, // 登录注册切换
      loginForm, // 登录表单
      resetForm, // 清除表单内容
      model, // 模块值
      toggleTab, // 点击
      submit, // 提交按钮
      rules, // 验证规则
      submitBtn, // 提交按钮的方法
      getCode, // 获取验证码的方法
      submitBtnStatus, // 提交按钮的值
      checkCodeBtn, // 验证码的值
      timer // 倒计时的值
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
