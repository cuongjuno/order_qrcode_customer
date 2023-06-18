import React from 'react';
import { Button } from 'antd';

function ScanPage() {
  return (
    <div>
      <div className="mt-160 fs-20 fw-500 text-center">
        <div>Chào mừng bạn tới với</div>
        <div>XYZ</div>
      </div>
      <div className="w-144 h-1 bg-black-030 m-auto my-16" />
      <div className="fs-24 text-center">Bạn đang ngồi tại</div>
      <div className="fs-32 text-center fw-500">Bàn số 15</div>
      <div className="dis-flex jc-center mt-96">
        <Button className="px-40" type="primary" size="large">
          Đăng nhập/Đăng kí QR Order
        </Button>
      </div>
    </div>
  );
}

export default ScanPage;
