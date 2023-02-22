import { PlaylistInfo } from './playlist';

export interface User {
  phone: string;
}

interface Account {
  id: number;
  createTime: number;
}

export interface Profile {
  avatarUrl: string;
  nickname: string;
  signature: string;
}

export interface UserAccount {
  account: Account;
  profile: Profile;
}

interface UserDetailProfile {
  follows: number;
  followeds: number;
}

export interface UserDetail {
  level: number;
  profile: UserDetailProfile;
}

export interface UserPlaylist {
  playlist: PlaylistInfo[];
}
