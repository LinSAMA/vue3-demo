<template>
  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/recommend" icon="gift-o">推荐</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="cart-o">购物</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import { ref } from 'vue';
  const active = ref('home')
</script>
<style lang="scss" scoped></style>
