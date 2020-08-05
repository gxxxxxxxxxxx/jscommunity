<template>
  <div class="forumlist-main">
    <div class="content">
      <div class="left_content">
        <div class="forumlist_title">
          <span>最新回复</span>
          <span>最新发表</span>
          <span>热门</span>
        </div>
        <div class="forumlist_lists">
          <router-link
            class="forumlist_lists_item"
            v-for="blog in contents"
            :key="blog._id"
            :to="{name:'Post', query: {pageid:blog._id}}"
          >
            <el-avatar :size="60" src></el-avatar>
            <div class="forumlist_lists_item_right">
              <div class="forumlist_lists_item_right_title">{{blog.title}}</div>
              <div class="forumlist_lists_item_right_info">
                <div class="forumlist_lists_item_right_info_left">
                  <span>{{blog.author}}</span>
                  <span>|</span>
                  <span>@ nanenu</span>
                  <span>最后回复于1分钟前</span>
                </div>
                <div class="forumlist_lists_item_right_info_right">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanjing" />
                  </svg>
                  <span>{{blog.views}}</span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                  <span>2</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="right_content">
        <my-div class="right_content_topic" title>
          <el-avatar :size="90" src></el-avatar>
          <span class="topic_title">{{type.name}}</span>
          <el-button type="primary">关注</el-button>
          <div class="tpic_control">
            <div class="tpic_control_item">
              <div class="title">今日</div>
              <div class="num">0</div>
            </div>
            <div class="tpic_control_item">
              <div class="title">主题</div>
              <div class="num">0</div>
            </div>
            <div class="tpic_control_item">
              <div class="title">贴子数</div>
              <div class="num">{{type.total}}</div>
            </div>
          </div>
        </my-div>

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
      pageNum: 1,
      type: {
        name: "",
        today: 0,
        total: 0,
        comment: 0
      }
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
    async getContents(pageTotal, pageNum, type) {
      const { data } = await this.$http.get("/content/contentlists", {
        params: { pageTotal, pageNum, type }
      });
      this.contents = data.data;
      this.contentTotal = data.total;
      if (data.total === this.contents.length) this.loadmore = false;
    },

    async getBlogTypeLists() {
      const { data } = await this.$http.get("/blog/blogtype");

      this.blogTypeLists = data.data;
      let type_ = this.blogTypeLists.filter(item => {
        return item._id == this.$route.query.typeid;
      });
      this.type.name = type_[0].typename;
      this.type.total = type_[0].blog;

      this.getContents(this.pageTotal, this.pageNum, this.type.name);
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
.forumlist-main {
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

      .forumlist_title {
        height: 4rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        border-bottom: 1px solid #f7f9fa;
        background-color: #ffffff;

        span {
          color: gray;
          font-size: 0.8rem;
          margin: 1rem;
        }
        span:hover {
          cursor: pointer;
          color: #66b1ff;
          font-weight: 600;
        }
      }
      .forumlist_lists {
        background-color: #ffffff;

        .forumlist_lists_item {
          height: 6rem;
          display: flex;
          align-items: center;
          margin: 0 1rem;
          transition: background-color 0.5s;
          .el-avatar {
            width: 100%;
          }
          .forumlist_lists_item_right {
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 1rem;

            .forumlist_lists_item_right_info {
              margin-top: 1rem;
              display: flex;
              justify-content: space-between;
              .forumlist_lists_item_right_info_left {
                span {
                  color: gray;
                  font-size: 0.6rem;
                }
              }
              .forumlist_lists_item_right_info_right {
                span {
                  color: gray;
                  font-size: 0.6rem;
                }
              }
            }
          }
        }
        .forumlist_lists_item:hover {
          background-color: #f7f9fa;
        }
      }
    }
    .right_content {
      flex: 2.2;

      .right_content_topic {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .topic_title {
          color: black;
          font-size: 1rem;
        }
        .el-button {
          width: 8rem;
        }
        .el-avatar,
        .el-button {
          margin: 1rem;
        }

        .tpic_control {
          display: flex;
          width: 100%;
          height: 4rem;
          align-items: center;
          .tpic_control_item {
            flex: 1;
            height: 3rem;
            .title {
              text-align: center;
              color: gray;
              font-size: 0.6rem;
            }
            .num {
              margin-top: 0.5rem;
              text-align: center;
              color: black;
              font-size: 1.5rem;
            }
          }
          .tpic_control_item:nth-child(2) {
            border-left: 1px solid #f7f9fa;
            border-right: 1px solid #f7f9fa;
          }
        }
      }

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
      .my-div_v {
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
  .forumlist-main {
    width: 1120px;
    margin: 0 auto;
  }
}
/* css注释：设置了浏览器宽度不小于1201px时 abc 显示1200px宽度 */

@media screen and (max-width: 1200px) {
  .forumlist-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于1200px时 abc 显示900px宽度 */

@media screen and (max-width: 901px) {
  .forumlist-main {
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
  .forumlist-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于500px时 abc 显示100px宽度 */
</style>