// TODO
import { useParams } from 'react-router';
import styles from './RecipePage.module.css';
import Button from '../shared/Button';
import CategoryBadge from '../shared/CategoryBadge';
import { DEFAULT_PHOTO } from '../shared/constants';
import { useRecipeContext } from '../RecipeContext';

export default function RecipePage() {
  const { id } = useParams();
  const { state, dispatch } = useRecipeContext();

  console.log('state RecipePage: ', state);

  const recipe = state.recipes?.find((r) => r.id == id);
  return (
    <>
      {/* 1 block */}
      <div className={styles.recipeHeader}>
        <img
          className={styles.recipePhoto}
          src={recipe?.urlCloudinary || DEFAULT_PHOTO}
          alt={recipe?.title}
        />

        <div className={styles.recipeTitle}>
          <CategoryBadge category={recipe?.category} />
          <h2>{recipe?.title}</h2>
          <Button
            title="Edit Recipe"
            onClickHandler={() => {
              dispatch({
                type: 'modalOpen',
                isModalOpen: true,
                recipeToEdit: recipe,
              });
            }}
          />
        </div>
      </div>
      {/* 2 block */}
      <div className={styles.recipeMain}>
        <div className={styles.recipeIngredients}>
          <h3>Ingredients: </h3>
          {recipe?.ingredients}
        </div>
        <div className={styles.recipeMethod}>
          <div>
            <h3>Method: </h3>
            {recipe?.method}
          </div>
          <div>
            <h3>Notes: </h3>
            {recipe?.notes}
          </div>
          <div>
            <h3>Source: </h3>
            {recipe?.source}
          </div>
        </div>
      </div>
    </>
  );
}
