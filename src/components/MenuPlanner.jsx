import React from 'react';
import '../Styles/MenuPlanner.css';
import { GiMeat } from 'react-icons/gi';
import { MdRestaurantMenu } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaUserCheck } from 'react-icons/fa';

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
      <form className="menu-planner-form">
        {/* <label>
          Are you a person or a pet?
          <select name="type">
            <option value="person">Person</option>
            <option value="pet">Pet</option>
          </select>
        </label> because of missing functionality (it should start a new branch in with another inputs, specifically for pets)*/}
        <label className="full-width sex-label">
          Sex:
          <select id="sex" name="sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>{' '}
        <label>
          Age:
          <input type="number" name="age" defaultValue={18} />
        </label>
        <label>
          Weight:
          <input type="number" name="weight" defaultValue={55} />
        </label>
        <label>
          {' '}
          Goal:
          <select name="goal" defaultValue="muscle_gain">
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="weight_loss">Weight Loss</option>
          </select>
        </label>
        <label>
          {' '}
          Diet:
          <select name="diet">
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
          />
        </label>
        <label>
          Forbidden Foods:
          <input
            type="text"
            name="forbiddenFoods"
            placeholder="... leave it empty if you want"
          />
        </label>
        <label>
          Physical Activity Level:
          <select name="activityLevel">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          {' '}
          Meals per Day:
          <select name="mealsPerDay" defaultValue="3">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button type="submit">Create Meal Plan</button>
      </form>
    </main>
  );
};

export default MenuPlanner;
