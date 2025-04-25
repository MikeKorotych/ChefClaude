import React from 'react';

import './Styles/Chef.css';
import ChefMain from './components/ChefMain';
import ChefHeader from './components/ChefHeader';

const App = () => {
   return (
      <div>
         <ChefHeader />
         <ChefMain />
      </div>
   );
};

export default App;
