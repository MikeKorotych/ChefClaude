import React from 'react';

import './Styles/Chef.css';
import ChefMain from './components/ChefMain';
import ChefHeader from './components/ChefHeader';
import { Navigate, Route, Routes } from 'react-router-dom';
import MenuPlanner from './components/MenuPlanner';
import Sommelier from './components/Sommelier';

//! TODO:
// 1. add fadeUp animations for ChefClaude and AI Sommelier
// 2. collect data from the form
// 3. send data throungh API to the server
// 4. get response from the server and display it

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChefHeader />}>
        <Route index element={<Navigate to="/chef-claude" replace />} />
        <Route path="chef-claude" element={<ChefMain />} />
        <Route path="menu-planner" element={<MenuPlanner />} />
        <Route path="sommelier" element={<Sommelier />} />
      </Route>
    </Routes>
  );
};

export default App;
