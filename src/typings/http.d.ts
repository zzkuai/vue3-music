export type RequestData = Record<string, any>;

// 二维码登录状态 800:过期  801:等待扫码  802:待确认  803:授权登录成功
export type QRCODE_STATUS_CODE = 800 | 801 | 802 | 803;

export interface ResponseData<T> {
  code: 200 | 301 | QRCODE_STATUS_CODE;
  message: string;
  msg: string;
  data: T;
}

export type ResponseDataWithoutData = Omit<ResponseData<T>, 'data'>;
