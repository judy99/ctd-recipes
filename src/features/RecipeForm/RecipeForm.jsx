import { useState, useEffect } from 'react';
import styles from './RecipeForm.module.css';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import TextareaWithLabel from '../../shared/TextareaWithLabel';
import { DEFAULT_PHOTO_URL, DEFAULT_CATEGORY } from '../../shared/constants';
import Button from '../../shared/Button';
import { useRecipeContext } from '../../RecipeContext';

export default function RecipeForm({
  addRecipe,
  updateRecipe,
  recipeToEdit = null,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [ingredients, setIngredients] = useState('');
  const [method, setMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(DEFAULT_PHOTO_URL);
  const [errors, setErrors] = useState({ title: '', method: '' });
  const { state, dispatch } = useRecipeContext();

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!method.trim()) {
      newErrors.method = 'Method is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () =>
    dispatch({ type: 'modalOpen', isModalOpen: false });

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(file));
  };

  // remove a temporary URL (for file preview) from memory
  // to avoid a memory leak
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const cloudinaryUpload = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);
    try {
      dispatch({ type: 'startRequest' });
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Cloudinary upload failed.');
      }
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      dispatch({
        type: 'setLoadError',
        errorMessage: error.message,
      });
    } finally {
      dispatch({ type: 'endRequest' });
    }
  };

  // If editing, populate form with recipe data
  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      setCategory(recipeToEdit.category || DEFAULT_CATEGORY);
      setIngredients(recipeToEdit.ingredients || '');
      setMethod(recipeToEdit.method || '');
      setNotes(recipeToEdit.notes || '');
      setSource(recipeToEdit.source || '');
      setImageUrl(recipeToEdit.urlCloudinary || DEFAULT_PHOTO_URL);
    }
  }, [recipeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    let urlCloudinary = imageUrl;
    // upload to Cloudinary only if user chooses their own image
    // otherwise - use default image which is already uploaded
    if (imageFile) urlCloudinary = await cloudinaryUpload();

    const recipeData = {
      title,
      category,
      ingredients,
      method,
      notes,
      source,
      urlCloudinary,
    };

    if (recipeToEdit && updateRecipe) {
      updateRecipe({ id: recipeToEdit.id, ...recipeData });
    } else {
      addRecipe(recipeData);
    }

    handleCancel();
  };

  return (
    <div>
      <h2 className={styles.formTitle}>
        {`${recipeToEdit ? 'Update ' : 'Create '}`}a recipe
      </h2>
      <form id="recipeForm" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formUploadFile}>
          <label htmlFor="imageUpload" className={styles.uploadLabel}>
            {imageUrl ? 'Change Image' : 'Choose Image'}
          </label>{' '}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />
          <div className={styles.previewWrapper}>
            <img
              src={imageUrl}
              alt="Recipe image"
              className={styles.imagePreview}
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <TextInputWithLabel
            labelText="Title:"
            value={title}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, title: '' });
              } else {
                setErrors({ ...errors, title: 'Title is required.' });
              }
              setTitle(e.target.value);
            }}
            error={errors.title}
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
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <div className={styles.formItem}>
          <TextareaWithLabel
            labelText="Ingredients (optional):"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <TextareaWithLabel
            labelText="Method:"
            value={method}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, method: '' });
              } else {
                setErrors({ ...errors, method: 'Method is required.' });
              }
              setMethod(e.target.value);
            }}
            error={errors.method}
          />
        </div>
        <div className={styles.formItem}>
          <TextareaWithLabel
            className={styles.notes}
            labelText="Notes (optional):"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <TextInputWithLabel
            labelText="Source (optional):"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button title="Cancel" onClickHandler={handleCancel} />
          <Button
            disabled={state.isSaving}
            title={state.isSaving ? 'Saving...' : 'Save'}
            onClickHandler={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
