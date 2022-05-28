<!-- 登录页面 -->
<template>
  <van-form @submit="onSubmit" class="login">
    <img src="@/assets/login-img.png" alt="" />
    <van-cell-group>
      <van-field
        v-model="state.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
      />
      <van-field
        v-if="state.isPassword"
        v-model="state.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-else
        v-model="state.vertifyCode"
        name="vertifyCode"
        label="短信验证码"
        placeholder="短信验证码"
        center
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="onClickSendCode"
            v-text="state.countText"
            :disabled="state.isSend"
          ></van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
      <span class="change-button" @click="onClickChangeLoginModal">{{
        state.isPassword ? "快速登录" : "密码登录"
      }}</span>
    </div>
  </van-form>
</template>
<script setup>
import { reactive, computed } from "vue";
import { Toast } from "vant";
import { useCountDown } from "@vant/use";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute()
import {
  getUserVerifyCode,
  postVerifyCode,
  postLoginByPsd,
  postLoginByCode,
} from "@/api/user";
import { phoneVertify } from "@/utils";

// 提交表单
const onSubmit = async () => {
  const phone = state.phone.trim();
  if (phone === "") {
    return Toast("请输入手机号码");
  }
  let data = "";
  if (state.isPassword) {
    // 密码
    const password = state.password.trim();
    if (password === "") {
      return Toast("请输入密码");
    }
    ({ data } = await postLoginByPsd({
      account: phone,
      password,
    }));
  } else {
    // 验证码
    const code = state.vertifyCode.trim();
    if (code === "") {
      return Toast("请输入验证码");
    }
    ({ data } = await postLoginByCode({
      captcha: code,
      phone,
    }));
  }
  // 接受响应数据
  if (data.status !== 200) {
    return Toast("验证码不正确");
  }
  store.commit("setUser", data.data.token);
  router.push(route.query.redirect ?? '/user');
};

const state = reactive({
  loginModal: "password",
  isPassword: computed(() => state.loginModal === "password"),
  phone: "",
  password: "",
  vertifyCode: "",
  isSend: false,
  countDown: null,
  countText: computed(() =>
    state.isSend ? state.countDown.seconds : "发送验证码"
  ),
});

const onClickChangeLoginModal = () => {
  state.loginModal = state.isPassword ? "vertifyCode" : "password";
  // 清空输入框
  state.password = "";
  state.vertifyCode = "";
};

// 获取用户验证码
const onClickSendCode = async () => {
  // 验证手机号
  if (!phoneVertify(state.phone)) {
    return Toast("请输入正确的手机号!");
  }
  // 获取用户验证码
  const { data: v1 } = await getUserVerifyCode();
  if (v1.status !== 200) return;

  // 获取短信验证码
  const { data: v2 } = await postVerifyCode({
    key: v1.data.key,
    phone: state.phone,
    type: "login",
  });
  if (v2.status !== 200) {
    Toast("网络开小差了,请稍后再试!");
  }
  // 开始倒计时
  const countDown = useCountDown({
    // 倒计时 60s
    time: 60 * 1000,
    onFinish() {
      state.isSend = false;
    },
  });
  countDown.start();
  state.countDown = countDown.current;
  state.isSend = true;
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  img {
    width: 150px;
    height: 150px;
    align-self: center;
    margin: 70px 0 20px 0;
  }
  .change-button {
    display: block;
    text-align: center;
    color: #999;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
