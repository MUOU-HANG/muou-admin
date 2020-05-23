<!--
 * @Description:layout布局
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:50:13
 * @LastEditTime: 2020-05-15 16:35:59
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <Nav></Nav>
    <Header></Header>
    <Main>
      <router-view />
    </Main>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
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
  setup(props, { root }) {
    /**
     *  computed 监听
     **/
    const menuStatus = computed(() => root.$store.state.app.isCollapse);

    /* 返回数据 */
    return {
      menuStatus // 菜单的收缩与展开
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
