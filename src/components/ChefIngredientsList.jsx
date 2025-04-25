import React from 'react';

const ChefIngredientsList = ({ ingredients, getRecipeHandler }) => {
   const ingredientsListItems = ingredients.map((ing, index) => (
      <li key={index}>{ing}</li>
   ));

   return (
      <section>
         <ul>
            {ingredients.length > 0 && (
               <>
                  <h2>Ingredients on hand:</h2>
                  {ingredientsListItems}
               </>
            )}
         </ul>
         {ingredients.length < 4 && (
            <div>
               <h2>You need to add at least 4 ingredients</h2>
               <p>The more ingredients, the more tasty recipe you'll get 😋</p>
            </div>
         )}
         {ingredients.length > 3 && (
            <div className="get-recipe-container">
               <div>
                  <h3>Ready for a recipe?</h3>
                  <p>Generate a recipe from your list of ingredients.</p>
               </div>
               <button onClick={getRecipeHandler}>Get a recipe</button>
            </div>
         )}
      </section>
   );
};

export default ChefIngredientsList;
