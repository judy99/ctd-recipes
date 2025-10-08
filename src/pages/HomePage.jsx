// TODO
import styles from '../App.module.css';
import RecipeList from '../features/RecipeList/RecipeList';
import Button from '../shared/Button';
// import RecipeForm from '../features/RecipeForm';
import RecipeViewForm from '../features/RecipeViewForm';

export default function HomePage({
  recipeState,
  addRecipe,
  recipesActions,
  dispatch,
  // dispatch,
  // todoActions,
  // addTodo,
  // completeTodo,
  // updateTodo,
  // isSearch,
}) {
  return (
    <>
      <RecipeViewForm
        recipe={recipeState.recipes}
        addRecipe={addRecipe}
        recipesActions={recipesActions}
        dispatch={dispatch}
      />
      {recipeState?.errorMessage?.length ? (
        <div className={styles.errorWrapper}>
          <div className={styles.error}>
            <p>Error: {recipeState?.errorMessage}</p>

            <Button title="Dismiss" />
            {/* <button
              className="formButton"
              type="button"
              onClick={() => dispatch({ type: todoActions.clearError })}
            >
              Dismiss
            </button> */}
          </div>
        </div>
      ) : null}
      <RecipeList
        recipeList={recipeState.recipes}
        // onCompleteTodo={completeTodo}
        // onUpdateTodo={updateTodo}
        // isLoading={recipeState}
        // isSearch={isSearch}
      />
    </>
  );
}
