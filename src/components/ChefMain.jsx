import React, { useState, useEffect, useCallback } from 'react';
import ChefRecipe from './ChefRecipe';
import ChefIngredientsList from './ChefIngredientsList';
import { getRecipeFromChefClaude } from '../ai';
import Spinner from '../assets/loading-spin.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../Styles/ChefMain.css';

const ChefMain = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Скролл к рецепту после анимации
  const scrollToRecipe = () => {
    setTimeout(() => {
      document.querySelector('.markdown-content')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 600); // Задержка равна времени анимации появления
  };

  // Эффект для скролла при изменении рецепта
  useEffect(() => {
    if (recipe) {
      scrollToRecipe();
    }
  }, [recipe]);

  // Get recipe button
  const getRecipeHandler = async () => {
    setIsLoading(true);
    try {
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
      setRecipe(recipeMarkdown);
    } catch (error) {
      console.error('Error getting recipe:', error.message);
    } finally {
      setIsLoading(false); // Скрыть спиннер
    }
  };
  // Add ingredient
  const submitHandler = (formData) => {
    const newIngredient = formData.get('ingredient')?.trim();

    if (!newIngredient) {
      alert("Ingredient can't be an empty string");
      return;
    }

    setIngredients((prev) => [...prev, newIngredient]);
    // Очищаем форму после добавления
    formData.target?.reset();
  };
  return (
    <main>
      <h2 className="chef-main-h2">
        Here you can create a meal from your ingredients:
      </h2>
      <form className="add-ingredient-form" action={submitHandler}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          id="ingredient-input"
        />
        <button id="add-ingredient_btn">+ Add</button>
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
        <div className="markdown-content" role="article">
          <ChefRecipe recipe={recipe} />
        </div>
      )}
    </main>
  );
};

export default ChefMain;
