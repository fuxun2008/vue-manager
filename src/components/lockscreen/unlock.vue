<style lang="scss">
  @import '../../assets/css/pages/unlock.scss';
</style>
<template>
  <transition name="show-unlock">
    <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
      <div @click="handleClickAvator" class="unlock-avatar-con" :style="{marginLeft: avatarLeft}">
        <img class="unlock-avatar-img" :src="avatarPath">
        <div class="unlock-avatar-cover">
          <span><Icon type="unlocked" :size="30"></Icon></span>
          <p>解锁</p>
        </div>
      </div>
      <div class="unlock-avatar-under-back" :style="{marginLeft: avatarLeft}"></div>
      <div class="unlock-input-con">
        <div class="unlock-input-overflow-con">
          <div class="unlock-overflow-body" :style="{right: inputLeft}">
            <input type="password" ref="inputEle" v-model="password" class="unlock-input" placeholder="密码痛登录密码" />
            <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock" class="unlock-btn"><i class="ivu-icon ivu-icon-key"></i></button>
          </div>
        </div>
      </div>
      <div class="unlock-locking-tip-con">已锁定</div>
    </div>
  </transition>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'Unlock',
  data() {
    return {
      avatarLeft: '0px',
      inputLeft: '400px',
      password: '',
      check: null
    };
  },
  props: {
    showUnlock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatarPath() {
      return localStorage.avatarImgPath;
    }
  },
  methods: {
    validator() {
      return true; // 你可以在这里写密码验证方式，如发起ajax请求将用户输入的密码this.password与数据库用户密码对比
    },
    handleClickAvatar() {
      this.avatarLeft = '-180px';
      this.inputLeft = '0px';
      this.$refs.inputEle.focus();
    },
    handleUnlock() {
      if (this.validator()) {
        this.avatarLeft = '0px';
        this.inputLeft = '400px';
        this.password = '';
        Cookies.set('locking', '0');
        this.$emit('on-unlock');
      } else {
        this.$Message.error('密码错误,请重新输入。如果忘了密码，清除浏览器缓存重新登录即可，这里没有做后端验证');
      }
    },
    unlockMousedown() {
      this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn';
    },
    unlockMouseup() {
      this.$refs.unlockBtn.className = 'unlock-btn';
    }
  }
};
</script>
