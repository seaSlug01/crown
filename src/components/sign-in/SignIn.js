import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../input/Input';
import CustomButton from '../custom-button/CustomButton';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

import './sign-in.scss';

import googleLogo from '../../assets/images/Google__G__Logo.svg.png';

function SignIn({ googleSignInStart, emailSignInStart }) {
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: ''
  });

  const { email, password } = signInInfo;

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = signInInfo;

    emailSignInStart(email, password);
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setSignInInfo({ ...signInInfo, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h1 className='title'>Sign In</h1>
      <span className='subtitle'>Sign in with your email and password</span>

      <form onSubmit={e => handleSubmit(e)}>
        <Input
          handleChange={handleChange}
          classes='form-group'
          name='email'
          type='email'
          value={email}
          label='Email'
          required
        />
        <Input
          handleChange={handleChange}
          classes='form-group'
          type='password'
          name='password'
          value={password}
          label='Password'
          required
        />

        <div className='buttons'>
          <CustomButton
            type='submit'
            value='Submit Form'
            className='sign-buttons'
          >
            Sign In
          </CustomButton>
          <CustomButton
            type='button'
            onClick={googleSignInStart}
            isGoogleSignIn={true}
            className='sign-buttons'
          >
            <img src={googleLogo} alt='logo' />
            Sign In With <span className='blue'>G</span>
            <span className='red'>o</span>
            <span className='yellow'>o</span>
            <span className='blue'>g</span>
            <span className='green'>l</span>
            <span className='red'>e</span>
          </CustomButton>
        </div>
      </form>

      <Link to='/account/signup' className='sign-in-out-link'>
        Dont have an account? Create one here.
      </Link>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
