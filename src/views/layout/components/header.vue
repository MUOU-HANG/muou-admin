<!--
 * @Description: 头部导航
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:53:30
 * @LastEditTime: 2020-05-14 20:17:56
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuCollapse">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right">
      <div class="headImg">
        <img src="../../../assets/logo.png" alt="" />
      </div>
      <div class="user-info">
        管理员
      </div>
      <div class="header-icon">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "Header",
  setup(props, { root }) {
    /* 方法 */
    const navMenuCollapse = () => {
      root.$store.commit("SET_COLLAPSE");
    };
    return {
      navMenuCollapse // 控制菜单的收缩与展开
    };
  }
};
</script>

<style lang="scss" scoped>
#header-wrap {
  height: 75px;
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenuOpen;
  background: white;
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  .pull-right {
    display: inline-flex;
    position: fixed;
    top: 0px;
    right: 10px;
    .headImg {
      height: 40px;
      margin: auto 0;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  .user-info {
    font-size: 14px;
    padding: 0 32px;
    border-right: 1px solid #edcdec;
    + .header-icon {
      padding: 0 28px;
    }
  }
}
// 菜单收缩与展开
.open {
  #header-wrap {
    left: $navMenuOpen;
  }
}
.close {
  #header-wrap {
    left: $navMenuClose;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
</style>