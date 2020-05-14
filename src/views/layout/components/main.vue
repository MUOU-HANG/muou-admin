<!--
 * @Description: main显示区域
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:52:33
 * @LastEditTime: 2020-05-14 20:19:15
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="main-wrap">
    <div class="content"><router-view /></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main-wrap {
  width: 100%;
  height: 97vh;
  padding-top: $layoutHeader + 10;
  padding-right: 10px;
  background: #f0f0f0;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  background: #fff;
  @include webkit(box-sizing, border-box);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
}
// 菜单收缩与展开
.open {
  #main-wrap {
    padding-left: $navMenuOpen + 10;
  }
}
.close {
  #main-wrap {
    padding-left: $navMenuClose + 10;
  }
}
</style>
