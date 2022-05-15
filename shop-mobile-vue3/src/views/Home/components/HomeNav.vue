<template>
  <div class="home-nav">
    <!-- logo -->
    <img src="@/assets/logo.png" class="logo" />
    <!-- search -->
    <div class="search">
      <van-icon name="search"></van-icon>
    </div>
    <!-- link -->
    <van-icon name="wap-nav"></van-icon>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.home-nav {
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-right:10px;
  box-sizing:border-box;
  background-color: #fff;
  z-index: 9;

  .logo {
    height: 20px;
    padding: 0 10px;
  }
  .search {
    background-color: #f7f7f7;
    width: 100%;
    border-radius: 25px;
    padding-left: 12px;
    margin-right: 10px;
  }
}
</style>
