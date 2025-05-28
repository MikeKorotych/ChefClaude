import React, { useState } from 'react';
import ChefRecipe from './ChefRecipe';
import ChefIngredientsList from './ChefIngredientsList';
import { getRecipeFromChefClaude } from '../ai';
import Spinner from '../assets/loading-spin.svg';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChefMain = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Добавлено состояние для спиннера

  // Get recipe button
  const getRecipeHandler = async () => {
    setIsLoading(true); // Показать спиннер
    try {
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
      console.log(recipeMarkdown);

      setRecipe(recipeMarkdown);
    } catch (error) {
      console.error('Error getting recipe:', error.message);
    } finally {
      setIsLoading(false); // Скрыть спиннер
    }
  };

  // Add ingredient
  const submitHandler = (formData) => {
    const newIngredient = formData.get('ingredient');

    if (newIngredient.length > 0) {
      setIngredients((ingredients) => [...ingredients, newIngredient]);
    } else {
      alert("Igredient can't be an empty string");
    }
  };

  return (
    <main>
      <h2>Here you can create a meal from your products:</h2>
      <form className="add-inredient-form" action={submitHandler}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>+ Add ingredient</button>
      </form>

      <ChefIngredientsList
        ingredients={ingredients}
        getRecipeHandler={getRecipeHandler}
      />
      {isLoading && !recipe && (
        <>
          <div className="spinner-container">
            <img src={Spinner} alt="Loading..." />
          </div>
          <div className="skeleton-wrapper">
            <Skeleton count={6} />
          </div>
        </>
      )}
      {recipe && <ChefRecipe recipe={recipe} />}
    </main>
  );
};

export default ChefMain;
