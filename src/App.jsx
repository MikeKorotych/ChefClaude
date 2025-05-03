import React from 'react';

import './Styles/Chef.css';
import ChefMain from './components/ChefMain';
import ChefHeader from './components/ChefHeader';
import { Navigate, Route, Routes } from 'react-router-dom';
import MenuPlanner from './components/MenuPlanner';
import Sommelier from './components/Sommelier';

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
