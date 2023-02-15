<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
import ComButton from '@/components/ComButton.vue';
import { useSendSms } from './use';
const { phone, phoneEl, phoneFocus, clear, clearVisible, login } = useSendSms();
</script>
<template>
  <div class="login">
    <h2 class="login-title">登录体验更多精彩</h2>
    <span class="login-tip">未注册手机号登录后将自动创建账号</span>
    <div class="login-phone">
      <input
        ref="phoneEl"
        v-model="phone"
        maxlength="11"
        class="login-input"
        type="tel"
        placeholder="请输入手机号"
        @focus="phoneFocus = true"
        @blur="phoneFocus = false"
      />
      <span
        v-show="clearVisible"
        class="login-clear"
        @mousedown.prevent
        @click="clear"
      >
        <img class="login-img" src="@/images/common/clear.png" />
      </span>
    </div>
    <ComButton @click="login">下一步</ComButton>
  </div>
</template>
<style scoped lang="less">
@import '@/styles/mixin.less';

.login {
  padding: 30px 20px 0 20px;

  &-title {
    font-size: 16px;
  }

  &-tip {
    margin-top: 5px;
    font-size: 12px;
    color: var(--tip-color);
  }

  &-phone {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 35px;
    border-bottom: 1px solid var(--border-color);
  }

  &-input {
    height: 30px;
    line-height: 30px;
    width: 100%;
    font-weight: 500;
    font-size: 14px;
  }

  &-clear {
    display: flex;
    align-items: center;
    padding: 5px;
  }

  &-img {
    .wh(16px);
  }
}
</style>
