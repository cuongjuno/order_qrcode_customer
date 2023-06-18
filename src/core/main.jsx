import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ja_JP';
import dayjs from 'dayjs';

import 'dayjs/locale/ja';

import Toast from '~components/toast';
import { COMMON_MSG } from '~constant/rules';

import theme from './config/theme';
import { VERSION } from './config/version';
import App from './App';

import '~styles/index.scss';

dayjs.locale('ja');

console.log('version: ', VERSION);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      locale={locale}
      form={{ requiredMark: false, colon: false, validateMessages: COMMON_MSG }}
      theme={theme}
    >
      <App />
      <Toast />
    </ConfigProvider>
  </React.StrictMode>,
);
