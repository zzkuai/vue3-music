<script lang="ts">
export default {
  name: 'ComButton',
};
</script>
<script setup lang="ts">
import { throttle } from 'lodash-es';

const emits = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = throttle(
  function () {
    emits('click');
  },
  200,
  { trailing: false }
);
</script>
<template>
  <button class="com-button" @click="handleClick"><slot></slot></button>
</template>
<style scoped lang="less">
.com-button {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: var(--theme-color);
  border-radius: 25px;

  &:active {
    &::before {
      position: absolute;
      border-radius: 25px;
      content: '';
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
      background-color: black;
      opacity: 0.1;
    }
  }
}
</style>
