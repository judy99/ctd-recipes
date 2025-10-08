// TODO
import { useParams } from 'react-router';
import styles from './RecipePage.module.css';
import Button from '../shared/Button';
import CategoryBadge from '../shared/CategoryBadge';
import { DEFAULT_PHOTO } from '../shared/constants';

export default function RecipePage({ recipes }) {
  const { id } = useParams();
  const recipe = recipes?.find((r) => r.id == id);
  return (
    <>
      {/* 1 block */}
      <div className={styles.recipeHeader}>
        <img
          className={styles.recipePhoto}
          src={recipe.photo || DEFAULT_PHOTO}
          alt={recipe.title}
        />

        <div className={styles.recipeTitle}>
          <CategoryBadge category={recipe?.category} />
          <h2>{recipe?.title}</h2>
          <Button title="Edit Recipe" />
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
        </div>
      </div>
    </>
  );
}
