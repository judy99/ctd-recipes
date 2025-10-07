// TODO
import React from 'react';
import { Link } from 'react-router';
import styles from './RecipeListItem.module.css';
import CategoryBadge from '../../shared/CategoryBadge';

function RecipeListItem({ recipe, onViewRecipe, onUpdateRecipe }) {
  // const [saved, setSaved] = React.useState(false);
  // const [deleted, setDeleted] = React.useState(false);

  // const onSave = () => {
  //   console.log("props on card***", props.card);
  //   if (props.loggedIn) {
  //     setSaved(!saved);
  //     props.onCardSave(props.card);
  //   }
  // };

  // const onDelete = (e) => {
  //   e.stopPropagation();
  //   if (props.loggedIn) {
  //     setDeleted(true);
  //   }
  // };

  return (
    <li className={styles.recipe__item}>
      <div
        className={styles.recipe__tools}
        style={{ backgroundImage: `url(${recipe?.photo})` }}
      >
        <div className="recipe__tools-action">
          {/* {props.isMainPage && (
            <button
              className={`btn-news news__icon-save ${
                saved ? 'news__icon-save_marked' : 'news__icon-save_normal'
              }`}
              onClick={onSave}
            ></button>
          )} */}
        </div>
      </div>
      <div className={styles.recipe__post}>
        <Link to={`/recipe/${recipe.id}`}>
          {/* <div className="recipe__date">{props.card?.publishedAt}</div> */}
          <h3 className={styles.recipe__title}>{recipe.title}</h3>
        </Link>
        <CategoryBadge category={recipe.category} />
        <a href={recipe.source} className={styles.recipe__source}>
          {recipe.source}
        </a>
      </div>
    </li>
  );
}

export default RecipeListItem;
