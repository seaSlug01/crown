import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CSSTransition } from 'react-transition-group';
import CSSTransitionHOC from '../../components/css-transition-hoc/CSSTransitionHOC';
import { AnimatePresence } from 'framer-motion';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

import CustomButton from '../../components/custom-button/CustomButton';

import './checkout.scss';

import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import Modal from '../../components/modal/Modal';
import StripeModal from '../../components/stripe-modal/StripeModal';

const CheckoutPage = ({ cartItems, total }) => {
  const [stripeModalOpen, setStripeModal] = useState(false);

  useEffect(() => {
    if (stripeModalOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [stripeModalOpen]);

  return (
    <>
      <div className='checkout-page'>
        <div className='checkout-header'>
          <div className='header-block'>
            <span>Product</span>
          </div>
          <div className='header-block'>
            <span>Description</span>
          </div>
          <div className='header-block'>
            <span>Quantity</span>
          </div>
          <div className='header-block'>
            <span>Price</span>
          </div>
          <div className='header-block'>
            <span>Remove</span>
          </div>
        </div>
        {cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}

        <div className='total'>
          <span>TOTAL: &euro;{total}</span>
        </div>

        {cartItems.length > 0 && (
          <CustomButton
            className='custom-button pay-now'
            onClick={() => setStripeModal(true)}
          >
            Pay Now
          </CustomButton>
        )}
      </div>
      <AnimatePresence>
        {stripeModalOpen && (
          <Modal
            open={stripeModalOpen}
            onClose={() => setStripeModal(false)}
            total={total}
            timeout='3000'
          >
            <StripeModal />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
