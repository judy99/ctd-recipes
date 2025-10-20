import styles from '../App.module.css';
import RecipeList from '../features/RecipeList/RecipeList';
import Button from '../shared/Button/Button';
import RecipeFilterForm from '../features/RecipeFilterForm/RecipeFilterForm';
import { useRecipeContext } from '../context/RecipeContext';

export default function HomePage({ addRecipe }) {
  const { state, dispatch } = useRecipeContext();

  return (
    <>
      <RecipeFilterForm
        addRecipe={addRecipe}
        // to force re-render to clear search and filters
        key={state.isModalOpen ? 'open' : 'closed'}
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
      <RecipeList />
    </>
  );
}
