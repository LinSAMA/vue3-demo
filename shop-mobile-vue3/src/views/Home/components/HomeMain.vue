<template>
  <van-pull-refresh class="home-main" v-model="refreshing" @refresh="onRefresh">
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swiperBgData" :key="item + index">
        <img :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 菜单列表 -->
    <van-grid icon-size="40">
      <van-grid-item
        v-for="(item, index) in menusData"
        :key="index + item"
        :text="item.info[0].value"
        :icon="item.img"
      />
    </van-grid>
    <!-- 公告栏 -->
    <van-notice-bar left-icon="fire-o" :scrollable="false">
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(item, index) in newsData"
          :key="item + index"
          v-text="item.chiild[0].val"
        />
      </van-swipe>
    </van-notice-bar>
    <!-- 商品列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="initProductListData"
    >
      <product-list :productList="productListData"></product-list>
    </van-list>
  </van-pull-refresh>
</template>
<script setup>
import { ref, computed } from "vue";
import { getDefaultData } from "@/api";
import { getProductList } from "@/api/product";
import productList from "@/components/ProductList.vue";

// 初始化首页数据
const indexData = ref({});
const initIndexData = async () => {
  const { data } = await getDefaultData();
  if (data.status === 200) {
    indexData.value = data.data;
    // 加载完毕，下拉刷新状态更改为完成
    refreshing.value = false;
  }
};
// 加载首页数据
initIndexData();
// 计算属性保存使用数据
const swiperBgData = computed(
  () => indexData.value.swiperBg?.default.imgList.list
);
const menusData = computed(() => indexData.value.menus?.default.imgList.list);
const newsData = computed(() => indexData.value.news?.default.newList.list);

// 初始化商品数据
const productListData = ref([]);
let page = 1;
let limit = 4;
// 下拉加载列表数据
const loading = ref(false);
const finished = ref(false);
const initProductListData = async () => {
  const { data } = await getProductList({
    limit,
    page,
  });
  if (data.status !== 200) return;
  // 将最新数据推入列表
  productListData.value.push(...data.data);
  // 加载完成
  loading.value = false;
  // 数据全部加载完成
  if (data.data.length < limit) {
    finished.value = true;
    return;
  }
  // 变更页数
  page++;
};

// 下拉刷新列表
const refreshing = ref(false);
const onRefresh = () => {
  // 清空列表
  indexData.value = {};
  productListData.value = [];
  // 页码还原
  page = 1;
  loading.value = false;
  finished.value = false;
  // 重新加载数据
  initIndexData();
  initProductListData();
};
</script>
<style lang="scss" scoped>
.home-main {
  padding: 50px 0;
  background-color: #f7f7f7;
  .my-swipe img {
    width: 100%;
    height: 170px;
  }
  :deep(.van-notice-bar__content) {
    display: flex;
    align-items: center;
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
</style>
