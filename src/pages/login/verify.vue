<script lang="ts">
export default {
  name: 'LoginVerify',
};
</script>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { getMaskPhone } from '@/utils/mask';
import { useLogin, useLoginCountDown } from './use';

const { user } = useUserStore();
const maskPhone = computed(() => {
  return getMaskPhone(user.phone as string);
});
const { text, isCounting, reSend } = useLoginCountDown();
const { code } = useLogin();

const codeEl = ref<HTMLInputElement>();
onMounted(() => {
  (codeEl.value as HTMLInputElement).focus();
});
</script>
<template>
  <div class="verify">
    <h2>请输入验证码</h2>
    <div class="verify-tip ft-12">
      <span>已发送至 {{ maskPhone }}</span>
      <span class="send ft-14" :class="{ active: !isCounting }" @click="reSend">
        {{ text }}
      </span>
    </div>
    <div class="verify-input">
      <ul class="code-list">
        <li
          v-for="(k, i) in 4"
          :key="k"
          :class="{ active: code[i] }"
          class="code"
        >
          {{ code[i] }}
        </li>
      </ul>
      <input
        ref="codeEl"
        v-model="code"
        class="code-input"
        type="tel"
        max="4"
        maxlength="4"
      />
    </div>
  </div>
</template>
<style scoped lang="less">
.verify {
  padding: 30px 20px 0 20px;

  &-tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    color: var(--tip-color);

    .send {
      &.active {
        color: var(--link-color);
      }
    }
  }

  &-input {
    position: relative;
    margin-top: 20px;
  }

  .code {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    height: 40px;

    &::before,
    &::after {
      position: absolute;
      content: '';
      height: 1px;
      bottom: 0;
      left: 0;
    }

    &::before {
      width: 100%;
      z-index: 1;
      background-color: var(--border-color);
    }

    &::after {
      z-index: 2;
      width: 0;
      transition: width 0.2s;
      background-color: var(--text-color);
    }

    &.active {
      &::after {
        width: 100%;
      }
    }

    &:first-child {
      margin-left: 0;
    }

    &-list {
      width: 100%;
      display: flex;

      padding: 0 40px;
    }

    &-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 10;
      user-select: none;
      touch-action: none;
    }
  }
}
</style>
