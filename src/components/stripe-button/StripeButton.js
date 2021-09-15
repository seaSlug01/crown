import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_live_51IwssyIOykYL1bU1qoSNs9DjdKfTUR40HbhZFd2mYUF0BaszZNnOo0KrUG4Vhn3txvIxRONw9zmqKTW2Bihmuh6p00AnbNZawo';

  return <StripeCheckout />;
};
