// TODO
import RecipeListItem from './RecipeListItem';
import styles from './RecipeList.module.css';
import Pagination from '../Pagination/Pagination';
// import { useSearchParams, useNavigate } from 'react-router';
// import Pagination from '../Pagination/Pagination';
// import { useEffect } from 'react';

function RecipeList({
  recipeList,
  // onCompleteTodo,
  // onUpdateTodo,
  isLoading,
  // isSearch,
}) {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const itemsPerPage = 5;
  // let currentPage = parseInt(searchParams.get('page') || 1, 10);
  // const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  // const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  // uncompleted items on a page
  // const slicedTodoList = filteredTodoList.slice(
  //   indexOfFirstTodo,
  //   indexOfFirstTodo + itemsPerPage
  // );
  const slicedRecipeList = recipeList; // todo
  // let totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  // useEffect(() => {
  //   // don’t redirect when data is empty
  //   if (totalPages > 0) {
  //     if (
  //       currentPage < 1 ||
  //       currentPage > totalPages ||
  //       Number.isNaN(currentPage)
  //     ) {
  //       navigate('/');
  //     }
  //   }
  // }, [currentPage, totalPages, navigate]);

  // if we search and nothing found
  // if (isSearch && !slicedRecipeList.length) {
  //   return <p>{'Nothing found...'}</p>;
  // }

  return isLoading ? (
    <p>{'Recipe list loading...'}</p>
  ) : slicedRecipeList.length ? (
    <>
      <ul className={styles.recipeList}>
        {slicedRecipeList.map((recipe) => (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            // onCompleteTodo={onCompleteTodo}
            // onUpdateTodo={onUpdateTodo}
          />
        ))}
      </ul>
      <Pagination
      // totalPages={totalPages}
      // currentPage={currentPage}
      // setSearchParams={setSearchParams}
      // searchParams={searchParams}
      />
    </>
  ) : (
    // if recipe list is empty
    <p>{'Add recipe to get started'}</p>
  );
}

export default RecipeList;
