import React from 'react';
import { CSSTransition } from 'react-transition-group';

function CSSTransitionHOC(children, toggle, classNames, timeout) {
  return (
    <CSSTransition in={toggle} classNames={classNames} timeout={timeout}>
      <>{React.Children.map(children, child => React.cloneElement(child))}</>
    </CSSTransition>
  );
}

export default CSSTransitionHOC;
