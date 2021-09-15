import React, { useState } from 'react';

import Input from '../input/Input';
import CustomButton from '../custom-button/CustomButton';

import { SignInWithGoogle, auth } from '../../firebase/firebase.utils';

import './sign-in.scss';

import googleLogo from '../../assets/images/Google__G__Logo.svg.png';

function SignIn() {
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: ''
  });

  const { email, password } = signInInfo;

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = signInInfo;

    try {
      await auth.signInWithEmailAndPassword(email, password);

      setSignInInfo({
        email: '',
        password: ''
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setSignInInfo({ ...signInInfo, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account.</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={e => handleSubmit(e)}>
        <Input
          handleChange={handleChange}
          class='form-group'
          name='email'
          type='email'
          value={email}
          label='Email'
          required
        />
        <Input
          handleChange={handleChange}
          class='form-group'
          type='password'
          name='password'
          value={password}
          label='Password'
          required
        />

        <div className='buttons'>
          <CustomButton type='submit' value='Submit Form'>
            Sign In
          </CustomButton>
          <CustomButton onClick={SignInWithGoogle} isGoogleSignIn={true}>
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
    </div>
  );
}

export default SignIn;