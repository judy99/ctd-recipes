import { useState, useEffect } from 'react';
import styles from './RecipeForm.module.css';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import TextareaWithLabel from '../../shared/TextareaWithLabel';
import Button from '../../shared/Button';
import { useRecipeContext } from '../../RecipeContext';

export default function RecipeForm({
  addRecipe,
  updateRecipe,
  recipeToEdit = null,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [method, setMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const { dispatch } = useRecipeContext();

  const handleCancel = () =>
    dispatch({ type: 'modalOpen', isModalOpen: false });

  // If editing, populate form with recipe data
  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      setCategory(recipeToEdit.category || '');
      setIngredients(recipeToEdit.ingredients || '');
      setMethod(recipeToEdit.method || '');
      setNotes(recipeToEdit.notes || '');
      // optionally preload image if available
    }
  }, [recipeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      category,
      ingredients,
      method,
      notes,
      image: imageFile,
    };

    if (recipeToEdit && updateRecipe) {
      updateRecipe({ id: recipeToEdit.id, ...recipeData }); // Use recipe ID
    } else {
      addRecipe(recipeData);
    }

    // Optionally reset the form
    setTitle('');
    setCategory('');
    setIngredients('');
    setMethod('');
    setNotes('');
    setImageFile(null);

    handleCancel();
  };

  return (
    <div>
      <h2>{`${recipeToEdit ? 'Update ' : 'Create '}`}a recipe</h2>
      <form id="recipeForm" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formUploadFile}>
          <input
            type="file"
            accept="image/*" // Restrict to image files
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <div className={styles.formItem}>
          <TextInputWithLabel
            labelText="Title:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={'Enter a recipe title...'}
          />
        </div>
        <div className={styles.category}>
          <label htmlFor="chooseCategory">Choose category: </label>
          <select
            name="chooseCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className={styles.formItem}>
          <TextareaWithLabel
            labelText="Ingredients:"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder={'Enter ingredients...'}
          />
        </div>
        <div className={styles.formItem}>
          <TextareaWithLabel
            labelText="Method:"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder={'Enter a method...'}
          />
        </div>
        <div className={styles.formItem}>
          <TextareaWithLabel
            labelText="Notes:"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={'Enter notes...'}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button title="Cancel" onClickHandler={handleCancel} />
          <Button title="Save" onClickHandler={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
