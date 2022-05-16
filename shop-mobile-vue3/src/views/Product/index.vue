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

const router = useRouter()

const { productId } = defineProps({
  productId: {
    type: String,
    required: true,
  },
});
// 获取商品详情
const productDetailData = ref({});
const initProductDetailData = async () => {
  const { data } = await getProductDetail(productId);
  console.log("data", data);
  if (data.status !== 200) {
    // 不存在则返回首页
    return router.push({
      name:'home'
    })
  }
  productDetailData.value = data.data;
};
// 加载商品详情数据
initProductDetailData();
// 轮播图
const sliderData = computed(
  () => productDetailData.value.storeInfo?.slider_image
);
</script>
<style lang="scss" scoped>
.product {
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
}
</style>
