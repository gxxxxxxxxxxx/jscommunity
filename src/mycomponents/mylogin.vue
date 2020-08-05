<template>
  <div class="content_login">
    <div class="options">
      <div class="options_login_info">
        <span>账号:</span>
        <el-input v-model="loginInfo.username" placeholder></el-input>
      </div>

      <div class="options_login_info">
        <span>密码:</span>
        <el-input v-model="loginInfo.userpwd" type="password" :show-password="false" placeholder></el-input>
      </div>

      <div class="register">
        <span @click="isRegisterChange">还没有账号？点击注册</span>
      </div>

      <div class="login_btn">
        <el-button type="primary" @click="userLogin">登录</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "my-login",
  created() {
    var obj = new WxLogin();
    console.log(obj);
  },
  data() {
    return {
      loginInfo: {
        username: "",
        userpwd: "",
      },
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    isRegisterChange() {
      this.$emit("isRegisterChange", true);
    },
    async userLogin() {
      const { data } = await this.$http.post("/user/login", this.loginInfo);

      if (data.status !== 200) {
        return this.$message({
          showClose: true,
          message: data.msg,
          type: "error",
        });
      }
      let user = {
        Authorization: "Bearer " + data.token,
        username: data.username,
      };
      this.changeLogin(user);
      //登陆成功后触发动作
      if (this.$store.state.toPath) {
        this.$router.push(this.$store.state.toPath);
        this.$store.commit("savaToPath", "");
      }
      location.reload();
    },
  },
};
</script>

<style lang="less">
.content_login {
  width: 100%;
  .options {
    .options_login_info {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      justify-content: flex-end;
      margin-right: 20%;

      .el-input {
        width: 70%;
        margin-left: 1rem;
      }
    }
    .register {
      display: flex;
      flex-direction: row-reverse;
      margin-right: 20%;
      span {
        cursor: pointer;
      }
      span:hover {
        color: black;
      }
    }
    .login_btn {
      display: flex;
      justify-content: center;
      margin-top: 4rem;
      .el-button {
        width: 50%;
      }
    }
  }
}
</style>