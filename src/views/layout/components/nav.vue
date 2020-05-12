<!--
 * @Description:侧边导航
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:51:43
 * @LastEditTime: 2020-05-12 22:40:49
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      background-color="transparent"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      router
    >
      <template v-for="(item, index) in routes">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <svg-icon
              :iconClass="item.meta.icon"
              :className="item.meta.icon"
              class="nav-icon"
            />
            <i :class="item.meta.icon"></i>
            <span slot="title" v-if="item.meta">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     *  data 数据
     **/
    //  菜单数据
    const routes = reactive(root.$router.options.routes);
    /* 方法 */
    // const handleOpen=(key, keyPath)=>{
    //   console.log(key, keyPath)
    // },
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    /* 返回 */
    return {
      routes,
      handleOpen,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/main.scss";
#nav-wrap {
  width: $navMenu;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #344a5f;
}
.nav-icon {
  color: white;
}
</style>
