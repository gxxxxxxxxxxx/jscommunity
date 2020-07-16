<template>
  <div class="home-navigator">
    <div class="header abc">
      <div class="logo">
        <img src="../../assets/logo.png" alt />
      </div>
      <div class="links">
        <span
          class="links_span"
          v-for="(item,index) in links"
          :key="item.name"
          @click="handleSpan(index,item.path)"
          :class="{span_click:index == curActive}"
        >{{item.name}}</span>
      </div>
      <div class="search">
        <div class="left">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
        </div>
        <div class="right">
          <router-link :to="'/edit'">
            <el-button type="primary">发帖</el-button>
          </router-link>
        </div>
      </div>
      <div class="user" v-if="!$store.state.loginState">
        <el-button type="text" @click="clickLogin">登陆</el-button>
        <el-button type="text" @click="clickRegister">注册</el-button>
      </div>
      <div class="user userinfo" v-if="$store.state.loginState" v-popover:popover>
        <el-avatar :size="40" src="../../assets/images/1.jpg"></el-avatar>
      </div>

      <!-- 响应式导航栏 -->
      <div class="navigator_phone_btn">
        <svg
          class="icon"
          aria-hidden="true"
          :class="{rotate_icon:rotateFlag}"
          @click="handleRotate"
        >
          <use xlink:href="#icon-spread-line" />
        </svg>
      </div>
    </div>
    <div class="navigator_phone_list" :class="{navigator_phone_transform:rotateFlag}">
      <router-link
        :to="item2.path"
        class="navigator_phone_item"
        v-for="item2 in links"
        :key="item2.name"
      >
        <span>{{item2.name}}</span>
      </router-link>

      <div class="navigator_phone_item navigator_phone_item_center">
        <el-button type="primary" icon="el-icon-edit" @click="beforeToEdit">发帖</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="clickLogin">登录</el-button>
      </div>
    </div>
    <el-dialog title :visible.sync="centerDialogVisible" :width="curWidth" center>
      <my-login v-if="!isRegister" @isRegisterChange="isRegisterChange"></my-login>
      <my-register v-if="isRegister" @isRegisterChange="isRegisterChange"></my-register>
    </el-dialog>

    <el-popover
      ref="popover"
      placement="bottom-end"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    ></el-popover>
  </div>
</template>

<script>
import { mapState } from "vuex";
const myregister = () => import("@/mycomponents/myregister.vue");
const mylogin = () => import("@/mycomponents/mylogin.vue");

export default {
  computed: {
    centerDialogVisible: {
      get: function() {
        return this.$store.state.centerDialogVisible;
      },
      set: function(val) {
        this.$store.commit("showDialog", val);
      }
    }
  },
  components: {
    "my-register": myregister,
    "my-login": mylogin
  },
  data() {
    return {
      input2: "",
      curActive: 0,
      links: [
        {
          name: "首页",
          path: "/home"
        },
        {
          name: "资讯",
          path: "/news"
        },
        {
          name: "社区",
          path: "/none"
        },
        {
          name: "关于",
          path: "/about"
        }
      ],
      rotateFlag: false,
      curWidth: "500px",
      isRegister: false
    };
  },
  watch: {
    $route(to, from) {
      // const linkRound = this.links.some(item => to.path == item.path);
      // if (!linkRound) {
      //   this.curActive = 9;
      // }
      this.martchIndex(to.path);
    },
    "$store.state.loginState": function(e) {
      if (e == true) {
        this.centerDialogVisible = false;
      }
    }
  },
  created() {
    if (document.body.clientWidth < 500) {
      this.curWidth = "80%";
    }
    this.martchIndex(this.$route.fullPath);
   
  },

  mounted() {
    window.onresize = () => {
      if (document.body.clientWidth < 500) {
        this.curWidth = "80%";
      } else {
        this.curWidth = "500px";
      }
    };
  },

  methods: {
    handleSpan: function(index, path) {
      this.curActive = index;
      if (this.$route.fullPath === path) return;
      this.$router.push(path);
    },
    handleRotate: function() {
      this.rotateFlag = !this.rotateFlag;
    },
    beforeToEdit() {
      if (this.$store.state.loginState) {
        this.$router.push("/edit");
      } else {
        this.centerDialogVisible = true;
      }
    },
    isRegisterChange(e) {
      this.isRegister = e;
    },
    clickLogin() {
      this.isRegister = false;
      this.centerDialogVisible = true;
    },
    clickRegister() {
      this.isRegister = true;
      this.centerDialogVisible = true;
    },
    martchIndex(path) {
      this.links.forEach((item, index) => {
        if (item.path == path) this.curActive = index;
      });
    }
  }
};
</script>

