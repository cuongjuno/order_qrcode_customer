import React from 'react';
import PropTypes from 'prop-types';

import DishCard from './DishCard';

CategoryTabPane.propTypes = {};

const dishes = [
  {
    name: 'Chó hấp',
    detail:
      'Món thịt hấp dai ngọt ăn kèm lá mơ, riềng, sả chấm thêm ít mắm tôm với chanh, đường, ớt',
    price: '120.000',
    url: 'https://4.bp.blogspot.com/-meDIQWecl4Q/VIFBZ8Ai-LI/AAAAAAAAB0w/inj1usre35c/s1600/thit%2Bdui%2B2.jpg',
  },
  {
    name: 'Dựa mận',
    detail: 'Dựa mận hơi sền sệt, đậm đà, thịt mềm ngọt hòa quyện với riềng, sả và lá mơ',
    price: '150.000',
    url: 'https://hanhphucgiadinh.vn/wp-content/uploads/2014/10/126.jpg',
  },
  {
    name: 'Chó xào lăn',
    detail: 'Vị ngậy của lạc rang , chua ngọt của dưa, mềm mềm dai dai của thịt chó',
    price: '120.000',
    url: 'https://emvaobep.com/wp-content/uploads/2017/03/cach-che-bien-thit-cho-xao-lan-01.jpg',
  },
  {
    name: 'Chó nướng(chả chìa)',
    detail: 'Sau khi tẩm ướp nghệ, riềng, mắm tôm sẽ được nướng trên than hồng cho xém cạnh',
    price: '150.000',
    url: 'https://hc.com.vn/i/ecommerce/media/ckeditor_3513956.jpg',
  },
  {
    name: 'Tiết canh',
    detail: 'Tiết với hịt da đầu, lưỡi băm nhỏ, sau đó trộn với rau răm, húng chó, hành khô nướng…',
    price: '60.000',
    url: 'https://vnn-imgs-f.vgcloud.vn/2019/08/05/08/tiet-canh.jpg',
  },
  {
    name: 'Chó nấu măng',
    detail: '',
    price: '140.000',
    url: 'https://chedoan.com/wp-content/uploads/2022/09/cach-lam-thit-cho-nau-mang-1.jpeg',
  },
];

function CategoryTabPane(props) {
  return (
    <div>
      <div>
        <img
          src="https://thegioidiengiai.com/images/media/5-nhom-nguoi-khong-nen-an-thit-cho.jpg?1536833453235"
          alt="bg-cover"
          width="100%"
          height={180}
        />
      </div>
      {dishes?.map((item) => (
        <DishCard key={item?.name} dataDish={item} />
      ))}
    </div>
  );
}

export default CategoryTabPane;
