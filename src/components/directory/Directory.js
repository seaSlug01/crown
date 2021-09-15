import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/MenuItem';
import './directory.scss';

import { motion } from 'framer-motion';

const directoryMenuVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 }
  },
  exit: {
    y: 300
  }
};

const Directory = ({ sections }) => {
  return (
    <motion.div
      className='directory-menu'
      variants={directoryMenuVariant}
      initial='hidden'
      animate='show'
    >
      {sections.map(({ id, ...otherProps }) => (
        <MenuItem key={id} {...otherProps} />
      ))}
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
