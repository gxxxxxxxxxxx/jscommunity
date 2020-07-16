<template>
  <div class="home-about">
    <div class="myinfo">
      <el-avatar
        :size="100"
        src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2928089645,3937730344&fm=26&gp=0.jpg"
      ></el-avatar>
      <h4>GANXIAOXING</h4>
    </div>
    <div class="aboutweb">
      <span>关于本站</span>
      <span>本站由本人独立开发维护,前端是由Vue2构建的PWA应用，服务端基于Koa2构建</span>
      <span>本站内容涉及前端、NodeJs、Python、SQL、Linux等技术领域</span>
    </div>
    <div class="aboutme aboutweb">
      <span>关于博主</span>
      <span>前端搬砖攻城狮，在杭州生活工作</span>
      <span>技术栈: 1. 前端 - vue/angular2. 服务端 - nodejs(koa2)</span>
      <span>目前主要关注Vue2及Koa2开发，未来可能会逐步涉及React、NodeJs及Native方向</span>
    </div>
 
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.home-about {
  margin: 0 auto;

  .myinfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-avatar {
      margin: 1rem;
      img {
        width: 100%;
      }
    }
  }
  .aboutweb {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    span {
      margin: 0.5rem;
      text-align: center;
    }

    span:first-child {
      color: #4a90e2;
      font-size: 1.5rem;
      font-style: italic;
    }
  }
}

@media screen and (min-width: 1201px) {
  .home-about {
    width: 1120px;
  }
}

@media screen and (max-width: 1201px) {
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 500px) {
}
</style>