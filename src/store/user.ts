import { User, UserAccount, UserDetail, UserPlaylist } from '@/typings/user';
import {
  getUserAccount,
  getUserDetail,
  getUserPlaylist,
} from '@/http/api/user';
import { defineStore } from 'pinia';
import { reactive, inject } from 'vue';
import { KEY_SET_LOADING } from '@/utils/keys';
import { SetLoading } from '@/typings/common';

type UserInfo = User & UserAccount & UserDetail & UserPlaylist;

export const useUserStore = defineStore('user', () => {
  const user = reactive<UserInfo>({
    phone: '',
    level: 0,
    account: {
      id: 0,
      createTime: 0,
    },
    profile: {
      follows: 0,
      followeds: 0,
      nickname: '',
      avatarUrl: '',
      signature: '',
    },
    playlist: [],
  });
  const setLoading = inject(KEY_SET_LOADING) as SetLoading;

  function setUser(data: Partial<UserInfo>) {
    Object.assign(user, data);
  }

  async function getUserInfo() {
    if (user.account.id) return;
    setLoading(true);
    const { account, profile } = await getUserAccount();
    const result = await Promise.all([
      getUserDetail(account.id),
      getUserPlaylist(account.id),
    ]);
    setLoading(false);
    const { level, profile: detailProfile } = result[0];
    const { playlist } = result[1];
    setUser({
      level,
      account,
      playlist,
      profile: {
        ...profile,
        ...detailProfile,
      },
    });
  }

  return { user, setUser, getUserInfo };
});
