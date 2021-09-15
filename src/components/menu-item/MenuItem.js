import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.scss';
import { FaAngleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const imgVariant = {
  hidden: { scale: 1.5 },
  show: { scale: 1, transition: { duration: 1 } }
};

const MenuItem = ({
  title,
  imageUrl,
  size = 'small',
  history,
  linkUrl,
  match
}) => {
  return (
    <motion.div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div className='background-image'>
        <motion.img
          src={imageUrl}
          alt={title}
          variants={imgVariant}
          initial='hidden'
          animate='show'
        />
      </div>
      <motion.div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>
          BROWSE
          <span>
            <FaAngleRight />
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default withRouter(MenuItem);
