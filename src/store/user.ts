import { UserData } from '@/typings/user';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = reactive<UserData>({
    phone: '',
  });

  function setUser(data: UserData) {
    Object.assign(user, data);
  }

  return { user, setUser };
});
