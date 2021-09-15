import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FormGroup = styled(motion.div)`
  position: relative;
  margin: 1rem 0;
  width: ${props => props.width || 'auto'};
  .message {
    margin-top: 0.2rem;
    display: flex;
    align-items: flex-start;
    font-weight: bold;
    font-size: 0.9rem;

    svg {
      width: 18px;
      height: 18px;
      margin-right: 0.5rem;
    }
    &.danger {
      color: red;
    }

    &.warning {
      color: #6b6b6b;
    }
  }
`;

export const InputGroup = styled(motion.div)`
  position: relative;
  display: flex;

  .placeholder {
    position: absolute;
    top: 0;
    transition: 0.3s ease all;
    pointer-events: none;
    font-size: ${props => props.fontSize + 'rem'};
    font-weight: bold;
    color: #696969;
    letter-spacing: 1px;

    .colon {
      margin-left: 1px;
      font-size: 13px;
    }

    &.shrink {
      top: -1rem;
      font-size: ${props => `calc(${props.fontSize}rem * 0.8)`};
      left: 0;

      /* text-shadow: 0 0 1px rgba(0, 0, 0, 0.609); */
    }
  }

  input {
    width: 100%;
    border: none;
    border-bottom: thin solid black;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: ${props => props.fontSize + 'rem'};
    color: rgb(27, 27, 27);
    order: 2;
    font-weight: bold;
    text-indent: 3px;
    letter-spacing: 1px;

    &.danger {
      border-bottom: thin solid red;

      &:focus ~ .placeholder {
        color: #696969;
      }
    }

    &:focus ~ .placeholder {
      left: 0;
      top: -1rem;
      font-size: ${props => `calc(${props.fontSize}rem * 0.8)`};
      color: rgba(0, 0, 255, 0.609);
      letter-spacing: 1px;

      /* text-shadow: 0 0 1px rgba(0, 0, 255, 0.609); */
    }

    &:focus {
      ~ .line {
        width: 100%;

        &.expand.highlight::after {
          width: 100%;
        }
      }
    }
  }

  input.danger ~ .line {
    background: red;
  }

  .line {
    width: 0;
    height: 2px;
    position: absolute;
    background: black;
    bottom: 0;
    transition: width 0.5s ease, background 0.5s ease;
    left: 50%;
    transform: translateX(-50%);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: width 0.5s ease, background 0.5s ease;
      background: rgb(2, 151, 255);
      width: 0;
      height: inherit;
    }

    &.expand {
      width: 100%;
    }
  }
`;
