<!-- 评价页面 -->
<template>
  <van-cell-group class="comment">
    <!-- 头部 -->
    <van-cell
      title="商品评价"
      :value="`好评率${state.replyChance}%`"
    ></van-cell>
    <!-- 评论标签 -->
    <van-cell class="tag">
      <van-button
        size="small"
        :class="{ active: state.isSum }"
        @click="onClickTag('0')"
        >全部({{ state.sumCount }})</van-button
      >
      <van-button
        size="small"
        :class="{ active: state.isGood }"
        @click="onClickTag('1')"
        >好评({{ state.goodCount }})</van-button
      >
      <van-button
        size="small"
        :class="{ active: state.isIn }"
        @click="onClickTag('2')"
        >中评({{ state.inCount }})</van-button
      >
      <van-button
        size="small"
        :class="{ active: state.isPoor }"
        @click="onClickTag('3')"
        >差评({{ state.poorCount }})</van-button
      >
    </van-cell>
    <!-- 评价列表 -->
    <div v-if="state.hasComment">
      <comment-item
        v-for="(item, index) in state.commentList"
        :reply="item"
        :key="item + index"
      ></comment-item>
    </div>
    <div v-else>
      <van-empty description="暂时还没有任何评价哦~" />
    </div>
  </van-cell-group>
</template>
<script setup>
import { reactive, computed } from "vue";
import { getCommentCount, getCommentByType } from "@/api/product";
import CommentItem from "@/components/CommentItem.vue";

const { productId } = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const state = reactive({
  commentAll: {},
  goodCount: computed(() => state.commentAll?.good_count || 0),
  inCount: computed(() => state.commentAll?.in_count || 0),
  poorCount: computed(() => state.commentAll?.poor_count || 0),
  sumCount: computed(() => state.commentAll?.sum_count || 0),
  replyChance: computed(() => state.commentAll?.reply_chance || 100),
  // 评论信息
  commentList: [],
  hasComment: computed(() => state.commentList.length),
  active: "0",
  isSum: computed(() => state.active === "0"),
  isGood: computed(() => state.active === "1"),
  isIn: computed(() => state.active === "2"),
  isPoor: computed(() => state.active === "3"),
});

const initData = async () => {
  const { data } = await getCommentCount(productId);
  if (data.status !== 200) return;
  state.commentAll = data.data;
};

const initCommentType = async (type) => {
  const { data } = await getCommentByType(productId, { type });
  if (data.status !== 200) return;
  state.commentList = data.data;
};

const onClickTag = (tag) => {
  state.active = tag;
  initCommentType(tag);
};

// 初始化数据
initData();
initCommentType("0");
</script>

<style lang="scss" scoped>
.comment {
  .tag {
    .van-button {
      margin-right: 10px;
      border-radius: 15px;
    }
    .active {
      background-color: #fbc546;
    }
  }
}
</style>
