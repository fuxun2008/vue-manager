<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;" :key="index">
        <el-dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
          <el-button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <i :class="['ivu-icon', 'ivu-icon-' + item.icon]"></i>
          </el-button>
          <el-dropdown-menu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <el-dropdown-item :name="child.name" :key="i">
                <i :class="['ivu-icon', 'ivu-icon-' + child.icon]"></i>
                <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
          <el-button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <i :class="['ivu-icon', 'ivu-icon-' + item.icon]"></i>
          </el-button>
          <el-dropdown-menu style="width: 200px;" slot="list">
            <el-dropdown-item :name="item.children[0].name" :key="'d' + index">
              <i :class="['ivu-icon', 'ivu-icon-' + item.icon]"></i>
              <span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sidebarMenuShrink',
  props: {
    menuList: {
      type: Array
    },
    iconColor: {
      type: String,
      default: 'white'
    },
    menuTheme: {
      type: String,
      default: 'dark'
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
  }
};
</script>
