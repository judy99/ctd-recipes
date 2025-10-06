// TODO
import { useParams } from 'react-router';
import styles from './RecipePage.module.css';
import RecipeList from '../features/RecipeList/RecipeList';
import Button from '../shared/Button';
// import RecipeForm from '../features/RecipeForm';
import RecipeViewForm from '../features/RecipeViewForm';

export default function RecipePage({ recipes }) {
  console.log('recipes::::', recipes);
  const { id } = useParams();
  const recipe = recipes?.find((r) => r.id == id);
  return (
    <>
      {/* 1 */}
      <div className={styles.recipeHeader}>
        <div
          style={{
            width: '300px',
            height: '300px',
            backgroundColor: '#ccc',
            backgroundImage: `url(${recipe?.photo})`,
          }}
        ></div>
        <div className={styles.recipeTitle}>
          <h3>{recipe?.category}</h3>
          <h2>{recipe?.title}</h2>
        </div>
        <Button title="Edit" />
      </div>
      {/* 2 */}
      <div className={styles.recipeMain}>
        <div className={styles.recipeIngredients}>{recipe?.ingredients}</div>
        <div className={styles.recipeMethod}>
          <p>{recipe?.method}</p>
          <p>{recipe?.notes}</p>
        </div>
      </div>
    </>
  );
}
