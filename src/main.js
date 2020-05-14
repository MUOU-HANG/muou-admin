/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:48:34
 * @LastEditTime: 2020-05-13 22:02:24
 * @LastEditors: ZHAN HANG
 */
import Vue from "vue";
import VueComposition from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './icons';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueComposition);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
