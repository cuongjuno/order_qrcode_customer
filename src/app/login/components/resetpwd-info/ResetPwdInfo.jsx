import React from 'react';
import { Button } from 'antd';
import { useSetAtom } from 'jotai';

import LOGIN_STATUS_RENDER from '~login/constant';
import loginStatus from '~login/store';

function ResetPwdInfo() {
  const setStatus = useSetAtom(loginStatus);

  const backToLogin = () => setStatus(LOGIN_STATUS_RENDER.LOGIN);
  return (
    <div className="text-center">
      <div className="fs-24 fw-700 mb-20">パスワード再発行</div>
      <div className="mb-40">パスワード変更用のメールを送信しました</div>
      <div className="info-board">
        <div className="fw-700 mb-10">メールが届かない場合</div>
        <ul>
          <li>
            <div className="mr-6">・</div>
            <div>
              迷惑メールに振り分けられていたり、フィルターや転送設定によって受信ボックス以外の場所に保管されていないかご確認ください。
            </div>
          </li>
          <li>
            <div className="mr-6">・</div>
            <div>
              メール送信に時間がかかる場合がございます。数分待った上で、メールが届いているか再度ご確認ください。
            </div>
          </li>
          <li>
            <div className="mr-6">・</div>
            <div>
              ご使用のメールアドレスが正しいかどうか確認してください。正しくない場合はメールアドレスの再設定をお願いします。
            </div>
          </li>
        </ul>
      </div>
      <Button onClick={backToLogin} size="large" type="primary" className="back-login-btn">
        ログイン画面に戻る
      </Button>
    </div>
  );
}

export default ResetPwdInfo;
