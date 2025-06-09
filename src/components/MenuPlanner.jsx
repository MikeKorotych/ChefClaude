import React, { useEffect, useState } from 'react';
import '../Styles/MenuPlanner.css';
import { GiMeat } from 'react-icons/gi';
import { MdRestaurantMenu } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaUserCheck } from 'react-icons/fa';
import { getMenuPlan } from '../ai';
import Markdown from 'react-markdown';
import Spinner from '../assets/loading-spin.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// форма:
// Человек или Питомец
// 1. пол
// 2. возраст
// 3. вес
// 4. цель (похудение, поддержание веса, набор массы)
// 5. диета (вегетарианская, безглютеновая, кето и т.д.)
// 6. продукты любимые
// 7. продукты запрещенные
// 8. физическая активность (низкая, средняя, высокая)
// 9. количество приемов пищи в день (3, 4, 5)

const MenuPlanner = () => {
  const [formData, setFormData] = useState({
    sex: 'male',
    age: 28,
    weight: 88,
    goal: 'muscle_gain',
    diet: 'all',
    favoriteFoods: '',
    forbiddenFoods: '',
    activityLevel: 'medium',
    mealsPerDay: '3',
  });

  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (answer) {
      scrollToAnswer();
    }
  }, [answer]);

  const scrollToAnswer = () => {
    setTimeout(() => {
      document.querySelector('.markdown-content')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer('');
    try {
      setIsLoading(true);
      const menuPlanMarkdown = await getMenuPlan(formData);
      setAnswer(menuPlanMarkdown);
      console.log('Form submitted: ', formData);
    } catch (error) {
      console.error('Error getting Menu plan: ', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="text-container">
        <h2 className="menu-planner-h2">
          Here you can create your meal plan depending on:
        </h2>
        <ul className="menu-planner__ul">
          <li className="menu-planner__list-item1">
            <CgGym className="icon" size={24} /> lifestyle
          </li>
          <li className="menu-planner__list-item2">
            <GiMeat className="icon" size={24} /> favorite products
          </li>
          <li className="menu-planner__list-item3">
            <MdRestaurantMenu className="icon" size={24} /> dietary preferences
          </li>
        </ul>
        <h2 className="menu-planner-title">
          Fill the form get a personal meal plan only for you:
        </h2>
      </div>
      {/* <div className="title menu-planner-title">
        <div>
          <BsFillPencilFill className="icon" size={20} /> Fill the form
        </div>
        <div>get a personal meal plan</div>
        <div>
          <FaUserCheck className="icon" size={24} /> only for you
        </div>
      </div> */}
      <form className="menu-planner-form" onSubmit={handleSubmit}>
        {/* <label>
          Are you a person or a pet?
          <select name="type">
            <option value="person">Person</option>
            <option value="pet">Pet</option>
          </select>
        </label> because of missing functionality (it should start a new branch in with another inputs, specifically for pets)*/}
        <label className="full-width sex-label">
          Sex:
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>{' '}
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </label>
        <label>
          {' '}
          Goal:
          <select name="goal" value={formData.goal} onChange={handleChange}>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="weight_loss">Weight Loss</option>
          </select>
        </label>
        <label>
          {' '}
          Diet:
          <select name="diet" value={formData.diet} onChange={handleChange}>
            <option value="all">Eat Everything</option>
            <option value="keto">Keto</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten_free">Gluten Free</option>
          </select>
        </label>
        <label>
          {' '}
          Favorite Foods:
          <input
            type="text"
            name="favoriteFoods"
            placeholder="You can just..."
            value={formData.favoriteFoods}
            onChange={handleChange}
          />
        </label>
        <label>
          Forbidden Foods:
          <input
            type="text"
            name="forbiddenFoods"
            placeholder="... leave it empty if you want"
            value={formData.forbiddenFoods}
            onChange={handleChange}
          />
        </label>
        <label>
          Physical Activity Level:
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          {' '}
          Meals per Day:
          <select
            name="mealsPerDay"
            value={formData.mealsPerDay}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button type="submit">Get Meal Plan</button>
      </form>
      {isLoading && (
        <>
          <div className="spinner-container">
            <img src={Spinner} alt="Loading..." />
          </div>
          <div className="skeleton-wrapper">
            <Skeleton count={6} />
          </div>
        </>
      )}
      {answer && (
        <div className="markdown-content">
          <Markdown>{answer}</Markdown>
        </div>
      )}
    </main>
  );
};

export default MenuPlanner;
