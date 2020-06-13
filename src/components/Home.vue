<template>
  <div class="home">
    <!-- 导航 -->

    <div class="navigator">
      <router-view name="navigator"/>
    </div>

    <!--内容-->
    <div class="main">
      <router-view name="main"/>
    </div>

    <!-- 页尾 -->

    <footer></footer>
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
.navigator{
  
  margin-bottom: 1rem;
}
</style>
