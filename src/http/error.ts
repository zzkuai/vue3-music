import { ResponseData } from '@/typings/http';
import { AxiosError } from 'axios';
import { showToast } from 'vant';

const REQUEST_ERROR_MESSAGE = '请求失败，请稍后重试';
const REQUEST_TIMEOUT_ERROR = '请求超时，请稍后重试';
const REQUEST_NETWORK_ERROR = '网络错误，请稍后重试';

export function errorToast(error: string = REQUEST_ERROR_MESSAGE) {
  let message: string;

  if (error.includes('timeout')) {
    message = REQUEST_TIMEOUT_ERROR;
  } else if (error.includes('network')) {
    message = REQUEST_NETWORK_ERROR;
  } else {
    message = error;
  }

  showToast(message);
}

export function handleResponseError(
  error: AxiosError<ResponseData<any>> | Error
) {
  if ('response' in error && error.response) {
    const { message, msg } = error.response.data;
    errorToast(message || msg);
  } else {
    errorToast(error.message);
  }
}
