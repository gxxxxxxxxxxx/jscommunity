<template>
  <div class="home-main">
    <el-carousel trigger="click" :height="curWidth">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" alt />
      </el-carousel-item>
    </el-carousel>

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
          <router-link :to="'/post'" class="content_list_item">
            <img
              src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
              alt
            />
            <div class="right_item">
              <div class="content_title">
                <h3>小米或即将推出27英寸电竞显示器：165Hz刷新率</h3>
                <span>今年小米要扩充显示器产品线。</span>
              </div>
              <div class="content_info">
                <div class="content_info_left">
                  <el-avatar
                    size="small"
                    src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
                  ></el-avatar>
                  <span class="user">哈哈哈哈哈</span>
                  <span>|</span>
                  <span>科技新闻</span>
                </div>
                <div class="content_info_rignt">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanjing" />
                  </svg>
                  <span>980</span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                  <span>2</span>
                </div>
              </div>
            </div>
          </router-link>

          <div class="content_list_item">
            <img
              src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
              alt
            />

            <div class="right_item">
              <div class="content_title">
                <h3>小米或即将推出27英寸电竞显示器：165Hz刷新率</h3>
                <span>今年小米要扩充显示器产品线。</span>
              </div>

              <div class="content_info">
                <div class="content_info_left">
                  <el-avatar
                    size="small"
                    src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
                  ></el-avatar>
                  <span class="user">哈哈哈哈哈</span>
                  <span>|</span>
                  <span>科技新闻</span>
                </div>
                <div class="content_info_rignt">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanjing" />
                  </svg>
                  <span>980</span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>

          <div class="content_list_item">
            <img
              src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
              alt
            />

            <div class="right_item">
              <div class="content_title">
                <h3>小米或即将推出27英寸电竞显示器：165Hz刷新率</h3>
                <span>今年小米要扩充显示器产品线。</span>
              </div>

              <div class="content_info">
                <div class="content_info_left">
                  <el-avatar
                    size="small"
                    src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
                  ></el-avatar>
                  <span class="user">哈哈哈哈哈</span>
                  <span>|</span>
                  <span>科技新闻</span>
                </div>
                <div class="content_info_rignt">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanjing" />
                  </svg>
                  <span>980</span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>

          <div class="content_list_item">
            <img
              src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
              alt
            />

            <div class="right_item">
              <div class="content_title">
                <h3>小米或即将推出27英寸电竞显示器：165Hz刷新率</h3>
                <span>今年小米要扩充显示器产品线。</span>
              </div>

              <div class="content_info">
                <div class="content_info_left">
                  <el-avatar
                    size="small"
                    src="https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100https://feng-bbs-att-1255531212.image.myqcloud.com/content/2020/06/13/110358drm37hc031b1f3tp.jpg?imageMogr2/thumbnail/320x/format/jpg/interlace/0/quality/100"
                  ></el-avatar>
                  <span class="user">哈哈哈哈哈</span>
                  <span>|</span>
                  <span>科技新闻</span>
                </div>
                <div class="content_info_rignt">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanjing" />
                  </svg>
                  <span>980</span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                  <span>2</span>
                </div>
              </div>
            </div>
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
            <div class="content_hot_item">
              <h4>KFC宣布推出「主机」：</h4>
              <div class="content_hot_item_info">
                <span>iPhone 11</span>
                <span>06-09 13:06</span>
              </div>
            </div>

            <div class="content_hot_item">
              <h4>KFC宣布推出「主机」：</h4>
              <div class="content_hot_item_info">
                <span>iPhone 11</span>
                <span>06-09 13:06</span>
              </div>
            </div>

            <div class="content_hot_item">
              <h4>KFC宣布推出「主机」：</h4>
              <div class="content_hot_item_info">
                <span>iPhone 11</span>
                <span>06-09 13:06</span>
              </div>
            </div>

            <div class="content_hot_item">
              <h4>KFC宣布推出「主机」：</h4>
              <div class="content_hot_item_info">
                <span>iPhone 11</span>
                <span>06-09 13:06</span>
              </div>
            </div>

            <div class="content_hot_item">
              <h4>KFC宣布推出「主机」：</h4>
              <div class="content_hot_item_info">
                <span>iPhone 11</span>
                <span>06-09 13:06</span>
              </div>
            </div>

            <div class="content_hot_item">
              <h4>KFC宣布推出「主机」：</h4>
              <div class="content_hot_item_info">
                <span>iPhone 11</span>
                <span>06-09 13:06</span>
              </div>
            </div>

            <div class="content_hot_item">
              <h4>KFC宣布推出「主机」：</h4>
              <div class="content_hot_item_info">
                <span>iPhone 11</span>
                <span>06-09 13:06</span>
              </div>
            </div>
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
      images: [
        require("../../assets/images/1.jpg"),
        require("../../assets/images/2.jpg"),
        require("../../assets/images/3.jpg")
      ],
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
      curWidth: "500px"
    };
  },
  created() {
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
  }
};
</script>

<style lang="less">
.home-main {
  padding-bottom: 1rem;
  .el-carousel {
    img {
      width: 100% !important;
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
        .content_list_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 10rem;
          padding: 0 1rem;
          border-bottom: 1px solid #f7f9fa;
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
  .home-main {
    width: 1120px;
    margin: 0 auto;
  }
}
/* css注释：设置了浏览器宽度不小于1201px时 abc 显示1200px宽度 */

@media screen and (max-width: 1200px) {
  .home-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于1200px时 abc 显示900px宽度 */

@media screen and (max-width: 901px) {
  .home-main {
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
  .home-main {
    width: 98vw;
    margin: 0 auto;
  }
}
/* 设置了浏览器宽度不大于500px时 abc 显示100px宽度 */
</style>