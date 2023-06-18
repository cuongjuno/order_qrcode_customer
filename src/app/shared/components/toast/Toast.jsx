import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useAtom } from 'jotai';

import TOAST_TYPE from './constant';
import toastAtom from './store';

import './Toast.scss';

const notificationConfigure = {
  duration: 3,
  placement: 'top',
  closeIcon: null,
};

function Toast() {
  const [notifyApi, contextHolder] = notification.useNotification();
  const [notiMessage] = useAtom(toastAtom);
  const { type, message } = notiMessage;

  const openNotification = () => {
    if (message && type) {
      let icon;
      let className = 'toast-message';
      switch (type) {
        case TOAST_TYPE.ERROR:
          icon = <i className="ri-close-circle-fill" />;
          className = `${className} noti-error bg-error-fill`;
          break;
        case TOAST_TYPE.WARNING:
          icon = <i className="ri-error-warning-fill" />;
          className = `${className} noti-warning bg-warning-fill`;
          break;
        default:
          icon = <i className="ri-checkbox-circle-fill" />;
          className = `${className} noti-success bg-safe-fill`;
          break;
      }
      notifyApi[type]({
        ...notificationConfigure,
        className,
        message,
        icon,
      });
    }
  };

  useEffect(() => {
    if (type && message) {
      openNotification();
    }
  }, [notiMessage]);

  return contextHolder;
}

export default Toast;
