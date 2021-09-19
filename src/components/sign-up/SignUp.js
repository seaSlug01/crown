import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../input/Input';
import CustomButton from '../custom-button/CustomButton';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.scss';
function SignUp() {
  const [signUpDetails, setSignUpDetails] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = signUpDetails;

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords dont match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      console.log(displayName);

      await createUserProfileDocument(user, { displayName });

      setSignUpDetails({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setSignUpDetails({ ...signUpDetails, [name]: value });
  };

  return (
    <div className='sign-up'>
      <h1 className='title'>Create Account</h1>
      <span className='subtitle'>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <Input
          classes='form-group'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label='Display Name'
          autoComplete='off'
          required
        />

        <Input
          classes='form-group'
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
        />

        <Input
          classes='form-group'
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
        />

        <Input
          classes='form-group'
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
        />

        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
      <Link to='/account/signin' className='sign-in-out-link'>
        Already have an account? Sign In here.
      </Link>
    </div>
  );
}

export default SignUp;
