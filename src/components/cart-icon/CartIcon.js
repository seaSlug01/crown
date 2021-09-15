import React from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Actions
import { cartShow } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

function CartIcon({ cartShow, itemCount }) {
  const location = useLocation();
  return (
    <div
      className='cart option'
      onMouseOver={() => {
        if (location.pathname === '/checkout') {
          return false;
        } else {
          cartShow();
        }
      }}
    >
      <pre>CART</pre>
      <div className='cart-icon'>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  cartShow: () => dispatch(cartShow())
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
