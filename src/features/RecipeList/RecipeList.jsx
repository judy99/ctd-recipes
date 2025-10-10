import RecipeListItem from './RecipeListItem';
import styles from './RecipeList.module.css';
import Pagination from '../Pagination/Pagination';
import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useRecipeContext } from '../../RecipeContext';

function RecipeList() {
  const { state } = useRecipeContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemsPerPage = 2;
  let currentPage = parseInt(searchParams.get('page') || 1, 10);
  const indexOfFirstRecipe = (currentPage - 1) * itemsPerPage;
  const slicedRecipes = state.recipes.slice(
    indexOfFirstRecipe,
    indexOfFirstRecipe + itemsPerPage
  );

  let totalPages = Math.ceil(state.recipes.length / itemsPerPage);

  useEffect(() => {
    // don’t redirect when data is empty
    if (totalPages > 0) {
      if (
        currentPage < 1 ||
        currentPage > totalPages ||
        Number.isNaN(currentPage)
      ) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  // if we search and nothing found
  if (state.queryString && !slicedRecipes.length) {
    return <p>{'Nothing found...'}</p>;
  }

  return state.isLoading ? (
    <p>{'Recipe list loading...'}</p>
  ) : slicedRecipes.length ? (
    <>
      <ul className={styles.recipeList}>
        {slicedRecipes.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </>
  ) : (
    // if recipe list is empty
    <p>{'Add recipe to get started'}</p>
  );
}

export default RecipeList;
