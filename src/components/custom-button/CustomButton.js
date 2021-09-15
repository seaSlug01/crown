import React from 'react';

import './custom-button.scss';

function CustomButton({
  children,
  isGoogleSignIn,
  inverted,
  gradient,
  ...otherProps
}) {
  return (
    <button
      className={`${inverted ? 'inverted' : ''} ${
        isGoogleSignIn ? 'google-sign-in' : ''
      } custom-button ${gradient ? 'gradient' : ''}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
