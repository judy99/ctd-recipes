// TODO
import { useState, useEffect } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
// import { actions as todoActions } from '../reducers/todos.reducer';
import Button from '../shared/Button';
import styles from './RecipeViewForm.module.css';

const RecipeViewForm = ({ recipe }) => {
  const [localQueryString, setLocalQueryString] = useState(recipe?.queryString);

  // const handleChangeSortField = (e) => {
  //   dispatch({ type: todoActions.changeSortField, sortField: e.target.value });
  // };

  // const handleChangeSortDir = (e) => {
  //   dispatch({
  //     type: todoActions.changeSortDirection,
  //     sortDirection: e.target.value,
  //   });
  // };

  useEffect(() => {
    const debounce = setTimeout(() => {
      // dispatch({
      //   type: todoActions.changeQueryString,
      //   queryString: localQueryString,
      // });
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString]);

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
              // onChange={handleChangeSortField}
              value={recipe.sortField}
            >
              <option value="title">Title</option>
              <option value="createdTime">Time added</option>
            </select>
          </div>
          <div className={styles.sort}>
            <label htmlFor="sortDir">Direction: </label>
            <select
              name="sortDir"
              // onChange={handleChangeSortDir}
              value={recipe.sortDirection}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className={styles.sort}>
            <label htmlFor="filterCategory">Meal Type: </label>
            <select
              name="filterCategory"
              // onChange={handleChangeSortDir}
              value={recipe.categoryFilter}
            >
              <option value="dinner">Dinner</option>
              <option value="lunch">Lunch</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>
      </form>
      <div>
        <Button title="Add Recipe" />
      </div>
    </div>
  );
};

export default RecipeViewForm;
