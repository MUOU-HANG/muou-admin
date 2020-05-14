<!--
 * @Description:侧边导航
 * @Author: ZHAN HANG
 * @Date: 2020-05-10 19:51:43
 * @LastEditTime: 2020-05-14 20:14:40
 * @LastEditors: ZHAN HANG
 -->
<template>
  <div id="nav-wrap">
    <div class="logo">
      <img src="../../../assets/logo.png" alt="" />
    </div>
    <el-menu
      background-color="transparent"
      text-color="#fff"
      unique-opened
      router
      :collapse="isCollapse"
    >
      <template v-for="(item, index) in routes">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <svg-icon
              :iconClass="item.meta.icon"
              :className="item.meta.icon"
              class="nav-icon"
            />
            <span slot="title" v-if="item.meta">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            :index="subItem.path"
            >{{ subItem.meta.name }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     *  data 数据
     **/
    //  菜单数据
    const routes = reactive(root.$router.options.routes);
    /**
     *  computed 监听
     */
    //  ES6：computed:当只有一条语句时，可以不写{return xxxxxx}，直接写xxxxx
    const isCollapse = computed(() => root.$store.state.isCollapse);
    /*方法 */
    /* 返回 */
    return {
      routes,
      isCollapse // 菜单的展开与收缩
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/main.scss";
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
  }
}
#nav-wrap {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.close {
  #nav-wrap {
    width: $navMenuClose;
  }
  .logo {
    img {
      width: 35px;
      height: 35px;
    }
  }
}
.open {
  #nav-wrap {
    width: $navMenuOpen;
  }
}
.nav-icon {
  color: white;
}
</style>
