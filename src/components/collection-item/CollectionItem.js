import React from 'react';
import { connect } from 'react-redux';

import { FiShoppingCart } from 'react-icons/fi';

// Components
import CustomButton from '../custom-button/CustomButton';

// Actions
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.scss';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      ></div>
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}&euro;</span>
      </div>
      <CustomButton onClick={() => addItem(item)} gradient>
        <div className='text'>Add To Cart </div>
        <div className='icon'>
          <FiShoppingCart />
        </div>
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
