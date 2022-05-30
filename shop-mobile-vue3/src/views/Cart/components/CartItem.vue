<template>
  <div class="cart-item">
    <van-checkbox v-model="itemChecked"></van-checkbox>
    <div class="link" @click="onClickToPro">
      <img :src="itemData.image" alt="" />
      <div class="info">
        <p class="title" v-text="itemData.title"></p>
        <p class="detail">
          <span class="price">￥{{ itemData.price }}</span>
          <van-stepper
            :max="itemData.stock"
            v-model="itemCount"
            button-size="26px"
            @click.stop
          />
        </p>
        <p class="del">
          <span>删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const router = useRouter();
const store = useStore();

const { itemData } = defineProps({
  itemData: {
    type: Object,
  },
});
// 跳转到产品页
const onClickToPro = () => {
  router.push({
    name: "product",
    params: {
      productId: itemData.productId,
    },
  });
};

// 通过计算属性，处理 v-model 的获取与设置操作
const itemChecked = computed({
  get: () => itemData.checked,
  set: (newChecked) => {
    store.commit("cart/checkedChange", { checked: newChecked, id: itemData.id });
  },
});
const itemCount = computed({
  get: () => itemData.count,
  set: (newCount) => {
    store.dispatch("cart/countChange", { count: newCount, id: itemData.id });
  },
});
</script>
<style lang="scss" scoped>
.cart-item {
  height: 90px;
  padding: 10px 20px;
  display: flex;
  background-color: #fff;
  margin-bottom: 1px;
  .link {
    width: 100%;
    display: flex;
    img {
      width: 88px;
      height: 88px;
      align-self: center;
    }
    .info {
      font-size: 14px;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 5px 0 15px;
      }
      .detail {
        margin-bottom: 10px;
        .price {
          font-size: 16px;
          color: #f2270c;
        }
        .van-stepper {
          float: right;
        }
      }
      .del {
        direction: rtl;
      }
    }
  }
}
</style>
