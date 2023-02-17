import { computed, ref, inject, watch, onDeactivated } from 'vue';
import { throttle } from 'lodash-es';
import { showToast } from 'vant';
import { useCountDown } from '@vant/use';
import { PHONE_REG } from '@/utils/regexp';
import { sendSms, login, getQrKey, getQrCode, qrLogin } from '@/http/api/login';
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

export function useQrLogin() {
  let timer: null | NodeJS.Timeout;
  const qrImg = ref('');
  const qrVisible = ref(false);
  const invalidate = ref(false);
  const router = useRouter();
  const setLoading = inject(KEY_SET_LOADING) as SetLoading;

  async function getQrImg() {
    setLoading(true);
    try {
      invalidate.value = false;
      const res = await getQrKey();
      const data = await getQrCode(res.unikey);
      qrImg.value = data.qrimg;
      checkStatus(res.unikey);
    } finally {
      setLoading(false);
    }
  }

  function checkStatus(key: string) {
    timer = setInterval(() => {
      qrLogin(key).then((res) => {
        const { code, message } = res;
        if (code === 800 || code === 803) {
          clear();
          showToast(message);
        }
        if (code === 800) {
          invalidate.value = true;
        }
        if (code === 803) {
          router.back();
        }
      });
    }, 1000);
  }

  function clear() {
    timer && clearInterval(timer);
    qrImg.value = '';
    timer = null;
  }

  function retry() {
    if (!invalidate.value) return;
    getQrImg();
  }

  onDeactivated(clear);

  return { qrImg, qrVisible, invalidate, getQrImg, clear, retry };
}
