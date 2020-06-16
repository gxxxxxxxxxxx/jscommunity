<template>
  <div class="home-footer">
    <span>琼ICP备20000806号-1</span>

    <svg class="icon" aria-hidden="true" @click="goToMyGithub">
      <use xlink:href="#icon-github" />
    </svg>
  </div>
</template>

<script>
export default {
  methods: {
    goToMyGithub: function() {
      window.open("https://github.com/ganxiaoxing");
    }
  }
};
</script>

<style lang="less">
.home-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  span {
    color: #666;
    margin: 0.5rem;
  }
  .icon {
    cursor: pointer;
  }
}

@media screen and (min-width: 1201px) {
  .home-footer {
    width: 1120px;
  }
}

@media screen and (max-width: 1201px) {
  .home-footer {
    width: 98vw;
  }
}
</style>