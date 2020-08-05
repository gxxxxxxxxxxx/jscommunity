<template>
  <div class="forum-main">
    <div class="content">
      <div class="left_content">
        <div class="forum_title">
          <span>//</span>
          <span>推荐板块</span>
        </div>
        <div class="forum_lists">
          <router-link
            class="forum_item"
            v-for="f in blogTypeLists"
            :key="f.typename"
            :to="{name:'forumlist', query: {typeid:f._id}}"
          >
            <el-avatar :size="80" src="../../assets/images/1.jpg"></el-avatar>
            <div class="forum_item_content">
              <div class="forum_item_content_title">{{f.typename}}</div>

              <div class="forum_item_content_data">
                <span>帖子：{{f.blog}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="right_content">
        <div class="content_hot">
          <div class="content_hot_title">
            <span>//</span>
            <span>社区热门</span>
          </div>
          <div class="content_hot_lists">
            <router-link
              class="content_hot_item"
              :to="{name:'Post', query: {pageid:hot._id}}"
              v-for="hot in contentsHot"
              :key="hot._id"
            >
              <h4>{{hot.title}}</h4>
              <div class="content_hot_item_info">
                <span>{{hot.contenttype}}</span>
                <span>{{hot.sendtime}}</span>
              </div>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "推荐",
          path: "/home"
        },
        {
          name: "专题",
          path: "/news"
        },
        {
          name: "社区推荐",
          path: "/community"
        }
      ],
      curActive: 0,
      curWidth: "500px",
      contents: [],
      contentsHot: [],
      blogTypeLists: [],
      contentTotal: 0,
      loading: false,
      loadmore: true,
      pageTotal: 10,
      pageNum: 1
    };
  },
  created() {
    this.getContentsHot();
    this.getBlogTypeLists();
    if (document.body.clientWidth < 1120) {
      let width = document.body.clientWidth / 2.24;
      this.curWidth = width + "px";
    }
  },
  mounted() {
    window.onresize = () => {
      if (document.body.clientWidth < 1120) {
        let width = document.body.clientWidth / 2.24;
        this.curWidth = width + "px";
      } else {
        this.curWidth = 500 + "px";
      }
    };
  },
  methods: {
    async getBlogTypeLists() {
      const { data } = await this.$http.get("/blog/blogtype");
      this.blogTypeLists = data.data;
    },

    async getContentsHot() {
      const { data } = await this.$http.get("/content/hot");
      this.contentsHot = data.data;
    },
    async loadMore() {
      this.loadmore = false;
      this.loading = true;
      this.pageNum++;
      const { data } = await this.$http.get("/content/contentlists", {
        params: {
          pageTotal: this.pageTotal,
          pageNum: this.pageNum,
          type: "资讯"
        }
      });
      this.contents = this.contents.concat(data.data);
      this.loading = false;
      if (data.total !== this.contents.length) this.loadmore = true;
    }
  }
};
</script>

<style lang="less">
.forum-main {
  padding-bottom: 1rem;
  .el-carousel {
    img {
      width: 100% !important;
    }
    .content_item {
      position: absolute;
      left: 2rem;
      bottom: 5rem;
      z-index: 100;
      font-size: 2rem;
      font-weight: 700;
      color: #f7f9fa;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    background-color: #f7f9fa;
    .left_content {
      flex: 5;
      margin-right: 1rem;

      .forum_title {
        height: 4rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        border-bottom: 1px solid #f7f9fa;
        background-color: #ffffff;
        span:first-child {
          color: #60a6ef;
        }
        span {
          font-weight: 700;
        }
      }
      .forum_lists {
        display: flex;
        flex-wrap: wrap;
        padding-left: 2rem;
        background-color: #ffffff;
        .forum_item {
          width: 45%;
          height: 8rem;
          display: flex;
          align-items: center;
          margin: 1rem;
          .forum_item_content {
            height: 80%;
            width: 80%;
            display: flex;
            justify-content: space-between;

            flex-direction: column;
            padding-left: 1rem;
            padding-top: 1rem;
            .forum_item_content_title {
              flex: 1;
            }

            .forum_item_content_data {
              flex: 1;
              span {
                color: gray;
                font-size: 0.5rem;
              }
            }
          }
        }
        .forum_item:hover {
          background-color: #f7f9fa;
          cursor: pointer;
        }
      }
    }
    .right_content {
      flex: 2.2;
      .content_hot {
        background-color: #ffffff;
        .content_hot_title {
          height: 4rem;
          display: flex;
          align-items: center;
          padding-left: 1rem;
          border-bottom: 1px solid #f7f9fa;
          span:first-child {
            color: #60a6ef;
          }
          span {
            font-weight: 700;
          }
        }

        .content_hot_lists {
          .content_hot_item {
            height: 4rem;
            padding: 0.6rem 1rem 0.6rem 3rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-bottom: 1px solid #f7f9fa;
            transition: background-color 0.5s;
            h4 {
              font-size: 13px;
              font-weight: 400;
              color: #666;
            }
            .content_hot_item_info {
              display: flex;
              justify-content: space-between;

              span {
                font-size: 13px;
                font-weight: 400;
                color: #666;
              }
            }
          }
          .content_hot_item:hover {
            background-color: #f7f9fa;
          }
        }
      }
      .my-div {
        margin-top: 1rem;
        .content_excellent_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 4rem;
          padding: 0 2rem;
          span {
            margin-left: 1rem;
            color: #666;
            font-size: 13px;
          }
        }
      }
    }
  }
}

/* 响应式样式*/
@media screen and (min-width: 1201px) {
  .forum-main {
    width: 1120px;
    margin: 0 auto;
  }
}
/* css注释：设置了浏览器宽度不小于1201px时 abc 显示1200px宽度 */

@media screen and (max-width: 1200px) {
  .forum-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于1200px时 abc 显示900px宽度 */

@media screen and (max-width: 901px) {
  .forum-main {
    width: 98vw;
    .content {
      flex-direction: column;
      .left_content {
        margin-right: 0;
        .content_lists {
          .content_list_item {
            flex-direction: column;
            height: 100%;
            padding: 2rem 0;
            .right_item {
              .content_title {
                h3 {
                  margin: 1rem 0;
                }
              }
              .content_info {
                margin-top: 1rem;
                margin-right: 1rem;
              }
            }
          }
        }
      }
    }
  }
}
/* 设置了浏览器宽度不大于901px时 abc 显示200px宽度 */

@media screen and (max-width: 500px) {
  .forum-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于500px时 abc 显示100px宽度 */
</style>