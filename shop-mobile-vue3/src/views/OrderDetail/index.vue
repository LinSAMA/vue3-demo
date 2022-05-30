<template>
  <van-nav-bar
    title="订单确认"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="container">
    <div class="address-card" @click="onClickPopup">
      <p class="info">
        <span class="username" v-text="currentAddress.name"></span>
        <span v-text="currentAddress.tel"></span>
      </p>
      <p class="detail">
        <span class="default" v-if="currentAddress.isDefault">[默认]</span>
        <span v-text="currentAddress.address"></span>
      </p>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model:show="popupStatus" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @click-item="changeAddress"
        @add="onclickAddAddress"
        @edit="onEdit"
      >
        <template #top v-if="isEmpty">
          <van-empty description="描述文字" />
        </template>
      </van-address-list>
    </van-popup>
    <!-- 商品列表 -->
    <div class="product-list">
      <van-cell-group>
        <van-cell title="共2件"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell class="product">
          <img
            src="https://shop.fed.lagounews.com/uploads/attach/2021/09/20210902/7c3f3d5228708fd5f41e1733b8624d61.jpg"
            alt=""
          />
          <div class="info">
            <p class="title">这里是标题</p>
            <p class="price">￥4545.5</p>
          </div>
          <span class="num">x3</span>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
  <van-submit-bar
    label="订单总计："
    :price="3050"
    button-text="立即付款"
    @submit="onSubmit"
  />
</template>
<script setup>
import { getOrderList, getAddressList, postOrderConfirm } from "@/api/order";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { cartId } = defineProps({
  cartId: {
    type: String,
    required: true,
  },
});

const chosenAddressId = ref("");
const addressList = ref([]);
const currentAddress = ref({});

const popupStatus = ref(false);
const orderConfirmData = ref({});
// 初始化地址
const initAddressList = async () => {
  const { data } = await getAddressList({ limit: 5, page: 1 });
  if (data.status !== 200) return;
  addressList.value = covertData(data.data);
};
initAddressList();

// 初始化订单信息
const initOrderInfo = async () => {
  const { data } = await postOrderConfirm({
    cartId,
    new: 0,
  });
  if (data.status !== 200) return;
  orderConfirmData.value = data.data;
};
initOrderInfo();

// 计算属性
const cartInfo = computed(() => orderConfirmData.value?.cartInfo);
const isEmpty = computed(() => addressList.value.length === 0);

// 方法
// 数据转换
const covertData = (data) => {
  return data.map((item) => {
    const temp = {
      id: item.id,
      name: item.real_name,
      tel: item.phone,
      address: item.province + item.city + item.district + item.detail,
      isDefault: item.is_default,
    };
    // 检测是否为默认数据
    if (item.is_default === 1) {
      // 记录勾选的 ID
      chosenAddressId.value = item.id;
      // 记录当前展示数据
      currentAddress.value = temp;
    }
    return temp;
  });
};

const onClickPopup = () => {
  popupStatus.value = true;
};

const changeAddress = (item) => {
  // 更改弹出层显示状态
  popupStatus.value = false;
  // 更新当前显示的数据
  currentAddress.value = item;
};

const onclickAddAddress = () => {
  router.push({
    name: "address",
    params: {
      cartId,
    },
  });
};
const onAdd = () => Toast("新增地址");
const onEdit = (item, index) => Toast("编辑地址:" + index);
</script>
<style lang="scss" scoped>
.van-nav-bar {
  position: fixed !important;
  width: 100%;
}
.container {
  padding: 50px 0;
  // 地址卡片
  .address-card {
    position: relative;
    padding: 20px 25px;
    font-size: 16px;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 20%,
        transparent 25%,
        #0084ff 25%,
        #0084ff 45%,
        transparent 45%,
        transparent 50%
      );
      background-size: 80px;
    }

    .info {
      span:first-child {
        padding-right: 20px;
      }
    }
    .detail {
      padding-top: 5px;
      .default {
        padding-right: 5px;
        background: #d6251f;
        color: #fff;
        font-size: 12px;
        padding: 2px 3px;
        margin-right: 17px;
        border-radius: 3px;
      }
    }
  }
  // 商品列表
  .product-list {
    :deep(.van-cell__value) {
      display: flex;
      align-items: center;
      img {
        width: 70px;
        height: 70px;
      }
      .info {
        padding-left: 5px;
        flex: 1;
        .tittle {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          padding: 0 15px 5px 0;
        }
        .price {
          color: #f2270c;
        }
      }
      .num {
        color: #aaa;
      }
    }
  }
}
</style>
