<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <img src="@/assets/login-img.png" alt="" />
      <div class="user-info">
        <span class="name" v-text="username"></span>
        <span class="id" v-text="userID"></span>
      </div>
      <van-icon name="setting-o"></van-icon>
    </div>
    <van-cell-group inset class="user-detail">
      <!-- 菜单区域 -->
      <van-cell>
        <van-grid :border="false">
          <van-grid-item :text="collectCount">
            <template #icon>收藏</template>
          </van-grid-item>
          <van-grid-item :text="integral">
            <template #icon>积分</template>
          </van-grid-item>
          <van-grid-item :text="couponCount">
            <template #icon>优惠券</template>
          </van-grid-item>
          <van-grid-item :text="now_money">
            <template #icon>余额</template>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset>
      <!-- 订单中心 -->
      <van-cell
        title="订单中心"
        value="查看全部"
        is-link
        to="/order"
      ></van-cell>
      <van-grid column-num="5" :border="false">
        <van-grid-item icon="bill-o" text="待付款" />
        <van-grid-item icon="tosend" text="待发货" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item icon="comment-o" text="待评价" />
        <van-grid-item icon="sign" text="已完成" />
      </van-grid>
    </van-cell-group>
  </div>
  <!-- 公共组件 -->
  <layout-footer></layout-footer>
</template>

<script setup>
import layoutFooter from "@/components/LayoutFooter.vue";
import { getUserInfo } from "@/api/user";
import { ref,computed } from "vue";

const userInfo = ref({});
const username = computed(() => userInfo.value?.nickname || '')
const userID = computed(() => 'ID:' + (userInfo.value?.uid || ''))

// 用户详情信息
const collectCount = computed(() => userInfo.value?.collectCount.toString() || '')
const integral = computed(() => userInfo.value?.integral.toString() || '')
const couponCount = computed(() => userInfo.value?.couponCount.toString() || '')
const now_money = computed(() => userInfo.value?.now_money.toString() || '')

// 初始化用户信息
const initUserInfo = async () => {
  const { data } = await getUserInfo()
  if (data.status !== 200) return;
  userInfo.value = data.data
};
initUserInfo();




</script>
<style lang="scss" scoped>
.container {
  height: 600px;
  padding: 10px 0;
  background: radial-gradient(circle at 50% -10%, #fbc546 72%, #f6f7f9 72%)
    #f6f7f9 0 -300px no-repeat;
  .header {
    padding: 0 15px 15px;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      .name {
        font-size: 14px;
        font-weight: 700;
        padding-bottom: 10px;
      }
      .id {
        font-size: 12px;
      }
    }
  }
  .van-cell-group {
    margin-bottom: 10px;
  }
  .user-detail {
    .van-cell {
      padding: 0;
      min-height: 74px;
    }
  }
}
</style>
