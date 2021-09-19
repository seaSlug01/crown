import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';
import SignInPic from '../../assets/images/2853458.jpg';
import styled from 'styled-components';

function SignInAndSignUpPage() {
  return (
    <SignInAndSignUpContainer>
      <Switch>
        <Route path='/account/signin' component={SignIn} />
        <Route path='/account/signup' component={SignUp} />
      </Switch>
      <div className='right'>
        <img src={SignInPic} alt='' />
      </div>
    </SignInAndSignUpContainer>
  );
}

const SignInAndSignUpContainer = styled.div`
  display: flex;

  .right {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    img {
      width: 60%;
      height: 60%;
      object-fit: cover;
      filter: hue-rotate(50deg);
    }
  }

  .title {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    position: relative;
    left: -5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: grey;
  }

  .sign-in-out-link {
    margin-top: 3rem;
    color: #00aeff;
    font-weight: bold;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: 100%;
      background: linear-gradient(to right, #00aeff 40%, #ff7300 60%, #ff5849);
      left: 0;
      bottom: -3px;
    }
  }
`;

export default SignInAndSignUpPage;
