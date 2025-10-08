// TODO
import { useState, useCallback, useEffect } from 'react';

import { getOptions } from './utility/getOptions';
import Header from './shared/Header';
import styles from './App.module.css';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import Modal from './features/Modal/Modal';
import RecipeForm from './features/RecipeForm/RecipeForm';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Route, Routes, useLocation } from 'react-router';
import { createPayload } from './utility/createPayload';
import { useRecipeContext } from './RecipeContext';

// const initialState = {
//   recipes: [],
//   errorMessage: '',
//   queryString: '',
//   isSaving: false,
//   sortDirection: 'desc',
//   sortField: 'title',
//   isModalOpen: false,
// };

function App() {
  const { state, dispatch } = useRecipeContext();
  console.log('recipeState', state);

  // const [recipeState, dispatch] = useReducer(recipesReducer, initialState);
  const [title, setTitle] = useState('Home');
  // const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${state.sortField}&sort[0][direction]=${state.sortDirection}`;
    if (state.queryString) {
      searchQuery = `&filterByFormula=SEARCH("${state.queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [state.sortField, state.sortDirection, state.queryString]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Recipe Book');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else if (location.pathname.startsWith('/recipe')) {
      setTitle('Recipe');
    } else {
      setTitle('Page Not Found');
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchRecipes = async () => {
      dispatch({ type: 'fetchRecipes', isLoading: true });
      const options = getOptions('GET', token);
      try {
        const url = encodeUrl();
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.message || 'Something went wrong!');
        }
        const { records } = await resp.json();
        dispatch({ type: 'loadRecipes', records });
      } catch (error) {
        dispatch({
          type: 'setLoadError',
          errorMessage: error.message,
        });
      } finally {
        dispatch({ type: 'fetchRecipes', isLoading: false });
      }
    };
    fetchRecipes();
  }, [state.sortField, state.sortDirection, state.queryString]);

  const addRecipe = async (newRecipe) => {
    const payload = createPayload(newRecipe);
    const options = getOptions('POST', token, payload);
    try {
      dispatch({ type: 'startRequest' });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) throw new Error(resp.message || 'Something went wrong!');
      const { records } = await resp.json();
      dispatch({ type: 'addRecipe', records });
    } catch (error) {
      dispatch({
        type: 'setLoadError',
        errorMessage: error.message,
      });
    } finally {
      dispatch({ type: 'endRequest' });
    }
  };

  return (
    <div className={styles.appWrapper}>
      <Header title={title} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                // recipeState={state}
                // dispatch={dispatch}
                addRecipe={addRecipe}
                // recipesActions={recipesActions}
              />

              // <TodosPage
              //   todoState={todoState}
              //   dispatch={dispatch}
              //   todoActions={todoActions}
              //   addTodo={addTodo}
              //   completeTodo={completeTodo}
              //   updateTodo={updateTodo}
              //   isSearch={todoState.queryString}
              // />
            }
          />
          <Route
            path="/recipe/:id"
            element={<RecipePage recipes={state.recipes} />}
          />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Modal
        isModalOpen={state.isModalOpen}
        // recipesActions={recipesActions}
        dispatch={dispatch}
      >
        <h2>Create a recipe</h2>
        <RecipeForm addRecipe={addRecipe} />
      </Modal>
      <footer>
        <p>
          &copy; <span className={styles.currentYear}>{currentYear}</span>
          Recipe Book
        </p>
      </footer>
    </div>
  );
}

export default App;
