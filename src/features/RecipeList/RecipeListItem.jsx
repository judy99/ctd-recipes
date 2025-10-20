import { Link } from 'react-router';
import styles from './RecipeListItem.module.css';
import CategoryBadge from '../../shared/CategoryBadge/CategoryBadge';
import { DEFAULT_PHOTO_URL } from '../../shared/constants';

function RecipeListItem({ recipe }) {
  return (
    <li className={styles.recipeItem}>
      <img
        className={styles.recipePhoto}
        src={recipe.urlCloudinary || DEFAULT_PHOTO_URL}
        alt={recipe.title}
      />
      <div className={styles.recipeContent}>
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className={styles.recipeTitle}>{recipe.title}</h3>
        </Link>
        <div className={styles.categoryListItem}>
          <CategoryBadge category={recipe.category} />
        </div>
        <a href={recipe.source} className={styles.recipeSource}>
          {recipe.source}
        </a>
      </div>
    </li>
  );
}

export default RecipeListItem;
