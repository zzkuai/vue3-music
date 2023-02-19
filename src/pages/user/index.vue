<script lang="ts">
export default {
  name: 'UserIndex',
};
</script>
<script setup lang="ts">
import { onActivated, computed } from 'vue';
import { useUserStore } from '@/store/user';

const { user, getUserInfo } = useUserStore();

onActivated(getUserInfo);

// 我喜欢的音乐
const like = computed(() => {
  return user.playlist[0] || {};
});
// 创建的歌单
const create = computed(() => {
  return user.playlist.slice(1) || [];
});
</script>
<template>
  <div v-show="user.account.id" class="user">
    <div class="info">
      <img class="info-avatar" :src="user.profile.avatarUrl" alt="avatar" />
      <h2 class="info-name">{{ user.profile.nickname }}</h2>
      <ul class="info-tip ft-12">
        <li class="info-tip-item">{{ user.profile.follows }}&nbsp;关注</li>
        <li class="info-tip-item">{{ user.profile.followeds }}&nbsp;粉丝</li>
        <li class="info-tip-item">Lv.{{ user.level }}</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-left">
        <img class="card-img" :src="like.coverImgUrl" alt="like" />
      </div>
      <div class="card-right">
        <h3>我喜欢的音乐</h3>
        <span class="ft-12 card-tip">{{ like.trackCount }}首</span>
      </div>
    </div>
    <div class="card">
      <ul class="list">
        <li class="list-item">
          <span class="ft-12">创建歌单({{ create.length }}个)</span>
        </li>
        <li v-for="item in create" :key="item.id" class="list-item">
          <div class="card-left">
            <img :src="item.coverImgUrl" alt="" class="card-img" />
          </div>
          <div class="card-right">
            <h3>{{ item.name }}</h3>
            <span class="ft-12 card-tip">{{ item.trackCount }}首</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/styles/mixin.less';

.user {
  padding: 50px 20px;
  background-color: var(--page-color);

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 15px;
    padding: 20px 0 15px;
    background-color: var(--bg-color);

    &-avatar {
      .wh(60px);
      top: -30px;
      position: absolute;
      display: block;
      border-radius: 50%;
    }

    &-name {
      margin: 20px 0 10px;
      font-size: 18px;
    }

    &-tip {
      color: var(--tip-color);
      display: flex;
      align-items: center;

      &-item {
        margin-left: 20px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .card {
    display: flex;
    align-items: center;
    background-color: var(--bg-color);
    margin-top: 15px;
    border-radius: 15px;
    padding: 15px;

    &-img {
      .wh(50px);
      display: block;
      border-radius: 8px;
    }

    &-right {
      flex: 1;
      display: flex;
      margin-left: 10px;
      flex-direction: column;
      justify-content: center;
    }

    &-tip {
      color: var(--tip-color);
    }
  }

  .list {
    overflow: hidden;

    &-item {
      margin-top: 10px;
      display: flex;
      align-items: center;

      &:first-child {
        margin-top: 0;
        color: var(--tip-color);
      }
    }
  }
}
</style>
