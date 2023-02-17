import { LoginData, QrImgData, QrKeyData } from '@/typings/login';
import { get, post } from '..';

export function sendSms(phone: string) {
  return get('/captcha/sent', { phone });
}

export function login(data: LoginData) {
  return post('/login/cellphone', data);
}

export function getQrKey() {
  return get<QrKeyData>('/login/qr/key');
}

export function getQrCode(key: QrKeyData['unikey']) {
  return get<QrImgData>('/login/qr/create', { key, qrimg: true });
}

export function qrLogin(key: QrKeyData['unikey']) {
  return get('/login/qr/check', { key });
}
