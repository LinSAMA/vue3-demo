<template>
  <div class="home-nav">
    <div class="logo" />
    <div class="search" />
    <div class="more" />
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.home-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: azure;
  .logo {
    width: 50px;
    height: 100%;
    background-color: pink;
  }
  .search {
    width: 50px;
    height: 100%;
    background-color: yellow;
  }
  .more {
    width: 50px;
    height: 100%;
    background-color: blueviolet;
  }
}
</style>
