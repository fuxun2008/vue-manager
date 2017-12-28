<style lang="scss">
  @import '../assets/css/pages/main.scss';
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList">
        <div slot="top" class="logo-con">
          <img v-show="!shrink" src="../assets/image/logo.jpg" key="max-logo" />
          <img v-show="shrink" src="../assets/image/logo-min.jpg" key="min-logo" />
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink ? '60px' : '200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <el-button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick"><i class="ivu-icon ivu-icon-navicon"></i></el-button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
<!--             <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav> -->
          </div>
        </div>
        <div class="header-avatar-con">
<!--           <full-screen v-model="isFullScreen" @on-change="fullScreenChange"></full-screen>
          <lock-screen></lock-screen>
          <message-tip v-model="mesCount"></message-tip>
          <theme-switch></theme-switch> -->
          <div class="user-dropdown-menu-con">
            <el-row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <el-dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <i class="ivu-icon ivu-icon-arrow-down-b"></i>
                </a>
                <el-dropdown-menu slot="list">
                  <el-dropdown-item name="ownSpace">个人中心</el-dropdown-item>
                  <el-dropdown-item name="loginout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <img :src="avatarPath" style="background: #619fe7;margin-left: 10px;" />
            </el-row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <!-- <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened> -->
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Cookies from 'js-cookie';
import util from 'util/util';
import shrinkableMenu from 'components/menu/menu';

// import tagsPageOpened from 'components/tags-page/tags-page';
// import breadCrumbNav from 'components/breadcrumb/breadcrumb';
// import fullScreen from 'components/fullscreen/fullscreen';
// import lockScreen from 'components/lockscreen/lockscreen';
// import messageTip from 'components/message-tip/message-tip';
// import themeSwitch from 'components/theme-switch/theme-switch';

export default {
  components: {
    shrinkableMenu
    // tagsPageOpened,
    // breadCrumbNav,
    // fullScreen,
    // lockScreen,
    // messageTip,
    // themeSwitch
  },
  data() {
    return {
      shrink: false,
      userName: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.openedSubmenuArr
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    },
    pageTagsList() {
      return this.$store.state.pageOpenedList; // 打开的页面对象
    },
    currentPath() {
      return this.$store.state.currentPath; // 当前面包屑数组
    },
    avatarPath() {
      return localStorage.avatarImgPath;
    },
    cachePage() {
      return this.$store.state.cachePage;
    },
    lang() {
      return this.$store.state.lang;
    },
    menuTheme() {
      return this.$store.state.menuTheme;
    },
    mesCount() {
      return this.$store.state.messageCount;
    }
  },
  watch: {
    '$route'(to) {
      this.setCurrentPageName(to.name);
      const pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.addOpenSubmenu(pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时候用于刷新面包屑
    }
  },
  created() {
    // 显示打开的页面的列表
    this.setOpenedList();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const pathArr = util.setCurrentPath(this, this.$route.name);
      this.updateMenuList();
      if (pathArr.length >= 2) {
        this.addOpenSubmenu(pathArr[1].name);
        this.userName = Cookies.get('user');
        const messageCount = 3;
        this.messageCount = messageCount.toString();
        this.checkTag(this.$route.name);
        this.setMessageCount(3);
      }
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(name) {
      if (name === 'ownSpace') {
        util.openNewPage(this, 'ownspace_index');
        this.$route.push({
          name: 'ownspace_index'
        });
      } else if (name === 'loginout') {
        // 退出登录
        this.logout(this);
        this.clearOpenedSubmenu();
        this.$router.push({ name: 'login' });
      }
    },
    checkTag(name) {
      const openPageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
        return false;
      });

      if (!openPageHasTag) { // 解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
      }
    },
    handleSubmenuChange(val) {
      console.log(val);
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //   return false;
      // } else {
      //   return true;
      // }
      console.log(name);
      return true;
    },
    fullScreenChange(isFullScreen) {
      console.log(isFullScreen);
    },
    ...mapMutations({
      setOpenedList: 'SET_OPENED_LIST',
      setCurrentPageName: 'SET_CURRENT_PAGE_NAME',
      addOpenSubmenu: 'ADD_OPEN_SUBMENU',
      updateMenuList: 'UPDATE_MENU_LIST',
      setMessageCount: 'SET_MESSAGE_COUNT',
      clearOpenedSubmenu: 'CLEAR_OPENED_SUBMENU',
      logout: 'LOGOUT'
    })
  }
};
</script>
