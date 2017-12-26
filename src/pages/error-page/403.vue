<style lang="scss">
  @import '../../assets/css/pages/403.scss';
</style>

<template lang="html">
  <div class="error403">
    <div class="error403-body-con">
      <el-card>
        <div class="error403-body-con-title">4<span class="error403-0-span"><i class="ivu-icon ivu-icon-android-lock"></i></span><span class="error403-key-span"><i class="ivu-icon ivu-icon-ios-bolt"></i></span></div>
        <p class="error403-body-con-message">You don't have permission</p>
        <div class="error403-btn-con">
          <el-button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</el-button>
          <el-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error403',
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({
        name: 'home_index'
      });
    }
  }
};
</script>
