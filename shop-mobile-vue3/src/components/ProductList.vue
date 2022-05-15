<template>
  <div class="product-list">
    <van-grid :column-num="2" :gutter="10" :center="false">
      <van-grid-item v-for="(item, index) in productList" :key="item + index">
        <van-image :src="item.image" height="165"></van-image>
        <p class="title" v-text="item.store_name"></p>
        <p class="price">￥{{ item.price }}</p>
        <p class="sales">已售{{ item.sales }}</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script setup>
const { productList } = defineProps({
  productList: {
    type: Array,
  },
});
</script>
<style lang="scss" scoped>
.product-list {
  margin: 10px 0;
  :deep(.van-grid-item__content) {
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    margin-bottom: 10px;
  }
  .title {
    padding:5px 8px 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    color:#ee3e3e;
    font-size:22px;
    font-weight:700;
    padding-left:6px;
  }
  .sales {
    color:#ccc;
    font-size:14px;
    padding-left:8px;
  }
}
</style>
