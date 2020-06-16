<template>
  <div class="home-navigator">
    <div class="header abc">
      <div class="logo">
        <img src="../../assets/logo.png" alt />
      </div>
      <div class="links">
        <span
          v-for="(item,index) in links"
          :key="item.name"
          @click="handleSpan(index)"
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
      <div class="user">
        <el-button type="text">登陆</el-button>
        <el-button type="text">注册</el-button>
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
      <div class="navigator_phone_item">
        <span>首页</span>
      </div>

      <div class="navigator_phone_item">
        <span>资讯</span>
      </div>

      <div class="navigator_phone_item">
        <span>社区</span>
      </div>

      <div class="navigator_phone_item">
        <span>关于</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
          path: "/community"
        },
        {
          name: "关于",
          path: "/about"
        }
      ],
      rotateFlag: false
    };
  },
  methods: {
    handleSpan: function(index) {
      this.curActive = index;
    },
    handleRotate: function() {
      this.rotateFlag = !this.rotateFlag;
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