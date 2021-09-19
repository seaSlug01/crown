import React, { useState } from 'react';

// more onFocus/onClick/onSomeEvent etc should be named handleFocus, handleEvent and so on

import { FormGroup, InputGroup } from './InputStyle';

import { CgDanger } from 'react-icons/cg';

const Input = React.forwardRef(
  (
    {
      label,
      value,
      type = 'text',
      handleChange,
      handleFocus,
      handleBlur,
      fontSize = 1,
      message,
      classes,
      width,
      ...rest
    },
    ref
  ) => {
    const [inputFocus, setInputFocus] = useState(false);

    return (
      <FormGroup layout width={width} className={`${classes}`}>
        <InputGroup layout fontSize={fontSize}>
          <input
            className={`${message && message.type}`}
            type={type}
            onChange={e => {
              handleChange(e);
            }}
            ref={ref}
            onFocus={e => {
              setInputFocus(true);
              handleFocus && handleFocus();
            }}
            onBlur={e => {
              setInputFocus(false);
              handleBlur && handleBlur(e);
            }}
            autoComplete={'off'}
            value={value}
            {...rest}
          />

          <label
            htmlFor={rest.id}
            className={`placeholder ${value.length ? 'shrink' : ''}`}
          >
            {label}
            {inputFocus ? <span className='colon'>:</span> : ''}
          </label>
          <div
            className={`line ${value.length ? 'expand' : ''} ${
              inputFocus ? 'highlight' : ''
            }`}
          ></div>
        </InputGroup>

        {message && (
          <div className={`message ${message.type}`}>
            <div className='icon'>
              <CgDanger />
            </div>
            {message.text}
          </div>
        )}
      </FormGroup>
    );
  }
);

export default Input;
