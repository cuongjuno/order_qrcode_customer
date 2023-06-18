import React from 'react';

import Category from './components/Category';

import './Order.scss';

const items = [
  {
    label: 'Dog meat',
    value: 'dogmeat',
  },
  {
    label: 'Soup',
    value: 'soup',
  },
  {
    label: 'Salad',
    value: 'salad',
  },
  {
    label: 'Seafood',
    value: 'seafood',
  },
  {
    label: 'Cake',
    value: 'cake',
  },
  {
    label: 'Cake1',
    value: 'cake1',
  },
  {
    label: 'Cake2',
    value: 'cake2',
  },
  {
    label: 'Cake3',
    value: 'cake3',
  },
  {
    label: 'Cake4',
    value: 'cake4',
  },
  {
    label: 'Cake5',
    value: 'cake5',
  },
];
function Order() {
  return <Category items={items} />;
}

export default Order;
