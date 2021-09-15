import React, { useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

import './header.scss';

// DOM Contexts
import { ScrollYContext } from '../../contexts/ScrollY_Context';

// Components
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';

// Selectors
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { AnimatePresence } from 'framer-motion';
function Header({ currentUser, hidden }) {
  const scrollY = useContext(ScrollYContext);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className={`header ${scrollY > 100 ? 'white' : ''}`}>
      <Link to='/' className='logo-container'>
        <div className='logo-img-cont'>
          <Logo className='logo' />
        </div>
        <div className='logo-title'>CROWN</div>
      </Link>
      <nav className='nav'>
        <div className='options'>
          <Link to='/shop' className='option'>
            SHOP
          </Link>

          {currentUser ? (
            <div className='option sign-in-out' onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
          ) : (
            <Link className='option sign-in-out' to='/signin'>
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </div>
      </nav>
      <AnimatePresence>{hidden ? null : <CartDropdown />}</AnimatePresence>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
