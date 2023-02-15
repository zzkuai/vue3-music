import { LoginData } from '@/typings/login';
import { get, post } from '..';

export function sendSms(phone: string) {
  return get('/captcha/sent', { phone });
}

export function login(data: LoginData) {
  return post('/login/cellphone', data);
}
