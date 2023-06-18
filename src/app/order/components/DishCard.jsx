/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'antd';

function DishCard({ dataDish }) {
  const {
    name, price, detail, url,
  } = dataDish;
  return (
    <Row justify="space-between" className="px-10 mt-24">
      <Row>
        <Col span={100}>
          <img
            alt="dish-img"
            width={100}
            height={100}
            src={url || 'https://image.vtc.vn/resize/th/upload/2022/08/19/long-heo-17534883.png'}
          />
        </Col>
        <Col className="dis-flex flex-column jc-space-between ml-12">
          <div className="fw-500 fs-16">{name}</div>
          <div className="fs-12 max-w-240">{detail}</div>
          <div className="primary fw-700 fs-18">
            {price}
            đ
          </div>
        </Col>
      </Row>
      <Col className="dis-flex flex-column jc-flex-end">
        <i className="ri-add-box-fill primary fs-30" />
      </Col>
    </Row>
  );
}

export default DishCard;
