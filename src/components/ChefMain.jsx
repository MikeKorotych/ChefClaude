import React, { useState, useEffect } from 'react';
import ChefRecipe from './ChefRecipe';
import ChefIngredientsList from './ChefIngredientsList';
import { getRecipeFromChefClaude } from '../ai';
import Spinner from '../assets/loading-spin.svg';
import '../Styles/ChefMain.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChefMain = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Добавлено состояние для спиннера

  // Добавляем эффект для скролла к рецепту
  useEffect(() => {
    if (recipe) {
      setTimeout(() => {
        document.querySelector('.recipe-content')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 600); // Задержка равна времени анимации появления
    }
  }, [recipe]);

  // Get recipe button
  const getRecipeHandler = async () => {
    setIsLoading(true); // Показать спиннер
    try {
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
      setRecipe(recipeMarkdown);

      // Добавляем плавный скролл к рецепту после его появления
      setTimeout(() => {
        document.querySelector('.recipe-content')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 600); // Задержка равна времени анимации появления
      // Добавляем плавный скролл к рецепту после его появления
      setTimeout(() => {
        document.querySelector('.recipe-content')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 600); // Задержка равна времени анимации появления
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
      <h2 className="chef-main-h2">
        Here you can create a meal from your products:
      </h2>
      <form className="add-ingredient-form" action={submitHandler}>
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
      />{' '}
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
      {recipe && (
        <div className="recipe-content">
          <ChefRecipe recipe={recipe} />
        </div>
      )}
    </main>
  );
};

export default ChefMain;
