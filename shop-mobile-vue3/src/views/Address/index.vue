<template>
  <van-nav-bar
    title="新增收获地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="real_name"
        name="姓名"
        label="姓名"
        placeholder="姓名"
      />
      <van-field v-model="phone" name="电话" label="电话" placeholder="电话" />
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          title="请选择所在地区"
          :field-names="fieldNames"
          :options="areaOption"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
      <van-field
        v-model="detail"
        name="详细地址"
        label="详细地址"
        placeholder="详细地址"
      />
    </van-cell-group>
    <van-cell-group inset>
      <van-cell title="设为默认地址">
        <template #right-icon>
          <van-switch v-model="is_default" size="20" />
        </template>
      </van-cell>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        @click="onClickSubmit"
      >
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCityList, postEditAddress } from "@/api/order";

const router = useRouter()
const { cartId } = defineProps({
  cartId: {
    type: String,
  },
});

// 表单数据
const real_name = ref("");
const phone = ref("");
const detail = ref("");
const is_default = ref(false);

// 地区数据
const show = ref(false);
const fieldValue = ref("");
const areaOption = ref([]);
let address = {};

// 初始化地址
const initCityList = async () => {
  const { data } = await getCityList();
  if (data.status !== 200) return;
  areaOption.value = processData(data.data);
};
initCityList();

// 设置组件自定义字段名
const fieldNames = {
  text: "n",
  value: "v",
  children: "c",
};
// 处理后端返回地区数据
const processData = (data) => {
  data.forEach((item) => {
    if (item.c.length === 0) {
      delete item.c;
    } else {
      processData(item.c);
    }
  });
  return data;
};
// 级联选择
const onFinish = ({ selectedOptions }) => {
  show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.n).join("/");
  address = {
    province: selectedOptions[0].n,
    city: selectedOptions[1].n,
    city_id: selectedOptions[1].v,
    district: selectedOptions[2].n,
  };
};

// 提交表单数据
const onClickSubmit = async () => {
  const { data } = await postEditAddress({
    // 新增操作，id 为0，其他值，根据 id 进行编辑
    id: 0,
    phone: phone.value,
    real_name: real_name.value,
    is_default: is_default.value,
    detail: detail.value,
    address,
  });
  if (data.status !== 200) return;
  // 校验是否跳回订单确认页
  if (cartId) {
    router.push({
      name:'order-confirm',
      params:{
        cartId
      }
    })
  } else {
    router.push('/user')
  }
};
</script>
<style lang="scss" scoped>
.van-form {
  background-color: #f7f7f7;
  .van-cell-group {
    margin-bottom: 10px;
  }
}
</style>