<style lang="less">
.home-navigator {
  background-color: #ffffff;
  box-shadow: 0 20px 40px 0 rgba(114, 144, 179, 0.06);
  padding-bottom: 0;
  .navigator_phone_list {
  }
  .abc {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .logo {
      height: 100%;
      img {
        height: 100%;
      }
    }
    .links {
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        height: 100%;
        font-size: 1rem;
        line-height: 64px;
        text-align: center;
        color: #666;
      }
      span:hover {
        color: black;
        font-weight: 700;
        cursor: pointer;
      }

      .span_click {
        color: black;
        font-weight: 700;
        border-bottom: 2px solid #64aefb;
      }
    }
    .search {
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  /* 响应式样式*/
  @media screen and (min-width: 1201px) {
    .abc {
      width: 1120px;
      margin: 0 auto;
      .logo {
        img {
          width: 4rem;
        }
      }
      .navigator_phone_btn {
        display: none;
      }
    }

    .navigator_phone_list {
      display: none;
    }
  }
  /* css注释：设置了浏览器宽度不小于1201px时 abc 显示1200px宽度 */

  @media screen and (max-width: 1200px) {
    .abc {
      width: 98vw;
      margin: 0 auto;
      .logo {
        img {
          width: 4rem;
        }
      }
      .navigator_phone_btn {
        display: none;
      }
    }
    .navigator_phone_list {
      display: none;
    }
  }
  /* 设置了浏览器宽度不大于1200px时 abc 显示900px宽度 */

  @media screen and (max-width: 901px) {
    .abc {
      width: 98vw;
      margin: 0 auto;
      .logo {
        img {
          width: 4rem;
        }
      }
      .navigator_phone_btn {
        display: none;
      }
    }
    .navigator_phone_list {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .abc {
      width: 98vw;
      margin: 0 auto;
      .logo {
        img {
          width: 4rem;
        }
      }
      .links {
        display: none;
      }
      .search {
        display: none;
      }
      .user {
        display: none;
      }

      .navigator_phone_btn {
        display: inline;
        .icon {
          width: 32px;
          height: 32px;
          margin-top: 16px;
          transform: rotate(90deg);
          cursor: pointer;
          -webkit-transition: -webkit-transform 0.2s ease-out;
          -moz-transition: -moz-transform 0.2s ease-out;
          -o-transition: -o-transform 0.2s ease-out;
          -ms-transition: -ms-transform 0.2s ease-out;
        }
        .rotate_icon {
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
          cursor: pointer;
        }
      }
    }
    .navigator_phone_list {
      display: block;
      .navigator_phone_item {
        opacity: 0;
        height: 0rem;
        border-top: 1px solid #f7f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease-out;

        span {
          font-size: 1rem;
        }
      }

      .navigator_phone_item_center {
        justify-content: space-around !important;
      }
    }

    .navigator_phone_transform {
      .navigator_phone_item {
        opacity: 1;
        height: 3rem;
        border-top: 1px solid #f7f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease-out;
        span {
          font-size: 1rem;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .abc {
      width: 98vw;
      margin: 0 auto;
      .logo {
        img {
          width: 4rem;
        }
      }
    }
  }
  /* 设置了浏览器宽度不大于500px时 abc 显示100px宽度 */
}
</style>