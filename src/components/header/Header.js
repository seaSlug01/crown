import React, { useEffect, useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import {
  HeaderContainer,
  LogoContainer,
  Navigation,
  OptionsContainer,
  Option
} from './Header.styles';

// DOM Contexts
import { ScrollYContext } from '../../contexts/ScrollY_Context';

// Components
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';

// Selectors
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { AnimatePresence } from 'framer-motion';
function Header({ currentUser, hidden, signOutStart }) {
  const scrollY = useContext(ScrollYContext);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <HeaderContainer className={`${scrollY > 100 ? 'white' : ''}`}>
      <LogoContainer to='/'>
        <div className='logo-img-cont'>
          <Logo className='logo' />
        </div>
        <div className='logo-title'>CROWN</div>
      </LogoContainer>
      <Navigation>
        <OptionsContainer>
          <Option to='/shop'>SHOP</Option>
          <Option to='/contact'>CONTACT</Option>
          {currentUser ? (
            <Option as='div' className='sign-in-out' onClick={signOutStart}>
              SIGN OUT
            </Option>
          ) : (
            <Option className='sign-in-out' to='/account/signin'>
              SIGN IN
            </Option>
          )}

          <Option as='div' className='cart-icon-option'>
            <CartIcon />
          </Option>
        </OptionsContainer>
      </Navigation>
      <AnimatePresence>{hidden ? null : <CartDropdown />}</AnimatePresence>
    </HeaderContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
