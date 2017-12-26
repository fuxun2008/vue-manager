<style lang="scss">
  @import '../assets/css/login.scss';
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <el-card>
        <p slot="header">
          <i class="ivu-icon ivu-icon-log-in"></i>欢迎登录
        </p>
        <div class="form-con">
          <el-form ref="loginForm" :model="form" :rules="rules">
            <el-form-item prop="userName">
              <el-input
                type="text"
                placeholder="请输入用户名"
                v-model="form.userName">
                <span slot="prepend" class="ivu-icon ivu-icon-person"></span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="form.password">
                <span slot="prepend" class="ivu-icon ivu-icon-locked"></span>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSubmit" type="primary" long>登 录</el-button>
            </el-form-item>
          </el-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      form: {
        userName: 'iview_admin',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          Cookies.set('user', this.form.userName);
          Cookies.set('password', this.form.password);
          this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
          if (this.form.userName === 'iview_admin') {
            Cookies.set('access', 0);
          } else {
            Cookies.set('access', 1);
          }
          this.$router.push({
            name: 'home_index'
          });
        }
      });
    }
  }
};
</script>
