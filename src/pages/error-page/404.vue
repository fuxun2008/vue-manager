<style lang="scss">
  @import '../../assets/css/pages/404.scss';
</style>

<template lang="html">
  <div class="error404">
    <div class="error404-body-con">
      <el-card>
        <div class="error404-body-con-title">4<span><i class="ivu-icon ivu-icon-ios-navigate-outline"></i></span>4</div>
        <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
        <div class="error404-btn-con">
          <el-button @click="goHome" size="medium" style="width: 200px;" type="text">返回首页</el-button>
          <el-button @click="backPage" size="medium" style="width: 200px;margin-left: 40px;" type="danger">返回上一页</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script type="es6">
export default {
  name: 'Error404',
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
}
</script>
