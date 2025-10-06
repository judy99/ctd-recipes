import React from 'react';
import styles from './RecipeForm.module.css';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import TextareaWithLabel from '../../shared/TextareaWithLabel';
import Button from '../../shared/Button';

export default function RecipeForm() {
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <form id="recipeForm" onSubmit={preventRefresh}>
      <div className={styles.formUploadFile}>
        <input
          type="file"
          accept="image/*" // Restrict to image files
          // onChange={handleFileChange}
          // Optional: Capture attribute for mobile devices to use camera
          // capture="user"
        />
      </div>
      <div className={styles.formItem}>
        <TextInputWithLabel
          labelText="Title:"
          // elementId={'recipeSearch'}
          // onChange={(e) => setLocalQueryString(e.target.value)}
          // value={localQueryString}
          placeholder={'Enter a name...'}
        />
      </div>
      <div className={styles.category}>
        <label htmlFor="chooseCategory">Choose category: </label>
        <select
          name="chooseCategory"
          // onChange={handleChangeSortField}
          // value={recipe.sortField}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
      <div className={styles.formItem}>
        <TextareaWithLabel
          labelText="Ingredients:"
          // elementId={'recipeSearch'}
          // onChange={(e) => setLocalQueryString(e.target.value)}
          // value={localQueryString}
          placeholder={'Enter ingredients...'}
        />
      </div>
      <div className={styles.formItem}>
        <TextareaWithLabel
          labelText="Method:"
          // elementId={'recipeSearch'}
          // onChange={(e) => setLocalQueryString(e.target.value)}
          // value={localQueryString}
          placeholder={'Enter a method...'}
        />
      </div>
      <div className={styles.formItem}>
        <TextareaWithLabel
          labelText="Notes:"
          // elementId={'recipeSearch'}
          // onChange={(e) => setLocalQueryString(e.target.value)}
          // value={localQueryString}
          placeholder={'Enter notes...'}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button title="Cancel" onClickHandler={() => {}} />
        <Button title="Save" onClickHandler={() => {}} />
      </div>
    </form>
  );
}
