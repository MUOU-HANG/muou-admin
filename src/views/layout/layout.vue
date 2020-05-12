<!--
 * @Description:layout布局
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:50:13
 * @LastEditTime: 2020-05-10 20:14:15
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div>
    <el-container>
      <el-aside>
        <!-- Aside content -->
        <Nav></Nav>
      </el-aside>
      <el-container>
        <el-header>
          <!-- Header content -->
          <Header></Header>
        </el-header>
        <el-main>
          <!-- Main content -->
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./components/header";
import Nav from "./components/nav";
import Main from "./components/main";
export default {
  name: "layout",
  components: {
    Header,
    Nav,
    Main
  },
  setup() {}
};
</script>

<style>
</style>
