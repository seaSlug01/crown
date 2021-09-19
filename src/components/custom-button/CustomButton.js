import React from 'react';

import styled, { css } from 'styled-components';

// import './custom-button.scss';

function CustomButton({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  opacity: 1;

  &:hover,
  &:focus {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: white;
  color: rgb(46, 46, 46);
  border: 1px solid #357ae8;
  text-transform: capitalize;
  font-weight: 500;

  span {
    text-transform: none;
    transition: all 0.2s ease;
    &:first-of-type {
      margin-left: 4px;
    }

    &:last-of-type {
      margin-right: 4px;
    }
  }

  svg,
  img {
    width: 1.3rem;
    height: 1.3rem;
    object-fit: cover;
    margin-right: 0.5rem;
  }
  &:hover,
  &:focus {
    text-shadow: 0 0 1px rgb(93, 93, 93);
    color: rgb(93, 93, 93);
    background: transparent;
    box-shadow: 0 10px 10px #e1edff;

    span {
      &.blue {
        color: #357ae8;
        text-shadow: 0 0 1px #357ae8;
      }

      &.red {
        color: red;
        text-shadow: 0 0 1px red;
      }

      &.yellow {
        color: rgb(255, 145, 0);
        text-shadow: 0 0 1px rgb(255, 145, 0);
      }

      &.green {
        color: rgb(0, 138, 0);
        text-shadow: 0 0 1px rgb(0, 138, 0);
      }
    }
  }

  &:active {
    outline: 0 !important;
  }
`;

const gradientStyles = css`
  background: white;
  color: black;
  box-shadow: 0px 5px 20px rgba(255, 255, 255, 0.3);
  border: none !important;

  &:hover,
  &:focus {
    color: white;
    background: linear-gradient(
      50deg,
      rgba(26, 0, 173, 0.85) 15%,
      rgba(225, 0, 255, 0.85) 50%,
      rgba(255, 40, 40, 0.85) 100%
    );
  }
`;

const payNowStyles = css`
  color: white;
  background: transparent;
  border: none !important;
  overflow: hidden;

  &:hover,
  &:focus {
    background: transparent;
    color: white;

    &::before {
      left: -100%;
    }

    &::after {
      left: 0;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all 0.5s ease;
  }

  &::before {
    background: rgba(26, 0, 173, 0.85);
    left: 0;
  }

  &::after {
    background: linear-gradient(
      50deg,
      rgba(26, 0, 173, 0.85) 30%,
      rgba(255, 0, 212, 0.883) 65%,
      rgba(255, 72, 40, 0.85) 100%
    );
    left: 100%;
  }
`;

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  if (props.inverted) {
    return invertedButtonStyles;
  }

  if (props.gradient) {
    return gradientStyles;
  }

  if (props.payButton) {
    return payNowStyles;
  }
};

const Button = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  padding: 0.8rem 1.5rem;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Inter';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid transparent;

  &:active {
    outline: 1px solid black;
  }

  &:focus {
    background-color: rgb(65, 65, 65);
  }

  &:hover {
    background-color: rgb(65, 65, 65);
    color: white;
  }

  &.sign-buttons {
    &:active {
      transform: translateY(0px);
    }

    &:hover {
      transform: translateY(-2px);
    }
  }

  ${getButtonStyles}
`;

export default CustomButton;
