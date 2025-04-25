import React from 'react';
import Markdown from 'react-markdown';

const ChefRecipe = ({ recipe }) => {
   return (
      <section
         className=".suggested-recipe-container"
         id="suggested-recipe-container"
         aria-live="polite"
      >
         <Markdown>{recipe}</Markdown>
      </section>
   );
};

export default ChefRecipe;
