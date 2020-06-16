<template>
  <div class="home">
    <!-- 导航 -->

    <div class="navigator">
      <router-view name="navigator" />
    </div>

    <!--内容-->
    <div class="main">
      <router-view name="main" />
    </div>

    <!-- 页尾 -->

    <div>
      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.navigator {
  margin-bottom: 1rem;
  width: 98vw;
   margin: 0 auto;
}
.main {
padding: 1rem 0;
 background-color: #f7f9fa;

}

footer{
  width: 98vw;
  margin: 0 auto;
}
</style>
