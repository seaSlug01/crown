import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/Shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUp';
import CheckoutPage from './pages/checkout/Checkout';

// Actions
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// Auth
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// DOM Contexts
import { ScrollYProvider } from './contexts/ScrollY_Context';

// Animations
import { AnimatePresence } from 'framer-motion';

function App(props) {
  const { setCurrentUser } = props;

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
      <ScrollYProvider>
        <Header />
        <main className='main-container'>
          <AnimatePresence exitBeforeEnter>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route
                path='/account/:id'
                render={() =>
                  props.currentUser ? (
                    <Redirect to='/' />
                  ) : (
                    <SignInAndSignUpPage />
                  )
                }
              />
            </Switch>
          </AnimatePresence>
        </main>
      </ScrollYProvider>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
