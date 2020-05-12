<!--
 * @Description: main显示区域
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:52:33
 * @LastEditTime: 2020-05-12 07:19:02
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="main-wrap">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: $navMenu;
  top: 75px;
  border: 10px solid #f7f7f7;
}
</style>
