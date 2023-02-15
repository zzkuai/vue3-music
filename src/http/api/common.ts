import { BannerData } from '@/typings/common';
import { get } from '..';

// 获取轮播图
export function getBanner() {
  return get<BannerData>('/banner');
}
