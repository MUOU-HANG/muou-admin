/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 14:48:34
 * @LastEditTime: 2020-05-12 19:49:59
 * @LastEditors: ZHAN HANG
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"; // 主页
import Login from "../views/login/login.vue"; // 登录
import Layout from "../views/layout/layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    hidden: true,
    meta: {
      name: "主页",
    },
    component: Home
  },
  {
    path: "/login",
    hidden: true,
    name: "Login",
    meta: {
      name: "登录",
    },
    component: Login
  },
  {
    path: "/console",
    name: "Console",
    redirect: "/index",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: Layout,
    children: [{
      path: "/index",
      name: "Index",
      meta: {
        name: "首页",
        icon: ""
      },
      component: (() => import("../views/console/console.vue"))
    }]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: Layout,
    children: [{
      path: "/infoIndex",
      name: "InfoIndex",
      meta: {
        name: "信息列表",
      },
      component: (() => import("../views/info/infoIndex.vue"))
    },
    {
      path: "/infoCategory",
      name: "InfoCategory",
      meta: {
        name: "信息分类",
      },
      component: (() => import("../views/info/infoCategory.vue"))
    }]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
    children: [{
      path: "/userIndex",
      name: "UserIndex",
      meta: {
        name: "用户中心",
      },
      component: (() => import("../views/user/userIndex.vue"))
    },
    {
      path: "/userList",
      name: "UserList",
      meta: {
        name: "用户列表",
      },
      component: (() => import("../views/user/userList.vue"))
    }]
  },
];

const router = new VueRouter({
  routes
});

export default router;
