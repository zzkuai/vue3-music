export interface Banner {
  encodeId: string;
  imageUrl: string;
  titleColor: string;
  typeTitle: string;
}

export interface BannerData {
  banners: Banner[];
}

export type SetLoading = (visible: boolean) => void;
