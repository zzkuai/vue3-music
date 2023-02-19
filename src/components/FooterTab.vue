<script lang="ts">
export default {
  name: 'FooterTab',
};
</script>
<script setup lang="ts">
import homeImg from '@/images/tab/home.png';
import homeActiveImg from '@/images/tab/home-active.png';
import meImg from '@/images/tab/me.png';
import meActiveImg from '@/images/tab/me-active.png';

const tabs = [
  {
    name: 'home',
    path: '/home',
    text: '发现',
    icon: homeImg,
    activeIcon: homeActiveImg,
  },
  {
    name: 'user',
    path: '/user',
    text: '我的',
    icon: meImg,
    activeIcon: meActiveImg,
  },
];
</script>
<template>
  <ul class="tab">
    <li v-for="tab in tabs" :key="tab.name" class="tab-item">
      <router-link v-slot="{ navigate, isActive }" custom :to="tab.path">
        <div
          class="tab-link ft-10"
          :class="{ active: isActive }"
          @click="navigate"
        >
          <img
            class="tab-icon"
            :src="isActive ? tab.activeIcon : tab.icon"
            :alt="tab.name"
          />
          <span>{{ tab.text }}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>
<style scoped lang="less">
@import '@/styles/mixin.less';
.tab {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
  background-color: var(--page-color);

  &-item {
    flex: 1;
  }

  &-link {
    .wh(100%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: var(--tip-color);
    font-weight: 500;

    &.active {
      color: var(--theme-color);
    }
  }

  &-icon {
    .wh(24px);
  }
}
</style>
