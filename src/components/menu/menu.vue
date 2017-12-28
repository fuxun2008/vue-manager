<style lang="scss">
  @import '../../assets/css/components/menu.scss';
</style>

<template>
  <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu
      v-show="!shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
    ></sidebar-menu>
    <sidebar-menu-shrink
      v-show="shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-change="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>

<script>
import util from 'util/util';
import sidebarMenu from './sidebar-menu';
import sidebarMenuShrink from './sidebar-menu-shrink';

export default {
  name: 'shrinkableMenu',
  components: {
    sidebarMenu,
    sidebarMenuShrink
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: 'dark',
      validator(val) {
        return util.oneOf(val, ['dark', 'light']);
      }
    },
    beforePush: {
      type: Function
    },
    openNames: {
      type: Array
    }
  },
  computed: {
    bgColor() {
      return this.theme === 'dark' ? '#495060' : '#fff';
    },
    shrinkIconColor() {
      return this.theme === 'dark' ? '#fff' : '#495060';
    }
  },
  methods: {
    handleChange(name) {
      let willPush = true;
      if (this.beforePush !== undefined) {
        if (this.beforePush(name)) {
          willPush = false;
        }
      }

      if (willPush) {
        this.$router.push({ name: name });
      }

      this.$emit('on-change', name);
    }
  }
};
</script>
