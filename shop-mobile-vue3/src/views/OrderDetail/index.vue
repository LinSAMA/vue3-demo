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
        <van-cell :title="cartItem"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell
          class="product"
          v-for="(item, index) in cartInfo"
          :key="item + index"
        >
          <img :src="item.productInfo.image" alt="" />
          <div class="info">
            <p class="title" v-text="item.productInfo.store_name"></p>
            <p class="price">￥{{ item.truePrice }}</p>
          </div>
          <span class="num">x{{ item.cart_num }}</span>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
  <!-- 提交订单 -->
  <van-submit-bar
    label="订单总计："
    :price="totalPrice"
    button-text="立即付款"
    @submit="showPayPanel = true"
  />
  <!-- 弹出付款区域 -->
  <van-action-sheet
    v-model:show="showPayPanel"
    cancel-text="取消"
    close-on-click-action
    @cancel="onCancel"
  >
    <template #default>
      <van-radio-group v-model="payMethod">
        <van-cell-group>
          <!-- 微信支付 -->
          <van-cell
            clickable
            title="微信支付"
            label="微信快捷支付"
            @click="payMethod = 'wechat'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.6186.cn%2Fd%2Ffile%2Ftitlepic%2F20191121%2F2egxjxnbkty.jpg&refer=http%3A%2F%2Fpic.6186.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656520272&t=17162b9fd1c23b1d725823f38abb1e42"
                size="30"
                :style="{ marginRight: '12px' }"
              ></van-icon>
            </template>
            <template #right-icon>
              <van-radio name="wechat" checked-color="#ee0a24"></van-radio>
            </template>
          </van-cell>
          <!-- 支付宝支付 -->
          <van-cell
            clickable
            title="支付宝"
            label="支付宝快捷支付"
            @click="payMethod = 'alipay'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ixintu.com%2Fdownload%2Fjpg%2F201909%2F490cbe1713be2a188a0beb9a06bcc8ad.jpg%21con&refer=http%3A%2F%2Fimg.ixintu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656520519&t=ccae8c43e6c868d2ec6671baa3272e80"
                size="30"
                :style="{ marginRight: '12px' }"
              ></van-icon>
            </template>
            <template #right-icon>
              <van-radio name="alipay" checked-color="#ee0a24"></van-radio>
            </template>
          </van-cell>
          <!-- 余额支付 -->
          <van-cell
            clickable
            title="余额支付"
            :label="`可用余额为：${yue}元`"
            @click="payMethod = 'yue'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="gold-coin"
                color="#ff9900"
                size="30"
                :style="{ marginRight: '12px' }"
              ></van-icon>
            </template>
            <template #right-icon>
              <van-radio name="yue" checked-color="#ee0a24"></van-radio>
            </template>
          </van-cell>
          <van-cell>
            <van-button round type="danger" block @click="onClickPay"
              >去支付</van-button
            >
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </template>
  </van-action-sheet>
</template>
<script setup>
import {
  getOrderList,
  getAddressList,
  postOrderConfirm,
  postCreateOrder,
} from "@/api/order";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";

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
const cartItem = computed(() => `共${cartInfo.value?.length || 0}件`);
const totalPrice = computed(
  () => (orderConfirmData.value?.priceGroup?.totalPrice || 0) * 100
);
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
// 地址弹窗
const onClickPopup = () => {
  popupStatus.value = true;
};
// 关闭地址弹窗
const changeAddress = (item) => {
  // 更改弹出层显示状态
  popupStatus.value = false;
  // 更新当前显示的数据
  currentAddress.value = item;
};
// 跳转新增/编辑地址
const onclickAddAddress = () => {
  router.push({
    name: "address",
    params: {
      cartId,
    },
  });
};

const showPayPanel = ref(false);
const payMethod = ref("yue");
const yue = computed(() => orderConfirmData.value?.userInfo.now_money || 0);
const onClickPay = async () => {
  const { data } = await postCreateOrder(orderConfirmData.value.orderKey, {
    addressId: currentAddress.value.id,
    payType: payMethod.value,
  });
  if (data.status !== 200) return;
  // 提示成功并跳转
  Toast.success('支付成功，自动跳转登录页...')
  router.push({
    name:'order'
  })
};

const onAdd = () => Toast("新增地址");
const onEdit = (item, index) => Toast("编辑地址:" + index);

const onCancel = () => Toast("取消");
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
