import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/CustomButton';
import CartItem from '../cart-item/CartItem';

// Actions
import { cartHide, cartShow } from '../../redux/cart/cart.actions.js';
// Selectors
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import './cart-dropdown.scss';

import { motion } from 'framer-motion';

const cartSidebarVariant = {
  hidden: {
    x: '100%'
  },
  show: {
    x: 0,
    transition: { duration: 0.75, ease: 'easeOut' }
  },
  exit: {
    x: '100%',
    transition: { duration: 0.75, ease: 'easeOut' }
  }
};

const CartDropdown = ({
  cartItems,
  history,
  dispatch,
  hidden,
  cartHide,
  cartShow
}) => {
  return (
    <motion.div
      variants={cartSidebarVariant}
      initial='hidden'
      animate='show'
      exit='exit'
      className='cart-dropdown'
      onMouseLeave={e => {
        cartHide();
      }}
    >
      {cartItems.length ? (
        <div className='cart-items'>
          <span className='cart-header'>SHOPPING CART</span>
          <div className='cart-items-cont'>
            {cartItems.map((cartItem, index, array) => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                additionalClass={
                  array.length === 3 && index === 2
                    ? 'no-border-and-padding-bottom'
                    : ''
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='cart-items'>
          <span className='cart-header'>SHOPPING CART</span>
          <span className='empty-message'>Your cart is empty.</span>
        </div>
      )}
      {cartItems.length ? (
        <div className='button-cont'>
          <CustomButton
            onClick={() => {
              history.push('/checkout');
              cartHide();
            }}
          >
            PROCEED TO CHECKOUT
          </CustomButton>
        </div>
      ) : (
        ''
      )}
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  cartHide: () => dispatch(cartHide()),
  cartShow: () => dispatch(cartShow())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
