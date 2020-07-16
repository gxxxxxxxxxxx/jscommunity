<template>
  <div class="content_register">
    <div class="options">
      <div class="options_login_info">
        <span>账号:</span>
        <el-input v-model="loginInfo.username" placeholder></el-input>
      </div>

      <div class="options_login_info">
        <span>密码:</span>
        <el-input v-model="loginInfo.userpwd" type="password" :show-password="false" placeholder></el-input>
      </div>

      <div class="options_login_info">
        <span>确认密码:</span>
        <el-input v-model="userpwdConfirm" type="password" :show-password="false" placeholder></el-input>
      </div>

      <div class="register">
        <span @click="isRegisterChange">已有账号？前去登录</span>
      </div>

      <div class="login_btn">
        <el-button type="primary" @click="userRegister">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "my-login",
  data() {
    return {
      loginInfo: {
        username: "",
        userpwd: ""
      },
      userpwdConfirm: ""
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    isRegisterChange() {
      this.$emit("isRegisterChange", false);
    },
    async userRegister() {
      if (
        !this.loginInfo.username ||
        !this.loginInfo.userpwd ||
        !this.userpwdConfirm
      )
        return this.$message({
          showClose: true,
          message: "注册信息不能为空",
          type: "error"
        });

      const { data } = await this.$http.post("/user/register", this.loginInfo);
      if (data.status == 400)
        return this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      console.log(data);
      if (data.status == 200) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "success"
        });
        let user = {
          Authorization: "Bearer " + data.token,
          username: data.username
        };
        this.changeLogin(user);
      }
    }
  }
};
</script>

<style lang="less">
.content_register {
  width: 100%;
  .options {
    .options_login_info {
      display: flex;
      align-items: center;
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
      span {
        margin-right: 20%;
        cursor: pointer;
      }
      span:hover {
        color: black;
      }
    }
    .login_btn {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      .el-button {
        width: 50%;
      }
    }
  }
}
</style>