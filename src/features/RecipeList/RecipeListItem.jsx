// import { useEffect, useState } from 'react';
// import TextInputWithLabel from '../../shared/TextInputWithLabel';
import Button from '../../shared/Button';
import styles from './RecipeListItem.module.css';

function RecipeListItem({ recipe, onViewRecipe, onUpdateRecipe }) {
  // const [isEditing, setIsEditing] = useState(false);
  // const [workingTitle, setWorkingTitle] = useState(todo.title);

  // const handleCancel = () => {
  //   setWorkingTitle(todo.title);
  //   setIsEditing(false);
  // };

  // const handleEdit = (e) => {
  //   setWorkingTitle(e.target.value);
  // };

  // const handleUpdate = (e) => {
  //   if (!isEditing) return;
  //   e.preventDefault();
  //   onUpdateTodo({ ...todo, title: workingTitle });
  //   setIsEditing(false);
  // };

  // const handleChange = () => {
  //   onCompleteTodo(todo.id);
  // };

  // useEffect(() => {
  //   setWorkingTitle(todo.title);
  // }, [todo]);

  return (
    <li className={styles.itemWrapper}>
      <div className={styles?.itemTitle}>{recipe.title}</div>
      {/* go to the Recipe Page */}
      <Button title="View" onClickHandler={onViewRecipe} />
      {/* open the Recipe Update Form */}
      <Button title="Update" onClickHandler={onUpdateRecipe} />
    </li>
  );
}

export default RecipeListItem;
