import {
  RequestData,
  ResponseData,
  ResponseDataWithoutData,
} from '@/typings/http';
import axios, { Method } from 'axios';
import { handleResponseError } from './error';

const instance = axios.create({
  baseURL: '/music-api',
  timeout: 10_000,
  withCredentials: true,
});

// 请求成功响应 code 值
const RESPONSE_SUCCESS_CODE = [200, 800, 801, 802, 803];

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    handleResponseError(error);
    return Promise.reject(error);
  }
);

function getRequestInfo(isPost: boolean, data: RequestData) {
  const headers = isPost ? { 'Content-Type': 'application/json' } : {};
  data.timestamp = Date.now();
  data = isPost ? { data } : { params: data };

  return {
    headers,
    ...data,
  };
}

async function http<T>(method: Method, url: string, data: RequestData = {}) {
  const isPost = method.toUpperCase() === 'POST';
  const info = getRequestInfo(isPost, data);

  if (import.meta.env.DEV) {
    console.log('---- request data ----', url, info);

    // return new Promise<ResponseDataWithoutData & T>((resolve) => {
    //   setTimeout(() => {
    //     import('@/mocks/index').then((res) => {
    //       const { default: data } = res;
    //       const u = url as keyof typeof data;
    //       const { data: resData, ...props } = data[
    //         u
    //       ] as unknown as ResponseData<T>;
    //       const result = {
    //         ...resData,
    //         ...props,
    //       };
    //       if (import.meta.env.DEV) {
    //         console.log('---- response data ----', url, data[u]);
    //       }
    //       return resolve(result);
    //     });
    //   }, 500);
    // });
  }

  const res = await instance.request<ResponseData<T>>({
    method,
    url,
    ...info,
  });

  const { code, message, msg, data: resData, ...props } = res.data;

  if (import.meta.env.DEV) {
    console.log('---- response data ----', url, res.data);
  }

  if (RESPONSE_SUCCESS_CODE.includes(code)) {
    return Promise.resolve({
      code,
      msg,
      message,
      ...resData,
      ...props,
    });
  } else {
    handleResponseError(new Error(message || msg));
    return Promise.reject(new Error(message || msg));
  }
}

export function get<T>(url: string, data?: RequestData) {
  return http<T>('get', url, data);
}

export function post<T>(url: string, data?: RequestData) {
  return http<T>('post', url, data);
}
