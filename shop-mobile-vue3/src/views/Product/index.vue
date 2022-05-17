<template>
  <div class="product">
    <van-nav-bar left-arrow fixed />
    <van-tabs v-model:active="active" swipeable>
      <van-tab title="商品">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item, index) in sliderData"
            :key="item + index"
          >
            <img :src="item" />
          </van-swipe-item>
        </van-swipe>
        <!-- 商品介绍 -->
        <van-cell class="product-header">
          <!-- 商品标题 -->
          <template #title>
            <div class="price">
              <span>￥{{ storeInfo?.price }}</span>
              <van-icon name="share-o" size="20" class="share"></van-icon>
            </div>
            <div class="title" v-text="storeInfo?.store_name"></div>
          </template>
          <!-- 其他信息 -->
          <template #label>
            <span>原价：￥{{ storeInfo?.ot_price }}</span>
            <span>库存：{{ storeInfo?.stock }}</span>
            <span>销量：{{ storeInfo?.fsales }}</span>
          </template>
        </van-cell>
        <!-- 规格区域 -->
        <van-cell></van-cell>
      </van-tab>
      <van-tab title="评价">2</van-tab>
      <van-tab title="推荐">3</van-tab>
      <van-tab title="详情">4</van-tab>
    </van-tabs>
    <layout-footer></layout-footer>
  </div>
</template>

<script setup>
import layoutFooter from "@/components/LayoutFooter.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getProductDetail } from "@/api/product";

const { productId } = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const router = useRouter();

// 获取商品详情
const productDetailData = ref({});
const initProductDetailData = async () => {
  const { data } = await getProductDetail(productId);
  console.log("data", data);
  if (data.status !== 200) {
    // 不存在则返回首页
    return router.push({
      name: "home",
    });
  }
  productDetailData.value = data.data;
};
// 加载商品详情数据
initProductDetailData();
// 商品信息
const storeInfo = computed(() => productDetailData.value.storeInfo);
// 轮播图
const sliderData = computed(() => storeInfo.value?.slider_image);
</script>
<style lang="scss" scoped>
.product {
  background-color: #ccc;
  :deep(.van-tabs__wrap) {
    width: 80%;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
  }
  :deep(.van-tabs__content) {
    padding-top: 46px;
  }
  .van-swipe-item img {
    width: 375px;
  }
  .product-header {
    .price {
      font-size: 24px;
      font-weight: 700;
    }
    .share {
      float: right;
    }
    .title {
      margin-bottom: 5px 0 10px;
      font-size: 16px;
      font-weight: 700;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    :deep(.van-cell__label) {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
