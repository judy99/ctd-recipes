import { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import Button from '../../shared/Button';
import styles from './RecipeViewForm.module.css';
import { useRecipeContext } from '../../RecipeContext';

const RecipeViewForm = () => {
  const { state, dispatch } = useRecipeContext();

  const [localQueryString, setLocalQueryString] = useState(state?.queryString);

  const handleChangeSortField = (e) => {
    dispatch({ type: 'changeSortField', sortField: e.target.value });
  };

  const handleChangeSortDir = (e) => {
    dispatch({
      type: 'changeSortDirection',
      sortDirection: e.target.value,
    });
  };

  const handleChangeCategory = (e) => {
    const cat = e.target.value;
    dispatch({
      type: 'changeCategory',
      filterCategory: cat !== 'all' ? cat : '',
    });
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch({
        type: 'changeQueryString',
        queryString: localQueryString,
      });
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, dispatch]);

  // prevent the page from refreshing if a user accidentally
  // hits enter while working with this form
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <form id="recipeViewForm" onSubmit={preventRefresh}>
        <div className={styles.search}>
          <TextInputWithLabel
            elementId={'recipeSearch'}
            onChange={(e) => setLocalQueryString(e.target.value)}
            value={localQueryString}
            placeholder={'Search by title...'}
          />
          <Button
            title="Clear"
            onClickHandler={() => setLocalQueryString('')}
          />
        </div>
        <div className={styles.sortWrapper}>
          <div className={styles.sort}>
            <label htmlFor="sortBy">Sort by: </label>
            <select
              name="sortBy"
              onChange={handleChangeSortField}
              value={state?.sortField}
            >
              <option value="title">Title</option>
              <option value="createdTime">Time added</option>
            </select>
          </div>
          <div className={styles.sort}>
            <label htmlFor="sortDir">Direction: </label>
            <select
              name="sortDir"
              onChange={handleChangeSortDir}
              value={state?.sortDirection}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className={styles.sort}>
            <label htmlFor="filterCategory">Meal Type: </label>
            <select
              name="filterCategory"
              onChange={handleChangeCategory}
              value={state?.categoryFilter}
            >
              <option value="all">All</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>
      </form>
      <div className={styles.addRecipeButton}>
        <Button
          title="Add Recipe"
          onClickHandler={() => {
            dispatch({
              type: 'modalOpen',
              isModalOpen: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default RecipeViewForm;
