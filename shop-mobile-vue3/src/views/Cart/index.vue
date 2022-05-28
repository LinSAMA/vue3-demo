<template>
  <van-nav-bar title="购物车" left-arrow />
  <div class="cart-list" v-if="isEmpty">
    <cart-item
      v-for="(item, index) in cartList"
      :key="item + index"
      :itemData="item"
    ></cart-item>
  </div>
  <van-empty v-else description="购物车空空如也~" />

  <van-submit-bar
    :price="store.getters.totalPrice * 100"
    button-text="去结算"
    @submit="onSubmit"
  >
    <van-checkbox v-model="checkedAll">全选</van-checkbox>
  </van-submit-bar>
  <layout-footer></layout-footer>
</template>

<script setup>
import layoutFooter from "@/components/LayoutFooter.vue";
import CartItem from "./components/CartItem.vue";
import { getCartList } from "@/api/cart";
import { useStore } from "vuex";
import { computed, nextTick } from "vue";

const store = useStore();

const initCartData = async () => {
  const { data } = await getCartList();
  if (data.status !== 200) return;
  store.commit("clearCart");

  await nextTick();

  data.data.valid.forEach((item) => {
    store.commit("addToCart", {
      id: item.id,
      checked: true,
      count: item.cart_num,
      title: item.productInfo.store_name,
      image: item.productInfo.image,
      price: item.truePrice,
      stock: item.trueStock,
      productId: item.product_id,
    });
  });
};
initCartData();
const cartList = computed(() => store.state.cartList);
const isEmpty = computed(() => cartList.value.length !== 0);
const checkedAll = computed({
  get: () => store.getters.checkedAll,
  set: (newChecked) => {
    store.commit("checkedAll", { checked: newChecked });
  },
});
</script>
<style lang="scss" scoped>
.van-nav-bar {
  position: fixed !important;
  width: 100%;
  top: 0;
}
.cart-list {
  margin: 50px 0 100px;
  background-color: #f2f2f2;
}
.van-submit-bar {
  width: 100%;
  bottom: 50px;
}
</style>
