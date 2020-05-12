<!--
 * @Description: 头部导航
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:53:30
 * @LastEditTime: 2020-05-12 22:48:49
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="header-wrap">
    <span @click="isNavMenuOpen"
      ><svg-icon iconClass="menu" className="menu header-icon"
    /></span>
  </div>
</template>

<script>
export default {
  name: "Header",
  setup(props) {
    const isNavMenuOpen = () => {};

    return {
      isNavMenuOpen
    };
  }
};
</script>

<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  background: white;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
.header-icon {
  color: #000;
}
</style>