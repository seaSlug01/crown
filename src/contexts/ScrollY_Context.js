import React, { createContext, useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

export const ScrollYContext = createContext();

export const ScrollYProvider = props => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scrollYListener = window.addEventListener(
      'scroll',
      throttle(() => {
        setScrollY(window.scrollY);
      }, 200)
    );

    return window.removeEventListener('scroll', scrollYListener);
  }, [scrollY, setScrollY]);

  return (
    <ScrollYContext.Provider value={scrollY}>
      {props.children}
    </ScrollYContext.Provider>
  );
};
