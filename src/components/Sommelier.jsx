import React, { useRef, useState } from 'react';
import Spinner from '../assets/loading-spin.svg';
import { getDrinkToDish } from '../ai';
import Markdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import '../Styles/Sommelier.css';

const Sommelier = () => {
  const [dish, setDish] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dishName = formData.get('dishInput');

    if (dishName.length > 0) {
      if (inputRef.current) inputRef.current.value = '';
      setDish(dishName);
      await getDrinkHandler(dishName);
    } else {
      alert("Dish can't be an empty string");
    }
  };

  const getDrinkHandler = async (dishName) => {
    setAnswer('');

    try {
      setIsLoading(true);
      const drinkMarkdown = await getDrinkToDish(dishName);
      setAnswer(drinkMarkdown);
    } catch (error) {
      console.log('Error getting drink:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main>
      <h2 className="sommelier-h2">
        Here you can ask what kind of drink goes best with your dish:
      </h2>
      <form className="sommelier-form" onSubmit={submitHandler}>
        <input
          type="text"
          name="dishInput"
          placeholder="e.g. pasta"
          ref={inputRef}
        />
        <button>Ask</button>
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

export default Sommelier;
