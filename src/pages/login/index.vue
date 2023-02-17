<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
import { Popover } from 'vant';
import { throttle } from 'lodash-es';
import 'vant/es/popover/style';
import ComButton from '@/components/ComButton.vue';
import { useSendSms, useQrLogin } from './use';
const {
  phone,
  phoneEl,
  phoneFocus,
  clear: reset,
  clearVisible,
  login,
} = useSendSms();
const { qrImg, qrVisible, getQrImg, invalidate, clear, retry } = useQrLogin();

const handleQrcodeClick = throttle(
  function () {
    if (qrVisible.value) return;
    getQrImg();
  },
  200,
  { trailing: false }
);
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
        @click="reset"
      >
        <img class="clear-img" src="@/images/common/clear.png" />
      </span>
    </div>
    <ComButton @click="login">下一步</ComButton>
    <div class="login-qrcode">
      <Popover
        v-model:show="qrVisible"
        :close-on-click-action="false"
        @closed="clear"
      >
        <template #default>
          <div class="qrcode" @click="retry">
            <span v-if="invalidate">点击重试</span>
            <template v-else>
              <img
                v-show="qrImg"
                class="qrcode-img"
                :src="qrImg"
                alt="qrcode"
              />
              <span class="qrcode-tip">请打开网易云音乐APP，扫码进行登录</span>
            </template>
          </div>
        </template>
        <template #reference>
          <img
            class="qrcode-icon"
            src="./images/qrcode.png"
            alt="qrcode"
            @click="handleQrcodeClick"
          />
        </template>
      </Popover>
    </div>
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

  .clear-img {
    .wh(16px);
  }

  &-qrcode {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
  }

  .qrcode-icon {
    .wh(80px);
    padding: 10px;
  }
}
</style>

<style lang="less">
@import '@/styles/mixin.less';

.qrcode {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--tip-color);
  padding: 5px 10px 15px;

  &-img {
    display: block;
    .wh(200px);
  }

  &-tip {
    font-size: 12px;
  }
}
</style>
