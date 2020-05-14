<!--
 * @Description:记录项目开发的流程、步骤以及碰到的问题
 * @Author: ZHAN HANG
 * @Date: 2020-05-09 11:55:38
 * @LastEditTime: 2020-05-14 14:57:16
 * @LastEditors: ZHAN HANG
 -->
# 第一部分：登录注册
  ## 实现的功能
  ` 1. 表单验证：判断是否为空 `
  ```
  1) 在form中增加ref属性
  2) 提交时验证是否正确
  ```
  ` 2. 格式验证：判断输入的格式是否正确 `
  ```
  1) 增加validate.js文件，在文件内写入验证规则。并return出来
  2) 在vue文件中引入validate中的各验证规则，如：import {validateVEmail,} from "@/utils/validate";
  3) 使用方法调用验证规则
     let validateEmail = (rule, value, callback) => {
      if (value == "") callback(new Error("邮箱不能为空！"));
      else if (validateVEmail(value)) {
        callback(new Error("邮箱格式有误！"));
      } else {
        callback();
      }
    };
  4) 在rules中调用方法
    const rules = reactive({
      email: [{
          validator: validateEmail,
          trigger: "blur"
        }]
    });
  ```
  ## 碰到的问题
  ` 1. 跨域问题:在vue.config.js中增加proxy，将服务器地址填入target中。解决代码如下： `
  ```
  proxy: {
      '/devApi': {
        // 目标 API 地址
        target: "http://www.web-jshtml.cn/productapi",
        // 如果要代理 websockets
        ws: false,
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/devApi': ''
        }
      }
    },
  ```
  ` 2. refs不能获取到表单的值:原因是没有调用传入的参数（refs[formName]）。解决代码如下： `
  ```
  const submit = ((formName) => {
      refs[formName].validate(valid => {
        if (valid) {
          model.value === "login" ? login() : register();
        }
      });
    });
  ```
  ` 3. setup(prop, context)方法的使用 `
  ``
  1) 需要引入context的方法才能使用，可以使用解析的方式，如：setup(props, { refs, root }) {}，也可以使用setup(props, context) {}的方式
  2) 定义一个普通数据使用ref，如：const model = ref("login");
     定义一个对象数据用reactive，如：
     const checkCodeBtnStatus = reactive({
      status: false,
      text: "发送验证码"
    });
  3) 使用ref和reactive是需要先引入 import { reactive, ref, onMounted } from "@vue/composition-api";
  ``
# 第二部分 后台首页的制作
  ## 实现的功能
  `1. layout布局、导航效果`
  `2. svgIcon引入外部图标`
  ## 碰到的问题
  `1. svgIcon的使用`
  `2. require.context()无法找到指定目录`
  ```
  1) 查看正则表达式是否正确，不能有开头标识。在icons文件夹下的index.js文件中对于svg文件的正则表达式
  2) vue.config.js的相关配置文件需要正确
  ```
  `3. svg的引入与使用`
  ```
  1) 抽离成组件（svgIcon.vue），在index中引入组件并找到svg文件夹中的svg图片并渲染到组件中
  2) 在index.js中解析svg图片。代码如下
      /* 解析svg文件 */
    const req = require.context("./svg", false, /\.svg$/)
    const requireAll = requireContext => {
      return requireContext.keys().map(requireContext)
    }
      requireAll(req)
  3) 在需要用的地方进行引用
  ```
  `4. VUEX的使用`
  ```
  1) 在store/index.js中存入数据
  2) 使用this(root).$store.state/getters/commit.xxx来获取
  3) 当要使用state中的数据做初始值时，要用computed来监听数据。当内部数据发生变化时，可以直接在外部同步改变
  ```
  `5. 菜单右侧有白边`、
  ```
  修改element的默认样式，在.el-menu中通过设置 border-right 将右侧的边框取消
  ```