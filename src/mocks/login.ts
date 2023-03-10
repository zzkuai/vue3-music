export default {
  '/captcha/sent': {
    code: 200,
    data: true,
  },
  '/login/cellphone': {
    code: 200,
    data: {},
  },
  '/login/qr/key': {
    code: 200,
    data: {
      unikey: '6caa0c00-9345-4534-805e-4a87a6c90ea8',
    },
  },
  '/login/qr/create': {
    code: 200,
    data: {
      qrimg:
        'data:image/png;base64,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',
    },
  },
  '/login/qr/check': {
    code: 801,
    message: '??????????????????,???????????????',
    data: {},
  },
};
