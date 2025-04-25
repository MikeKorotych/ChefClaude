import React from 'react';
import chefLogo from '../assets/Chef Claude Icon.svg';

const ChefHeader = () => {
   return (
      <header>
         <img src={chefLogo} alt="" />
         <h1>Chef Claude</h1>
      </header>
   );
};

export default ChefHeader;
