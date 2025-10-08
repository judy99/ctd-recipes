// TODO
import { Link } from 'react-router';
import styles from './RecipeListItem.module.css';
import CategoryBadge from '../../shared/CategoryBadge';
import { DEFAULT_PHOTO } from '../../shared/constants';

function RecipeListItem({ recipe }) {
  return (
    <li className={styles.recipeItem}>
      <img
        className={styles.recipePhoto}
        src={recipe.photo || DEFAULT_PHOTO}
        alt={recipe.name}
      />
      <div className={styles.recipeContent}>
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className={styles.recipeTitle}>{recipe.name}</h3>
        </Link>
        <div className={styles.categoryListItem}>
          {recipe?.categoryName.map((item) => (
            <CategoryBadge category={item} />
          ))}
        </div>
        <a href={recipe.source} className={styles.recipeSource}>
          {recipe.source}
        </a>
      </div>
    </li>
  );
}

export default RecipeListItem;
