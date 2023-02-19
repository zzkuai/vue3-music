import { get } from '..';
import { UserAccount, UserDetail, UserPlaylist } from '@/typings/user';

export function getUserSubAccount() {
  return get('/user/subcount');
}

export function getUserAccount() {
  return get<UserAccount>('/user/account');
}

export function getUserDetail(uid: number) {
  return get<UserDetail>('/user/detail', { uid });
}

export function getUserPlaylist(uid: number) {
  return get<UserPlaylist>('/user/playlist', { uid });
}
