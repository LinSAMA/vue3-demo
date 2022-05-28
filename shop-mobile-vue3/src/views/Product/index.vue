<template>
  <div class="product">
    <van-nav-bar left-arrow fixed @click-left="onClickBack" />
    <van-tabs v-model:active="active" scrollspy sticky>
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
        <van-cell is-link class="sku-window" @click="showPopup">
          <template #title>
            <span>已选择：{{ sku }}</span>
          </template>
        </van-cell>
        <!-- 规格弹框 -->
        <van-popup v-model:show="specData.show" position="bottom">
          <van-cell-group>
            <van-cell class="spec-header">
              <img :src="storeInfo?.image" />
              <div class="info">
                <p class="title" v-text="storeInfo?.store_name"></p>
                <p class="price">￥{{ specDetail.price }}</p>
                <p class="store">库存：{{ specDetail.stock }}</p>
              </div>
            </van-cell>
            <van-cell class="spec-item" v-for="(item, index) in productAttr">
              <p class="title" v-text="item.attr_name"></p>
              <span
                class="tag"
                v-for="tag in item.attr_values"
                :class="{ active: tag === specData.spec[index] }"
                @click="onClickChoiceTag(tag, index)"
                >{{ tag }}
              </span>
            </van-cell>
            <van-cell title="数量">
              <van-stepper
                v-model="specData.buyCount"
                :max="specDetail?.stock"
              />
            </van-cell>
          </van-cell-group>
        </van-popup>
      </van-tab>
      <van-tab title="评价">
        <!-- 评价详情 -->
        <van-cell-group class="comment">
          <van-cell
            :title="replyInfo"
            :value="replyRate"
            is-link
            :to="{
              name: 'comment',
              params: {
                productId,
              },
            }"
          ></van-cell>
          <!-- 评价组件 -->
          <comment-item :reply="reply" v-if="replyCount !== 0"></comment-item>
        </van-cell-group>
      </van-tab>
      <van-tab title="推荐">
        <van-cell class="commend">
          <p class="title">推荐商品</p>
          <van-grid column-num="3" :border="false">
            <van-grid-item
              v-for="(item, index) in productList"
              :key="item + index"
              :to="{
                name: 'product',
                params: { productId: item.id },
              }"
            >
              <van-image :src="item.image" />
              <p v-text="item.store_name"></p>
              <span>￥{{ item.price }}</span>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-tab>
      <van-tab title="详情">
        <div class="description" v-html="storeInfo?.description"></div>
      </van-tab>
    </van-tabs>
    <!-- 购物车 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-action-bar-icon icon="cart-o" text="购物车" to="/cart" />
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="onClickAddCart"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script setup>
import layoutFooter from "@/components/LayoutFooter.vue";
import commentItem from "@/components/CommentItem.vue";
import { Toast } from "vant";
import { ref, computed, reactive } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { getProductDetail } from "@/api/product";
import { postAddCart } from "@/api/cart";

const router = useRouter();
const store = useStore();
const { productId } = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

// 返回首页
const onClickBack = () => {
  return router.push({
    name: "home",
  });
};

// 获取商品详情
const productDetailData = ref({});
const initProductDetailData = async (productId) => {
  const { data } = await getProductDetail(productId);
  console.log("data", data);
  if (data.status !== 200) {
    // 不存在则返回首页
    return router.push({
      name: "home",
    });
  }
  productDetailData.value = data.data;
  // 初始化规格数据
  initSpec(data.data.productAttr);
};
// 加载商品详情数据
initProductDetailData(productId);
// 商品信息
const storeInfo = computed(() => productDetailData.value.storeInfo);
// 轮播图
const sliderData = computed(() => storeInfo.value?.slider_image);
// 评价
const replyCount = computed(() => productDetailData.value.replyCount || 0);
const replyInfo = computed(() => `用户评价(${replyCount.value})`);
const replyChance = computed(() => productDetailData.value.replyChance || 0);
const replyRate = computed(() => `${replyChance.value}%好评率`);
const reply = computed(() => productDetailData.value.reply);

// 推荐
const productList = computed(() => productDetailData.value.good_list);
// 路由跳转
onBeforeRouteUpdate((to) => {
  // 清空数据
  productList.value = {};
  // 返回顶部
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  initProductDetailData(to.params.productId);
});

// 规格弹框
const productAttr = computed(() => productDetailData.value.productAttr);
const productValue = computed(() => productDetailData.value.productValue);
const specData = reactive({
  show: false,
  spec: [],
  buyCount: 0,
});
// 展示/隐藏弹框
const showPopup = () => {
  specData.show = !specData.show;
};
// 默认选中数据
const initSpec = (spec) => {
  specData.spec = spec.map((item) => item.attr_values[0]);
};
// 选择标签
const onClickChoiceTag = (tag, index) => {
  specData.spec[index] = tag;
};
const sku = computed(() => specData.spec.toString());
const specDetail = computed(() => productValue.value?.[sku.value]);

// 加入购入车
const onClickAddCart = async () => {
  if (!store.state.user) {
    return router.push({
      name: "login",
      query: {
        redirect: router.currentRoute.value.fullPath,
      },
    });
  }
  if (!specData.show) {
    return (specData.show = true);
  }
  // 添加商品
  const { data } = await postAddCart({
    new: "0",
    uniqueId: specDetail.value.unique,
    productId,
    cartNum: specData.buyCount,
  });
  if (data.status !== 200) {
    return Toast(data.msg);
  }
  // 加入购物车成功
  specData.show = false
  Toast('加入购物车成功!')
};
</script>
<style lang="scss" scoped>
.product {
  background-color: #f2f2f2;
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
    margin-bottom: 10px;
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
  .sku-window {
    margin-bottom: 10px;
  }

  // 评价
  .comment {
    margin-bottom: 10px;
  }

  // 推荐
  :deep(.commend) {
    margin-bottom: 10px;
    .title {
      font-size: 16px;
      font-weight: 700;
      padding: 5px 0;
    }
    .van-grid-item {
      img {
        width: 107px;
        height: 107px;
      }
      p {
        font-size: 14px;
        padding: 0 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      span {
        font-size: 12px;
        color: #f2270c;
        font-weight: 700;
        align-self: flex-start;
      }
    }
    .van-grid-item__content {
      padding: 0;
    }
  }

  // 商品详情
  .description {
    width: 100%;
    :deep(img) {
      width: 100%;
    }
  }

  // 规格弹窗
  :deep(.van-popup) {
    border-radius: 10px 10px 0 0;
    margin-bottom: 50px;
    .spec-header {
      .van-cell__value {
        display: flex;
      }
      img {
        width: 75px;
        height: 75px;
      }
      .info {
        padding: 10px;
        .title {
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .price {
          font-size: 16px;
          font-weight: 700;
          color: #f2270c;
        }
        .store {
          font-size: 13px;
          color: #999;
        }
      }
    }
    .spec-item {
      p {
        margin-bottom: 5px;
      }
      .tag {
        display: inline-block;
        min-width: 25px;
        padding: 0 12px;
        border: 1px solid #ccc;
        border-radius: 20px;
        text-align: center;
        background: #f2f2f2;
        margin-right: 7px;
      }
      .tag.active {
        border-color: #f2270c;
        color: #f2270c;
        background-color: #fcedeb;
      }
    }
  }
  .van-action-bar {
    z-index: 10000;
    width: 100%;
  }
}
</style>
