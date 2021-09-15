import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { CSSTransition } from 'react-transition-group';

import './modal.scss';

const modalVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, when: 'beforeChildren', staggerChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    scale: 1.3,
    transition: { duration: 0.2, when: 'afterChildren' }
  }
};

function Modal({ open, onClose, children, timeout, ...restProps }) {
  // This state secures that the target when you click mousedown is the same as you click mouseup
  // This way you avoid this weird problem of the user clicking on a input inside modal and then releasing it(mouseup) outside of the modal content only to see his modal closing abruptly
  // only if the mousedown click has the same target as the mouseup target will the modal close
  // and since the modal content has e.stopPropagation(), mousedown will only be triggered on the modal container, not its content
  const [initialClosingTarget, setInitialClosingTarget] = useState(null);

  // if (!open) return null;

  if (!open) {
  }

  return ReactDom.createPortal(
    <AnimateSharedLayout layout>
      <motion.div
        variants={modalVariants}
        initial='hidden'
        animate='show'
        exit='exit'
        className='modal-container'
        onMouseDown={e => {
          setInitialClosingTarget(e.target);
        }}
        onMouseUp={e => {
          if (e.target === initialClosingTarget) {
            onClose();
          }
        }}
      >
        {/* In case there are 2 components its put inside fragments */}
        <>
          {React.Children.map(children, child =>
            React.cloneElement(child, { open, onClose, ...restProps })
          )}
        </>
      </motion.div>
    </AnimateSharedLayout>,
    document.getElementById('modal')
  );
}

export default Modal;
