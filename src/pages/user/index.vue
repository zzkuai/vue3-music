<script lang="ts">
export default {
  name: 'UserIndex',
};
</script>
<script setup lang="ts">
import { onActivated, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { PlaylistInfo } from '@/typings/playlist';

const { user, getUserInfo } = useUserStore();
const router = useRouter();

onActivated(getUserInfo);

// 收藏的歌单
const collect = computed(() => {
  return user.playlist.filter((i) => i.subscribed);
});

// 用户创建的歌单
const list = computed(() => {
  return user.playlist.filter((i) => !i.subscribed);
});

// 我喜欢的音乐
const like = computed(() => {
  return list.value[0] || {};
});
// 创建的歌单
const create = computed(() => {
  return list.value.slice(1) || [];
});

function handleClick(item: PlaylistInfo) {
  router.push({
    name: 'PlaylistDetail',
    params: {
      id: item.id,
    },
  });
}
</script>
<template>
  <div class="user">
    <div class="info">
      <img
        class="info-avatar"
        :src="`${user.profile.avatarUrl}?param=180y180`"
        alt="avatar"
      />
      <h2 class="info-name">{{ user.profile.nickname }}</h2>
      <ul class="info-tip ft-12">
        <li class="info-tip-item">{{ user.profile.follows }}&nbsp;关注</li>
        <li class="info-tip-item">{{ user.profile.followeds }}&nbsp;粉丝</li>
        <li class="info-tip-item">Lv.{{ user.level }}</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-left">
        <img
          class="card-img"
          :src="`${like.coverImgUrl}?param=150y150`"
          alt="like"
        />
      </div>
      <div class="card-right">
        <h3>我喜欢的音乐</h3>
        <span class="ft-12 card-tip">{{ like.trackCount }}首</span>
      </div>
    </div>
    <div class="card">
      <ul class="list">
        <li class="list-item">
          <p class="ft-12">创建歌单({{ create.length }}个)</p>
        </li>
        <li
          v-for="item in create"
          :key="item.id"
          class="list-item"
          @click="handleClick(item)"
        >
          <div class="card-left">
            <img
              :src="`${item.coverImgUrl}?param=150y150`"
              alt=""
              class="card-img"
            />
          </div>
          <div class="card-right">
            <h3 class="card-title">{{ item.name }}</h3>
            <span class="ft-12 card-tip">{{ item.trackCount }}首</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="card">
      <ul class="list">
        <li class="list-item">
          <p class="ft-12">
            收藏歌单
            <span v-show="collect.length">({{ collect.length }}个)</span>
          </p>
        </li>
        <li v-for="item in collect" :key="item.id" class="list-item">
          <div class="card-left">
            <img
              :src="`${item.coverImgUrl}?param=150y150`"
              alt=""
              class="card-img"
            />
          </div>
          <div class="card-right">
            <h3 class="card-title">{{ item.name }}</h3>
            <span class="ft-12 card-tip"
              >{{ item.trackCount }}首, by {{ item.creator.nickname }}</span
            >
          </div>
        </li>
        <li v-show="!collect.length" class="list-item empty ft-12">
          暂无收藏的歌单
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

    &-left {
      min-width: 50px;
      flex-basis: 50px;
    }

    &-right {
      flex: 1;
      display: flex;
      margin-left: 10px;
      width: 0;
      min-width: 0;
      flex-direction: column;
      justify-content: center;
    }

    &-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &-tip {
      color: var(--tip-color);
    }
  }

  .list {
    width: 100%;
    &-item {
      margin-top: 10px;
      display: flex;
      align-items: center;

      &:first-child {
        margin-top: 0;
        color: var(--tip-color);
      }

      &.empty {
        justify-content: center;
        color: var(--tip-color);
        padding: 15px;
      }
    }
  }
}
</style>
