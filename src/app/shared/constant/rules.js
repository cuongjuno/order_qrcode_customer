import MESSAGES from './messages';

/* eslint-disable no-template-curly-in-string */
export const REGEX = {
  NUMBER: new RegExp(/^\d+$/),
  TEL: new RegExp(/^[-\d]{1,13}$/),
  TEXT_WITHOUT_JAPANESE: new RegExp(/^[a-zA-Z0-9!@#\\$%\\^\\&*\\)\\(+=._-]+$/g),
  DECIMAL_2_PLACES: new RegExp(/^\d*(\.\d{0,2})?$/),
  WEIGHT: new RegExp(/^\d{1,5}(\.\d{1,2})?$/),
  LAT: new RegExp(/^(-?[1-8]?\d(?:\.\d{1,14})?|90(?:\.0{1,14})?)$/),
  LNG: new RegExp(/^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,14})?|180(?:\.0{1,14})?)$/),
  HOUR_AMOUNT: new RegExp(/^([1-9]?\d)(\.\d{1,2})?$/),
  TEXT_PASSWORD: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{12,}$/),
  HIRAGANA: new RegExp(/^([ぁ-ん]|ー)+$/),
  HIRAGANA_WITH_NUMBER_AND_SPECIAL_CHARACTER: new RegExp(
    /^([ぁ-ん0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\s*]|ー)+$/,
  ),
};

export const COMMON_MSG = {
  required: '${label}は必須入力です。',
  string: {
    min: '${min} 文字以上で入力してください',
    max: '入力可能な文字数を超えています。${max}文字以下で入力して下さい。',
    range: 'パスワードは半角英数記号${min}桁以上${max}桁以下で入力してください。',
  },
};

export const RULES = {
  REQUIRED: { required: true },
  MIN: (min) => ({ min }),
  MAX: (max) => ({ max }),
  RANGE: (min, max) => ({
    min,
    max,
  }),
  CUSTOM:
    (func) => ({ getFieldValue }) => ({
      validator(rule, value) {
        return func(getFieldValue, value, rule);
      },
    }),
  TEL: {
    message: MESSAGES[10],
    pattern: REGEX.TEL,
  },
};
