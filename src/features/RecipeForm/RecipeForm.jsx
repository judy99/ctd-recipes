import { useState } from 'react';
import styles from './RecipeForm.module.css';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import TextareaWithLabel from '../../shared/TextareaWithLabel';
import Button from '../../shared/Button';

export default function RecipeForm({ addRecipe }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [method, setMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      category,
      ingredients,
      method,
      notes,
      image: imageFile,
    };

    addRecipe(newRecipe);

    // Optionally reset the form
    setTitle('');
    setCategory('');
    setIngredients('');
    setMethod('');
    setNotes('');
    setImageFile(null);
  };
  return (
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
        <Button title="Cancel" onClickHandler={() => {}} />
        <Button title="Save" onClickHandler={handleSubmit} />
      </div>
    </form>
  );
}
