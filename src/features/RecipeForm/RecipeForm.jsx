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
  const [source, setSource] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  // const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState('');

  const { dispatch } = useRecipeContext();

  // Access environment variables securely
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleCancel = () =>
    dispatch({ type: 'modalOpen', isModalOpen: false });

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(file));
    // setImageUrl(''); // Clear previous image URL
  };

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
      console.log('data.secure_url:::', data.secure_url);
      // setCloudinaryImageUrl(data.secure_url); // Store the public URL of the uploaded image
      // console.log('cloudinaryImageUrl:::', cloudinaryImageUrl);
      // setLoading(false);
      alert('Image uploaded successfully!');
      return data.secure_url;
    } catch (error) {
      console.error('Upload Error:', error);
      // setLoading(false);
      alert('Failed to upload image.');
    }
  };

  // If editing, populate form with recipe data
  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      setCategory(recipeToEdit.category || '');
      setIngredients(recipeToEdit.ingredients || '');
      setMethod(recipeToEdit.method || '');
      setNotes(recipeToEdit.notes || '');
      setSource(recipeToEdit.source || '');
      setImageUrl(recipeToEdit.urlCloudinary || '');
      // setImagePreviewUrl(recipeToEdit.imageUrl || null);
      // optionally preload image if available
    }
  }, [recipeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlCloudinary = await cloudinaryUpload();

    console.log('urlCloudinary:', urlCloudinary);

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
    setSource('');
    setImageFile(null);

    handleCancel();
  };

  return (
    <div>
      <h2>{`${recipeToEdit ? 'Update ' : 'Create '}`}a recipe</h2>
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
          {/* {imageUrl && ( */}
          <div className={styles.previewWrapper}>
            {/* <h4>Image Preview:</h4> */}
            <img
              src={imageUrl}
              alt="Recipe image"
              className={styles.imagePreview}
            />
            {/* <p className={styles.imageUrl}>{imageUrl}</p> */}
          </div>
          {/* )} */}
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
            className={styles.notes}
            labelText="Notes:"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={'Enter notes...'}
          />
        </div>
        <div className={styles.formItem}>
          <TextInputWithLabel
            labelText="Source:"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder={'Enter source...'}
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
