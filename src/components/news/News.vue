<template>
  <div class="news-main">
    <div class="content">
      <div class="left_content">
        <div class="links">
          <span
            v-for="(item,index) in links"
            :key="item.name"
            @click="handleSpan(index)"
            :class="{span_click:index == curActive}"
          >{{item.name}}</span>
        </div>

        <div class="content_lists">
          <router-link
            :to="{name:'Post', query: {pageid:item._id}}"
            class="content_list_item"
            v-for="item in contents"
            :key="item._id"
          >
            <img
              :src="item.pic?item.pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3403839654,2547274831&fm=26&gp=0.jpg'"
              alt
            />
            <div class="right_item">
              <div class="content_title">
                <h3>{{item.title}}</h3>
                <span>{{item.introduction}}</span>
              </div>
              <div class="content_info">
                <div class="content_info_left">
                  <el-avatar
                    size="small"
                    src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
                  ></el-avatar>
                  <span class="user">{{item.author}}</span>
                  <span>|</span>
                  <span>{{item.contenttype}}</span>
                </div>
                <div class="content_info_rignt">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanjing" />
                  </svg>
                  <span>{{item.views}}</span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                  <span>2</span>
                </div>
              </div>
            </div>
          </router-link>

          <div class="sk" v-if="loading">
            <div class="left">
              <div class="img"></div>
            </div>
            <div class="right_item">
              <div class="title">
                <div class="h3"></div>
                <div class="span"></div>
              </div>
              <div class="info">
                <div class="left_"></div>
                <div class="right_"></div>
              </div>
            </div>
          </div>

          <div class="loadmore" v-if="loadmore">
            <div class="text_border" @click="loadMore">加载更多</div>
          </div>
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

        <my-div class="my-div" title="社区精华">
          <div class="content_excellent_item">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xingbiao" />
            </svg>
            <span>[开奖啦]「威锋13周年」App打卡，敢来我敢送你敢来我敢送送</span>
          </div>
        </my-div>
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
      contentTotal: 0,
      loading: false,
      loadmore: true,
      pageTotal: 10,
      pageNum: 1
    };
  },
  created() {
    this.getContentsHot();
    this.getContents(this.pageTotal, this.pageNum, "资讯");
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
.news-main {
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
      background-color: #ffffff;
      .links {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 4rem;
        border-bottom: 1px solid #f7f9fa;
        span {
          margin: 2rem;
          color: #666;
        }
        .span_click {
          font-weight: 700;
          color: #62abf6;
        }
        span:hover {
          font-weight: 700;
          color: #62abf6;
          cursor: pointer;
        }
      }
      .content_lists {
        background-color: #ffffff;

        .sk {
          height: 10rem;
          display: flex;
          padding: 0 1rem;
          justify-content: space-between;
          align-items: center;
          .left {
            flex: 2;
            .img {
              width: 200px;
              height: 134px;
              border-radius: 5px;
              background: rgb(194, 207, 214);
              background-image: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.15) 25%,
                transparent 25%
              );
              background-size: 20rem 20rem;
              animation: skeleton-stripes 1s linear infinite;
            }
          }
          .right_item {
            margin-left: 1rem;
            flex: 7;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 134px;
            .title {
              .h3 {
                width: 100%;
                height: 2rem;
                border-radius: 5px;
                background: rgb(194, 207, 214);
                background-image: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.15) 25%,
                  transparent 25%
                );
                background-size: 20rem 20rem;
                animation: skeleton-stripes 1s linear infinite;
              }
              .span {
                margin-top: 1rem;
                width: 100%;
                height: 1.5rem;
                border-radius: 5px;
                background: rgb(194, 207, 214);
                background-image: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.15) 25%,
                  transparent 25%
                );
                background-size: 20rem 20rem;
                animation: skeleton-stripes 1s linear infinite;
              }
            }
            .info {
              display: flex;
              justify-content: space-between;
              .left_,
              .right_ {
                margin-left: 0.5rem;
                height: 1.5rem;
                width: 8rem;
                border-radius: 5px;
                background: rgb(194, 207, 214);
                background-image: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.15) 25%,
                  transparent 25%
                );
                background-size: 20rem 20rem;
                animation: skeleton-stripes 1s linear infinite;
              }

              @keyframes skeleton-stripes {
                from {
                  background-position: 0 0;
                }
                to {
                  background-position: 20rem 0;
                }
              }
            }
          }
        }

        .loadmore {
          height: 8rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .text_border {
            width: 6rem;
            height: 2.5rem;
            border-radius: 15px;
            border: 1px solid #409eff;
            font-size: 0.8rem;
            text-align: center;
            line-height: 2.5rem;
            color: #409eff;
            cursor: pointer;
            transition: background-color 0.5s;
          }
          .text_border:hover {
            background-color: #ecf5ff;
          }
        }

        .content_list_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 10rem;
          padding: 0 1rem;
          border-bottom: 1px solid #f7f9fa;
          transition: background-color 0.5s;
          img {
            flex: 2;
            width: 200px;
            height: 134px;
            border-radius: 5px;
          }
          .right_item {
            margin-left: 1rem;
            flex: 7;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 134px;
            .content_title {
              h3 {
                margin-bottom: 1rem;
              }
              span {
                color: #666;
              }
            }

            .content_info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .content_info_left {
                display: flex;
                align-items: center;
                justify-content: space-between;
                span {
                  margin: 0 5px;
                  color: #666;
                  font-size: 14px;
                }
              }

              .content_info_rignt {
                .icon {
                  margin-left: 0.5rem;
                }
                span {
                  color: #666;
                  font-size: 12px;
                }
              }
            }
          }
        }
        .content_list_item:hover {
          background-color: #f7f9fa;
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
  .news-main {
    width: 1120px;
    margin: 0 auto;
  }
}
/* css注释：设置了浏览器宽度不小于1201px时 abc 显示1200px宽度 */

@media screen and (max-width: 1200px) {
  .news-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于1200px时 abc 显示900px宽度 */

@media screen and (max-width: 901px) {
  .news-main {
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
  .news-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于500px时 abc 显示100px宽度 */
</style>