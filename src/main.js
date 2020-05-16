/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:48:34
 * @LastEditTime: 2020-05-16 09:22:39
 * @LastEditors: ZHAN HANG
 */
import Vue from "vue";
import VueComposition from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import './icons';
import "./router/premit"
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueComposition);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
