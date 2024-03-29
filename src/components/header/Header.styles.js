import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Navigation = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding-top: 1rem;
`;

export const Option = styled(NavLink)`
  padding: 10px 15px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  margin-left: 1rem;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &.active,
  &:hover {
    &:not(.cart-icon-option) {
      background: rgba(56, 56, 56, 0.1);
      box-shadow: inset 0 0 3px #dfdfdf;
    }
  }

  &.sign-in-out {
    color: #6262ff;
    background: #e4ebff;
    box-shadow: inset 0 0 3px #dfdfdf;
    &:hover {
      background: #d8e1fc;
    }
  }
`;

export const HeaderContainer = styled.div`
  min-height: 117px;
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 4rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: background 0.5s ease, box-shadow 0.3s ease;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0%;
    background: linear-gradient(to top, transparent transparent);
    width: 100%;
    transition: height 0.2s 0.5s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 0%;
    background: rgba(255, 255, 255, 0.9);
    width: 100%;
    transition: height 0.5s ease, box-shadow 0.2s 0.4s ease,
      background 0.3s ease;
    z-index: -1;
  }

  &:hover {
    &::before {
      background: white;
    }
  }

  &.white {
    &::after {
      height: 3%;
      background: linear-gradient(
        to top,
        rgba(0, 94, 182, 0.061) 0%,
        transparent 100%
      );
    }

    &::before {
      height: 100%;
      box-shadow: 0 0 10px rgba(0, 94, 182, 0.15);
    }
  }
`;

export const LogoContainer = styled(NavLink)`
  height: 50%;
  position: relative;

  .logo-img-cont {
    position: absolute;
    top: -21px;
    left: 15px;
    svg {
      width: 40px;
      height: 40px;
    }
  }

  .logo-title {
    color: black;
    font-size: 6rem;
    font-family: 'Kameron', serif;
  }
`;
