<style lang="scss">
  @import '../../assets/css/components/menu.scss';
</style>

<template>
  <el-menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
    <template v-for="item in menuList">
      <el-menu-item v-if="item.children.length<=1" :name="item.children[0].name" :key="item.name">
        <i :class="['ivu-icon', 'ivu-icon-' + item.name]"></i>
        <span class="layout-text" :key="item.name">{{ itemTitle(item) }}</span>
      </el-menu-item>

      <el-submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
        <template slot="title">
          <i :class="['ivu-icon', 'ivu-icon-' + item.name]"></i>
          <span class="layout-text">{{ itemTitle(item) }}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item :name="child.name" :key="child.name">
            <i :class="['ivu-icon', 'ivu-icon-' + item.name]"></i>
            <span class="layout-text" :key="child.name">{{ itemTitle(child) }}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'sidebarMenu',
  props: {
    menuList: Array,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: 'dark'
    },
    openNames: {
      type: Array
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit('on-change', active);
    },
    itemTitle(item) {
      // if (typeof item.title === 'object') {
      //   return this.$t(item.title.i18n);
      // } else {
      return item.title;
      // }
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened();
      }
    });
  }
};
</script>
