export function getMaskPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
}
