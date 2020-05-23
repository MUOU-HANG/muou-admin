/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:48:34
 * @LastEditTime: 2020-05-23 11:11:19
 * @LastEditors: ZHAN HANG
 */
import Vue from "vue";
import VueComposition from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import "./icons";
import "./router/premit"
import VueQuillEditor from 'vue-quill-editor'
//引入富文本css
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueComposition);
//富文本编辑器添加实例
Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
