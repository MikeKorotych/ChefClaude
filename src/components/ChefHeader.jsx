import React from 'react';
import chefLogo from '../assets/Chef Claude Icon.svg';
import plannerLogo from '../assets/planner.svg';
import sommelierLogo from '../assets/wine-glass.svg';
import { Link, Outlet } from 'react-router-dom';

const ChefHeader = () => {
  return (
    <>
      <header>
        <div className="nav-wrapper">
          <Link to="/chef-claude">
            <img className="w-8" src={chefLogo} alt="" />
            Chef Claude
          </Link>
        </div>
        <div className="nav-wrapper">
          <Link to="/menu-planner">
            <img className="w-9" src={plannerLogo} alt="" />
            Menu Planner
          </Link>
        </div>
        <div className="nav-wrapper">
          <Link to="/sommelier">
            <img className="w-8" src={sommelierLogo} alt="" />
            AI Sommelier
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default ChefHeader;
