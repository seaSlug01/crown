import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CrownLogo from '../../assets/crown.svg';
import axios from 'axios';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';

import styled from 'styled-components';
import Input from '../input/Input';

import { AnimatePresence, motion } from 'framer-motion';

import { FaAngleRight } from 'react-icons/fa';

import './stripe-modal.scss';

const cardElementOptions = {
  style: {
    base: {
      fontWeight: 'bold',
      fontSize: '17px'
    },
    invalid: {
      color: '#ff2d2d',
      iconColor: '#ff2d2d'
    }
  },
  hidePostalCode: true
};

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

// TIP, dont call within the component

const stripeModalVariants = {
  hidden: { y: -300, x: '-50%', transition: { duration: 0.2 } },
  show: { y: 0, x: '-50%', transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const slideUpDown = {
  hidden: { height: '0px' },
  show: { height: '27px' },
  exit: { height: '0px' }
};
const countryOptions = [
  'Geneva',
  'Austria',
  'Italy',
  'Belgium',
  'Latvia',
  'Bulgaria',
  'Lithuania',
  'Croatia',
  'Luxembourg',
  'Cyprus',
  'Malta',
  'Czechia',
  'Netherlands',
  'Denmark',
  'Poland',
  'Estonia',
  'Portugal',
  'Finland',
  'Romania',
  'France',
  'Slovakia',
  'Germany',
  'Slovenia',
  'Greece',
  'Spain',
  'Hungary',
  'Sweden',
  'Irelan'
];
function StripeModal({ total, onClose }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [stripeContainerLine, setStripeContainerLine] = useState({
    visible: false,
    error: false,
    errorMsg: ''
  });
  const formRef = useRef(null);

  const [countryOptionsContainerVisible, setCountryOptionsContainerVisible] =
    useState({
      visible: false
    });
  const [countryOptionsContainerHeight, setCountryOptionsContainerHeight] =
    useState({
      height: 0
    });

  const { height } = countryOptionsContainerHeight;
  const { visible } = countryOptionsContainerVisible;

  const optionsContainerRef = useRef(null);

  const calculateOptionsContainerHeight = () => {
    let height;
    if (
      optionsContainerRef.current !== null &&
      optionsContainerRef.current.querySelectorAll('.option').length
    ) {
      height =
        optionsContainerRef.current.querySelectorAll('.option').length *
          optionsContainerRef.current.querySelector('.option').offsetHeight +
        'px';
    } else {
      height = '0px';
    }

    return height;
  };

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+30',
    phoneNumber: '',
    zipCode: '',
    country: 'Greece',
    address: '',
    address2: '',
    city: '',
    rememberMe: false
  });

  const {
    country,
    firstName,
    email,
    phoneCode,
    phoneNumber,
    lastName,
    zipCode,
    address,
    address2,
    city,
    rememberMe
  } = inputs;

  const [message, setMessage] = useState({
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    address2: null,
    city: null,
    phoneCode: null,
    phoneNumber: null,
    country: null,
    zipCode: null
  });

  const handleChange = e => {
    const { value, name } = e.target;

    if (name === 'phoneCode') {
      setInputs({
        ...inputs,
        [name]: value.includes('+') ? value : value.length ? `+${value}` : value
      });
      return;
    }

    setInputs({ ...inputs, [name]: value });
  };

  const [searchTerm, setSearchTerm] = useState('');
  let searchTimer = null;

  const filterOptions = e => {
    if (searchTimer) {
      clearTimeout(searchTimer);
      console.log('timeout cleared');
    }

    searchTimer = setTimeout(() => {
      setSearchTerm(e.target.value);
      setCountryOptionsContainerHeight({
        height: calculateOptionsContainerHeight()
      });
    }, 1000);
  };

  const highlightMatchingLetters = text => {
    const html = [];
    const textArr = text.split('');
    let index = 0;
    // Create an object with these arrays

    for (let char of textArr) {
      if (
        searchTerm.toLowerCase().includes(char.toLowerCase()) &&
        index < searchTerm.length
      ) {
        html.push(<mark key={index}>{char}</mark>);
      } else {
        html.push(textArr[index]);
      }
      index++;
    }

    return html;
  };

  const displayCountryOptions = () => {
    const markup = countryOptions
      .sort()
      .filter(option => {
        if (searchTerm === '') {
          return option;
        } else if (option.toLowerCase().includes(searchTerm.toLowerCase())) {
          return option;
        }
      })
      .map((country, i, array) => (
        <li
          className={`option ${array.length === 1 && 'no-padding-hover'}`}
          key={country}
          onClick={e => {
            console.log(e.currentTarget.textContent);
            setInputs({ ...inputs, country: e.currentTarget.textContent });
          }}
        >
          {highlightMatchingLetters(country)}
        </li>
      ));

    if (markup.length) {
      return markup;
    } else {
      return (
        <li
          // ref={optionRef}
          className='option error'
        >
          No results...
        </li>
      );
    }
  };

  function checkForNumbers(e, field) {
    const { value, name } = e.target;
    var re = /^([^0-9]*)$/;
    if (!re.test(value) && value !== '') {
      console.log(e.target.value);
      setMessage({
        ...message,
        [name]: {
          text: `${field} should not contain numbers`,
          type: 'danger'
        }
      });
    }
  }

  function checkIfEmpty(e, field) {
    if (e.target.value === '') {
      setMessage({
        ...message,
        [e.target.name]: {
          text: `${field} is a required field`,
          type: 'danger'
        }
      });

      console.log(message);
    }
  }

  function validAddress(e, field) {
    let result;
    var regex = /^(?=.*[A-Za-z])(?=.*\d)(?!.*[^A-Za-z0-9\-#\.\/ ])/;
    e.target.value.split(/[\r\n]+/).forEach(str => {
      result = regex.test(str);
      console.log(str + ' ==> ' + result);
    });

    if (!result) {
      setMessage({
        ...message,
        [e.target.name]: {
          text: `Please make sure you add both address name and address number.`,
          type: 'warning'
        }
      });
    }
  }

  // const normalizePhoneNumber = value => {
  //   const phoneNumber = parsePhoneNumberFromString(value);

  //   if (!phoneNumber) {
  //     setInputs({ ...inputs, phoneNumber: value });
  //     return;
  //   }

  //   setInputs({ ...inputs, phoneNumber: phoneNumber.formatInternational() });
  // };

  const handleStep = (fields, step) => {
    const errors = [];

    for (let field of fields) {
      if (inputs[field] === '' || message[field] !== null) {
        errors.push(field);
      }
    }

    if (!errors.length) {
      setStep(step + 1);
      setError(false);
    } else {
      setError(true);
      document.querySelector(`input[name=${errors[0]}]`).focus();
      errors.forEach(error => {
        document.querySelector(`input[name=${error}]`).classList.add('danger');
      });
    }
  };

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  useEffect(() => {
    const oldValues = localStorage.getItem('oldValues');

    if (oldValues) {
      setInputs(JSON.parse(oldValues));
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    // const { data: clientSecret } = await axios.post('/api/payment_intents', {
    //   amount: total * 100
    // });

    // But you dont have a server so leave it for now ^^

    console.log(inputs);

    if (rememberMe) {
      localStorage.setItem('oldValues', JSON.stringify(inputs));
    }

    // create a payment intent on the server

    // client_secret of that payment intent

    // need reference to the cardElement

    // need stripe.js

    // create a payment method

    // confirm the card element
    // payment method id
    // client_secret
  };

  return (
    <Elements stripe={stripePromise}>
      <motion.div
        className='modal-form-container'
        onMouseDown={e => e.stopPropagation()}
        variants={stripeModalVariants}
        exit='exit'
        animate='show'
        initial='hidden'
      >
        <div className='modal-header'>
          <span className='close-icon' onClick={onClose}>
            &#10006;
          </span>
          <p>Crown Clothing Ltd.</p>
          <p>
            Your total is <span>&euro;{total}</span>
          </p>
          <div className='modal-header-img-cont'>
            <img src={CrownLogo} alt='' />
          </div>
        </div>
        <motion.form layout className='modal-form' onSubmit={handleSubmit}>
          <AnimatePresence>
            {step === 1 && (
              <motion.div layout className='step'>
                {error && (
                  <p className='warning'>
                    Please make sure each field is valid.
                  </p>
                )}
                <motion.div layout className='heading'>
                  Customer Information
                </motion.div>
                {/* Due to Chrome not recognizing autoComplete off, you need a hidden input at the top of the form */}
                <input type='hidden' value='something' />

                <Input
                  value={firstName}
                  handleChange={e => {
                    handleChange(e);
                    setMessage({ ...message, [e.target.name]: null });
                  }}
                  handleBlur={e => {
                    checkForNumbers(e, 'First name');
                    checkIfEmpty(e, 'First name');
                  }}
                  name='firstName'
                  autoComplete='off'
                  label='NAME'
                  message={message.firstName}
                />

                <Input
                  value={lastName}
                  handleChange={e => {
                    handleChange(e);
                    setMessage({ ...message, [e.target.name]: null });
                  }}
                  handleBlur={e => {
                    checkForNumbers(e, 'Last name');
                    checkIfEmpty(e, 'Last name');
                  }}
                  name='lastName'
                  autoComplete='off'
                  label='SURNAME'
                  message={message.lastName}
                />

                <div className='heading'>Contact</div>
                <Input
                  value={email}
                  handleChange={e => {
                    handleChange(e);
                    setMessage({ ...message, [e.target.name]: null });
                  }}
                  handleBlur={e => {
                    checkIfEmpty(e, 'Email');
                  }}
                  name='email'
                  autoComplete='off'
                  label='EMAIL'
                  message={message.email}
                />

                <div className='phoneNumber'>
                  <Input
                    width='20%'
                    value={phoneCode}
                    handleChange={e => {
                      handleChange(e);
                      setMessage({ ...message, [e.target.name]: null });
                    }}
                    handleBlur={e => {
                      checkIfEmpty(e, 'Phone Code');
                    }}
                    name='phoneCode'
                    autoComplete='phoneCode'
                    label='COD'
                    message={message.phoneCode}
                  />
                  <Input
                    width='75%'
                    value={phoneNumber}
                    handleChange={e => {
                      handleChange(e);
                      setMessage({ ...message, [e.target.name]: null });
                    }}
                    handleBlur={e => {
                      checkIfEmpty(e, 'Phone Number');
                    }}
                    name='phoneNumber'
                    autoComplete='off'
                    label='PHONE NUMBER'
                    message={message.phoneNumber}
                  />
                </div>
                <div className='btn-Cont'>
                  <motion.button
                    layout
                    type='button'
                    className='btn btn-next-prev next ml-auto'
                    onClick={() => {
                      handleStep(
                        [
                          'firstName',
                          'lastName',
                          'email',
                          'phoneCode',
                          'phoneNumber'
                        ],
                        step
                      );
                    }}
                  >
                    Next
                    <span>
                      <FaAngleRight />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div layout className='step'>
                <motion.div layout className='heading'>
                  Delivery Details
                </motion.div>
                <Input
                  value={city}
                  name='city'
                  handleBlur={e => {
                    checkIfEmpty(e, 'City');
                  }}
                  message={message.city}
                  autoComplete='off'
                  label='CITY'
                  handleChange={e => {
                    handleChange(e);
                    setMessage({ ...message, [e.target.name]: null });
                  }}
                />

                <Input
                  value={zipCode}
                  handleBlur={e => {
                    checkIfEmpty(e, 'ZIP Code');
                  }}
                  message={message.zipCode}
                  name='zipCode'
                  autoComplete='off'
                  label='ZIP Code'
                  handleChange={e => {
                    handleChange(e);
                    setMessage({ ...message, [e.target.name]: null });
                  }}
                />
                <div className='select-country'>
                  <Input
                    value={country}
                    message={message.country}
                    type='search'
                    name='country'
                    id='country'
                    autoComplete='asd'
                    handleChange={e => {
                      handleChange(e);
                      setMessage({ ...message, [e.target.name]: null });
                    }}
                    onKeyUp={e => {
                      filterOptions(e);
                    }}
                    label='COUNTRY'
                    handleFocus={e => {
                      setCountryOptionsContainerVisible({ visible: true });
                      // setCountryOptionsContainerHeight({
                      //   height: '0px'
                      // });

                      setTimeout(() => {
                        setCountryOptionsContainerHeight({
                          height: calculateOptionsContainerHeight()
                        });
                      }, 10);

                      // console.log(e.target.autocomplete);

                      // console.log('target has autocomplete');
                      // e.target.removeAttribute('autocomplete', 'new');
                    }}
                    handleBlur={e => {
                      setCountryOptionsContainerHeight({
                        height: '0px'
                      });

                      setTimeout(() => {
                        setCountryOptionsContainerVisible(
                          {
                            visible: false
                          },
                          100
                        );

                        checkIfEmpty(e, 'Country');
                      }, 100);
                    }}
                  />

                  {visible && (
                    <CountryOptionsContainer
                      height={height}
                      ref={optionsContainerRef}
                    >
                      {displayCountryOptions()}
                    </CountryOptionsContainer>
                  )}
                </div>

                {/* <div className='col-3'>
                  <div className='first'>
                    <Input
                      value={'4242 4242 4242 4242'}
                      name='asd'
                      autoComplete='off'
                      label='Card Number'
                      handleChange={handleChange}
                    />
                  </div>
                  <div className='second'>
                    <Input
                      value={'12/24'}
                      name='asd'
                      autoComplete='off'
                      label='MM-YY'
                      handleChange={handleChange}
                    />
                  </div>
                  <div className='third'>
                    <Input
                      value={'123'}
                      name='asd'
                      autoComplete='off'
                      label='CVC'
                      handleChange={handleChange}
                    />
                  </div>
                </div> */}

                <motion.div layout className='col-2'>
                  <Input
                    width='45%'
                    value={address}
                    name='address'
                    handleBlur={e => {
                      checkIfEmpty(e, 'Address');
                    }}
                    message={message.address}
                    autoComplete='off'
                    label='ADDRESS'
                    handleChange={e => {
                      handleChange(e);
                      setMessage({ ...message, [e.target.name]: null });
                    }}
                  />
                  <Input
                    width='45%'
                    value={address2}
                    name='address2'
                    handleBlur={e => {
                      checkIfEmpty(e, 'Address 2');
                    }}
                    message={message.address}
                    autoComplete='off'
                    label='ADDRESS 2'
                    handleChange={e => {
                      handleChange(e);
                      setMessage({ ...message, [e.target.name]: null });
                    }}
                  />
                </motion.div>

                <motion.div layout className='btn-Cont'>
                  <button
                    type='button'
                    className='btn btn-next-prev prev'
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type='button'
                    className='btn btn-next-prev'
                    onClick={() => {
                      handleStep(
                        ['city', 'address', 'address2', 'zipCode', 'country'],
                        step
                      );
                    }}
                  >
                    Next
                    <span>
                      <FaAngleRight />
                    </span>
                  </button>
                </motion.div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div layout className='step'>
                <button
                  type='button'
                  className='btn btn-next-prev prev'
                  onClick={() => setStep(2)}
                  style={{ marginBottom: '2rem' }}
                >
                  Back
                </button>

                <motion.div
                  layout
                  className='heading'
                  style={{ marginBottom: '1rem' }}
                >
                  Payment
                </motion.div>
                <motion.div
                  layout
                  className={`stripeCard-Container ${
                    stripeContainerLine.visible ? 'focus' : ''
                  } ${stripeContainerLine.error ? 'error' : ''}`}
                >
                  <CardElement
                    onChange={e => {
                      const { error } = e;
                      console.log(e);
                      if (error) {
                        setStripeContainerLine({
                          ...stripeContainerLine,
                          error: true,
                          errorMsg: error.message
                        });
                      } else {
                        setStripeContainerLine({
                          ...stripeContainerLine,
                          error: false,
                          errorMsg: ''
                        });
                      }
                    }}
                    onFocus={() => {
                      setStripeContainerLine({
                        ...stripeContainerLine,
                        visible: true
                      });
                    }}
                    onBlur={() => {
                      setStripeContainerLine({
                        ...stripeContainerLine,
                        visible: false
                      });
                    }}
                    options={cardElementOptions}
                  />

                  {stripeContainerLine.errorMsg && (
                    <motion.p
                      variants={slideUpDown}
                      initial='hidden'
                      animate='show'
                      exit='hidden'
                      className='stripe-error'
                    >
                      {stripeContainerLine.errorMsg}
                    </motion.p>
                  )}
                </motion.div>

                <div className='checkbox-Cont'>
                  <input
                    className={`${rememberMe ? 'checked' : ''}`}
                    type='checkbox'
                    id='checkbox'
                    onClick={() => {
                      setInputs({ ...inputs, rememberMe: !rememberMe });
                    }}
                  />
                  <label htmlFor='checkbox'>Remember fields</label>
                </div>

                <motion.div className='btn-Cont'>
                  <button className='btn btn-cta btn-block'>Complete</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </Elements>
  );
}

const CountryOptionsContainer = styled.ul`
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 2.8rem;
  left: 0;
  height: 0;
  list-style-type: none;
  background: rgba(0, 0, 0, 0.726);
  max-height: 15rem;
  border-radius: 4px;
  transition: all 0.5s ease;
  height: ${props => `calc(${props.height}  + 16px)`};
  overflow: ${props =>
    parseInt(props.height.toString().replace('px', '')) > 150
      ? 'auto'
      : 'hidden'};
  padding: ${props =>
    parseInt(props.height.toString().replace('px', '')) > 0
      ? '0.5rem 0'
      : '0rem 0rem'};

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: darkgrey;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  .option {
    transition: all 0.3s ease;
    color: #dfdfdf;
    padding: 0.5rem;
    letter-spacing: 1px;
    border-bottom: thin solid #dfdfdf28;

    &:first-of-type {
      border-top: thin solid #dfdfdf28;
    }

    mark {
      background: #ffd000;
      font-weight: bold;
      color: black;

      &:nth-of-type(1) {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
      }

      &:last-of-type {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }

    strong {
      font-weight: bold;
      color: white;
    }

    &.error {
      color: #ffd000;
      font-weight: bold;
    }

    &:not(.error) {
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.526);
        color: white;
        &:not(.no-padding-hover) {
          padding: 0.7rem;
          font-size: 1.1rem;
        }
      }
    }
  }
`;

export default StripeModal;
