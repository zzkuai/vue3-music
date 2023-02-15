import { SetLoading } from '@/typings/common';
import { ref, provide } from 'vue';
import { KEY_SET_LOADING } from './keys';

export function useLoading() {
  const loadingVisible = ref(false);

  const setLoading: SetLoading = (visible) => {
    loadingVisible.value = visible;
  };
  provide(KEY_SET_LOADING, setLoading);

  return {
    loadingVisible,
  };
}
