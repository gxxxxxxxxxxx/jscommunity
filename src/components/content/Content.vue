<template>
  <div class="home-content">
    <div class="content_left">
      <div class="content_title">
        <h3>{{content.title}}</h3>
        <div class="content_infos">
          <div class="content_infos_left">
            <span>{{content.author}}</span>
            <span>
              发表于:
              <span>{{content.sendtime}}</span>
            </span>
            <span>来自 威锋网页版</span>
          </div>
          <div class="content_infos_right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yanjing" />
            </svg>
            <span>{{content.views}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun" />
            </svg>
            <span>2</span>
          </div>
        </div>
      </div>

      <mavon-editor
        class="content_marked"
        v-model="content.content"
        :ishljs="true"
        codeStyle="github"
        :subfield="false"
        :boxShadow="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        previewBackground="#ffffff"
      />
    </div>
    <div class="content_right">
      <div class="content_title">
        <el-avatar
          :size="50"
          src="https://feng-bbs-att-1255531212.image.myqcloud.com/2020/03/09/151620xv4ifhgjyjwg342b.png"
        ></el-avatar>
        <h3>{{content.contenttype}}</h3>
      </div>
      <div class="content_operate">
        <div class="content_operate_views">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liulanliang" />
          </svg>
          <h3>{{content.views}}</h3>
        </div>
        <div class="content_operate_like">
          <svg class="icon" aria-hidden="true" @click="debunce(postLoveMe,2000)">
            <use xlink:href="#icon-xihuan" />
          </svg>
          <h3>{{content.lover}}</h3>

          <div class="likeFloat" v-for="like in liker" :key="like">
            <svg class="icon123" aria-hidden="true">
              <use xlink:href="#icon-xihuan" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import moment from "moment";
moment.locale("zh-cn");
export default {
  components: {
    mavonEditor
  },
  created() {
    this.getContentOne(this.$route.query.pageid);
  },
  data() {
    return {
      content: {},
      timer: null,
      timer2: null,
      liker: [],
      n: 0
    };
  },
  methods: {
    async getContentOne(pageid) {
      const { data } = await this.$http.get("/content/post", {
        params: { pageid: pageid }
      });
      this.content = data.data;
    },

    async postLoveMe() {
      const { data } = this.$http.post("/content/loveme", {
        pageid: this.content._id,
        lover: this.content.lover
      });
    },
    debunce(fn, time) {
      this.content.lover++;

      this.liker.push(this.n++);
      if (this.timer) {
        clearTimeout(this.timer);
        clearTimeout(this.timer2);
      }
      this.timer = setTimeout(() => {
        fn();
      }, 500);
      this.timer2 = setTimeout(() => {
        this.liker.splice(0);
      }, 2000);
    }
  }
};
</script>

<style lang="less">
.home-content {
  margin: 0 auto;
  display: flex;

  .content_left {
    width: 100%;
    flex: 5;
    background-color: #ffffff;
    .content_title {
      height: 6rem;
      margin: 1rem;
      border-bottom: 1px solid #f7f9fa;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: 1.5rem;
      }

      .content_infos {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        .content_infos_left {
          span {
            font-size: 13px;
            color: #666;
          }
        }
        .content_infos_right {
          .icon {
            margin-left: 1rem;
          }
          span {
            font-size: 13px;
            color: #666;
          }
        }
      }
    }
    .content_marked {
      border-top: 0;
      width: 100%;
      max-width: 766px;
    }
  }
  .content_right {
    flex: 2.2;
    margin-left: 1rem;
    background-color: #ffffff;
    height: 14rem;
    .content_title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      width: 80%;
      border-bottom: 1px solid #f7f9fa;
      margin: 0 auto;
      h3 {
        margin-left: 1rem;
      }
    }
    .content_operate {
      margin-top: 1rem;
      display: flex;
      .content_operate_views {
        flex: 1;
        border-right: 1px solid #f7f9fa;
        .icon {
          width: 3rem;
          height: 3rem;
          margin: 0 auto;
          display: block;
        }
        h3 {
          text-align: center;
        }
      }
      .content_operate_like {
        flex: 1;
        position: relative;
        .icon {
          width: 3rem;
          height: 3rem;
          margin: 0 auto;
          display: block;
          cursor: pointer;
          transition: width 1s;
          z-index: 110;
        }

        .icon:active {
          width: 5rem;
        }

        h3 {
          text-align: center;
        }

        .likeFloat {
          width: 1rem;
          height: 1rem;
          position: absolute;
          opacity: 0;
          left: 4.7rem;
          top: -0.5rem;
          animation: myFloat 2s;
          z-index: 100;
          .icon123 {
            width: 100%;
            height: 100%;
          }

          @keyframes myFloat {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
              top: -8rem;
              width: 3rem;
              height: 3rem;
              transform: translateX(-1rem);
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1201px) {
  .home-content {
    width: 1120px;
  }
}

@media screen and (max-width: 1201px) {
  .home-content {
    width: 98vw;
  }
}

@media screen and (max-width: 768px) {
  .home-content {
    width: 98vw;
    flex-direction: column;
    .content_left {
      order: 2;
    }
    .content_right {
      width: 100%;
      order: 1;
      margin-left: 0;
      border-bottom: 1px solid #f7f9fa;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }
  }
}

@media screen and (max-width: 500px) {
  .home-content {
    .content_left {
      .content_title {
        height: 100%;
        h3 {
          text-align: center;
        }
        .content_infos {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>