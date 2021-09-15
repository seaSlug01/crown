import React from 'react';

import './cart-item.scss';

const CartItem = ({
  item: { imageUrl, price, name, quantity },
  additionalClass
}) => (
  <div className={`cart-item ${additionalClass}`}>
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {quantity} x {price} EUR
      </span>
    </div>
    <img src={imageUrl} alt='item' />
  </div>
);

export default CartItem;
