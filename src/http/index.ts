import { RequestData, ResponseData } from '@/typings/http';
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
  data = isPost ? { data } : { params: data };
  data.timestamp = Date.now();

  return {
    headers,
    ...data,
  };
}

async function http<T>(method: Method, url: string, data: RequestData = {}) {
  const isPost = method.toUpperCase() === 'POST';
  const info = getRequestInfo(isPost, data);

  const res = await instance.request<ResponseData<T>>({
    method,
    url,
    ...info,
  });

  const { code, message, msg, data: resData, ...props } = res.data;

  if (RESPONSE_SUCCESS_CODE.includes(code)) {
    return Promise.resolve({ code, message, ...resData, ...props });
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
