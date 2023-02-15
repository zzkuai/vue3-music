import { computed, ref, inject, watch } from 'vue';
import { throttle } from 'lodash-es';
import { showToast } from 'vant';
import { useCountDown } from '@vant/use';
import { PHONE_REG } from '@/utils/regexp';
import { sendSms, login } from '@/http/api/login';
import { useRouter } from 'vue-router';
import { KEY_SET_LOADING } from '@/utils/keys';
import { SetLoading } from '@/typings/common';
import { useUserStore } from '@/store/user';

export function useSendSms() {
  const phone = ref('');
  const phoneEl = ref<HTMLInputElement>();
  const phoneFocus = ref(false);
  const router = useRouter();
  const userStore = useUserStore();
  const clearVisible = computed(() => {
    return phone.value && phoneFocus.value;
  });
  const setLoading = inject(KEY_SET_LOADING) as SetLoading;

  const verify = () => {
    let message = '';
    if (!phone.value) {
      message = '请输入手机号';
    } else if (!PHONE_REG.test(phone.value)) {
      message = '请输入11位数字的手机号';
    }
    return message;
  };
  const login = () => {
    const message = verify();
    if (message) {
      phoneEl.value?.focus();
      showToast(message);
      return;
    }
    setLoading(true);
    sendSms(phone.value)
      .then(() => {
        showToast('发送成功，请查收');
        userStore.setUser({ phone: phone.value });
        router.push({
          name: 'LoginVerify',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const clear = () => {
    phone.value = '';
    phoneEl.value?.focus();
  };

  return {
    phone,
    phoneEl,
    phoneFocus,
    clear,
    clearVisible,
    login,
  };
}

export function useLoginCountDown() {
  const { start, reset, current } = useCountDown({
    time: 60_000,
  });
  const { user } = useUserStore();
  const setLoading = inject(KEY_SET_LOADING) as SetLoading;

  // 开启倒计时
  start();

  const isCounting = computed(() => {
    return current.value.seconds > 0;
  });
  const prefix = computed(() => {
    return current.value.seconds > 0 && current.value.seconds < 10 ? '0' : '';
  });
  const text = computed(() => {
    return isCounting.value
      ? `重新发送${prefix.value + '' + current.value.seconds}s`
      : '重新发送';
  });

  const reSend = throttle(
    function () {
      if (isCounting.value) return;
      setLoading(true);

      sendSms(user.phone as string).then(() => {
        setLoading(false);
        reset();
        start();
      });
    },
    200,
    { trailing: false }
  );

  return {
    text,
    reSend,
    isCounting,
  };
}

export function useLogin() {
  const code = ref('');
  const { user } = useUserStore();
  const router = useRouter();
  const setLoading = inject(KEY_SET_LOADING) as SetLoading;

  watch(code, (nv) => {
    if (nv.length >= 4) {
      setLoading(true);
      login({
        phone: user.phone as string,
        captcha: code.value,
      })
        .then(() => {
          showToast('登录成功');
          router.go(-2);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  return { code };
}
