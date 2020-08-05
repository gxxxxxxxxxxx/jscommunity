<template>
  <div class="home">
    <!-- 导航 -->

    <div class="navigator">
      <router-view name="navigator" />
    </div>

    <!--内容-->
    <div class="main">
      <transition name="fade">
        <router-view name="main" />
      </transition>
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
  width: 100vw;
  margin: 0 auto;
}
.main {
  width: 100vw;
  padding: 1rem 0;
  margin: 0 auto;
  background-color: #f7f9fa;
}

footer {
  width: 100vw;
  margin: 0 auto;
}

.fade-leave-active {
}


.fade-enter-active {
  transition: opacity .8s ease-in; 
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
