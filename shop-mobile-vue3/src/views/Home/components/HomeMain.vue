<template>
  <div class="home-main">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.home-main {
  padding: 50px 0;
  height: 1500px;
  background-color: aquamarine;
  .van-swipe {
    height: 150px;
    background-color: antiquewhite;
  }
}
</style>
