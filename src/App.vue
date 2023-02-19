<script setup lang="ts">
import FooterTab from './components/FooterTab.vue';
import { useLoading } from '@/utils/use';
import { useRoute } from 'vue-router';

const route = useRoute();
const { loadingVisible } = useLoading();
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <div v-show="route.meta.tab" class="holder"></div>
  <FooterTab v-show="route.meta.tab"></FooterTab>

  <teleport to="body">
    <van-loading v-show="loadingVisible" class="loading"></van-loading>
  </teleport>
</template>

<style lang="less" scoped>
.loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.holder {
  height: 60px;
}
</style>
