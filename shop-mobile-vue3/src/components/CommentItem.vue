<template>
  <van-cell class="comment-item">
    <div class="user-info">
      <img :src="reply?.avatar" alt="" />
      <span class="nickname" v-text="reply?.nickname"></span>
      <van-rate v-model="star" readonly size="12" />
    </div>
    <p class="time">{{ reply?.add_time }} {{ reply?.sku }}</p>
    <p class="comment-content" v-text="reply?.comment"></p>
    <ul class="comment-img">
      <li v-for="(item, index) in pics" :key="item + index">
        <img :src="item" alt="" />
      </li>
    </ul>
  </van-cell>
</template>
<script setup>
import { computed } from "vue";
const { reply } = defineProps({
  reply: {
    type: Object,
    required: true,
  },
});

const star = computed(() => Number(reply?.star));
const pics = computed(() => reply?.pics)
</script>
<style lang="scss" scoped>
// 评论详情
.comment {
  .comment-item {
    padding: 10px 15px 20px;
    .user-info {
      font-size: 13px;
      display: flex;
      align-items: center;
      padding: 7px 0;
      img {
        width: 28px;
        height: 28px;
      }
      .nickname {
        padding: 0 10px 0 6px;
      }
    }
    .time {
      font-size: 12px;
      color: #82848f;
      padding: 5px 0;
    }
    .comment-content {
      font-size: 13px;
      margin-bottom: 10px;
    }
    .comment-img {
      li {
        float: left;
        padding-right: 8px;
        img {
          width: 78px;
          height: 78px;
        }
      }
    }
  }
}
</style>
