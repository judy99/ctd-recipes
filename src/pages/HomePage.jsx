// TODO
import styles from '../App.module.css';
import RecipeList from '../features/RecipeList/RecipeList';
import Button from '../shared/Button';
// import RecipeForm from '../features/RecipeForm';
import RecipeViewForm from '../features/RecipeViewForm';
import { useRecipeContext } from '../RecipeContext';

export default function HomePage({
  // recipeState,
  addRecipe,
  // recipesActions,
  // dispatch,
  // dispatch,
  // todoActions,
  // addTodo,
  // completeTodo,
  // updateTodo,
  // isSearch,
}) {
  const { state, dispatch } = useRecipeContext();

  return (
    <>
      <RecipeViewForm
        // recipe={state.recipes}
        addRecipe={addRecipe}
        // recipesActions={recipesActions}
        // dispatch={dispatch}
      />
      {state?.errorMessage?.length ? (
        <div className={styles.errorWrapper}>
          <div className={styles.error}>
            <p>Error: {state?.errorMessage}</p>

            <Button
              title="Dismiss"
              onClickHandler={() => dispatch({ type: 'clearError' })}
            />
          </div>
        </div>
      ) : null}
      <RecipeList
      // recipeList={recipeState.recipes}
      // recipeState={recipeState}
      // recipesActions={recipesActions}
      // dispatch={dispatch}
      // onCompleteTodo={completeTodo}
      // onUpdateTodo={updateTodo}
      // isLoading={recipeState}
      // isSearch={isSearch}
      />
    </>
  );
}
