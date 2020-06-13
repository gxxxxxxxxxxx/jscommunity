<template>
  <div class="content_hot">
    <div class="content_hot_title">
      <span>//</span>
      <span>{{title}}</span>
    </div>
    <div class="content_hot_lists">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-div",
  props: {
    title: {
      type: String,
      default: "请输入标题"
    }
  }
};
</script>

<style lang="less">
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
}
</style>