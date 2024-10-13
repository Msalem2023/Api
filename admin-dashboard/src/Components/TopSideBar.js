import React, { useState } from 'react';
import { FaCog, FaHome, FaInfoCircle, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // If using React Router
import UserMenu from '../Nav/UserMenu';
import Logo from '../Nav/Logo';
import Container from '../Nav/Container';

const TopSidebar = () => {


  return (
    <>
      <div className="mainCont w-full fixed z-10 shadow-sm bg-white">
      <div className="innerCont py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between items-center gap-3 md:gap-0">
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
    </>
  );
};

export default TopSidebar;
