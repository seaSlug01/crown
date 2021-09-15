import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleRight } from 'react-icons/fa';
import debounce from 'lodash.debounce';

import { convertPixelsToVw } from '../../helpers';
import { motion } from 'framer-motion';
import { fade, lineVariant } from '../../animation';

function Heading({ title, subtitle, url }) {
  const subRef = useRef(null);
  const [subTitleWidth, setSubTitleWidth] = useState(0);

  useEffect(() => {
    setSubTitleWidth(subRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    // Make sure ref.current is not equal to null before adding logic

    const resize = window.addEventListener(
      'resize',
      debounce(() => {
        if (subRef.current !== null) {
          console.log(subRef.current.offsetWidth);
          setSubTitleWidth(subRef.current.offsetWidth);
        }
      }, 300)
    );

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [subTitleWidth]);

  return (
    <HeadingContainer variants={fade}>
      <Link to={url}>
        <Title subTitleWidth={subTitleWidth}>{title}</Title>
        <SubTitleContainer ref={subRef} subTitleWidth={subTitleWidth}>
          <SubTitle>
            <h2>{subtitle}</h2>
          </SubTitle>
          <Icon>
            <FaAngleRight />
          </Icon>
        </SubTitleContainer>
      </Link>
      <motion.div
        className='heading-line'
        variants={lineVariant}
        initial='hidden'
        animate='show'
      ></motion.div>
    </HeadingContainer>
  );
}

const Icon = styled.div`
  /* width: 2rem;
  height: 2rem; */
  width: 2.5vw;
  height: 2.5vw;
  position: absolute;
  /* right: -25px;
  bottom: 15px; */
  transition: all 0.6s ease;
  opacity: 0;
  visibility: hidden;
  left: -10px;
  bottom: 0px;
  transform: translateX(0px);
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SubTitle = styled.div`
  position: relative;
  overflow: hidden;

  h2 {
    font-size: 1.66vw;
    color: #23d997;
    font-weight: bold;
    transition: all 0.5s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-30px);
  }
`;

const SubTitleContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: -0.8rem;
  position: relative;

  &:hover {
    ${SubTitle} {
      h2 {
        opacity: 1;
        visibility: visible;
        transform: translateX(0px);
      }
    }

    ${Icon} {
      width: 1.66vw;
      height: 1.66vw;
      transform: ${props =>
        `translateX(calc(${convertPixelsToVw(props.subTitleWidth)} + 0.5rem))`};
    }
  }
`;

const Title = styled.h1`
  font-size: 3.3vw;
  display: inline-block;
  margin-right: 1rem;

  &:hover + ${SubTitleContainer} {
    ${SubTitle} {
      h2 {
        opacity: 1;
        visibility: visible;
        transform: translateX(0px);
      }
    }

    ${Icon} {
      width: 1.66vw;
      height: 1.66vw;
      transform: ${props =>
        `translateX(calc(${convertPixelsToVw(props.subTitleWidth)} + 0.5rem))`};
    }
  }
`;

const HeadingContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  cursor: pointer;

  &:hover ${SubTitleContainer} ${Icon} {
    opacity: 1;
    visibility: visible;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .heading-line {
    background: black;
    width: 0%;
    height: 2px;
    left: 0;
  }
`;

export default Heading;
