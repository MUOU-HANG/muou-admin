<!--
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-12 08:35:50
 * @LastEditTime: 2020-05-14 14:54:01
 * @LastEditors: ZHAN HANG
 -->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String, // 接受指定类型
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: $svgSize;
  height: $svgSize;
  margin-right: 10px;
  fill: currentColor; //此属性为更改svg颜色属性设置
}
</style>