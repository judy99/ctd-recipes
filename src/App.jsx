// TODO
import { useState, useReducer, useCallback, useEffect } from 'react';

import {
  reducer as recipesReducer,
  actions as recipesActions,
  // initialState as initialRecipesState,
} from './reducers/recipes.reducer';
import { getOptions } from './utility/getOptions';

import Header from './shared/Header';
import styles from './App.module.css';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
// import { records } from './data';
import Modal from './features/Modal/Modal';
import RecipeForm from './features/RecipeForm/RecipeForm';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Route, Routes, useLocation } from 'react-router';

const initialState = {
  recipes: [],
  errorMessage: '',
  queryString: '',
  isSaving: false,
  sortDirection: 'desc',
  sortField: 'name',
};

function App() {
  const [recipeState, dispatch] = useReducer(recipesReducer, initialState);
  const [title, setTitle] = useState('Home');
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${recipeState.sortField}&sort[0][direction]=${recipeState.sortDirection}`;
    if (recipeState.queryString) {
      searchQuery = `&filterByFormula=SEARCH("${recipeState.queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [
    recipeState.sortField,
    recipeState.sortDirection,
    recipeState.queryString,
  ]);

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
      dispatch({ type: recipesActions.fetchRecipes, isLoading: true });
      const options = getOptions('GET', token);
      try {
        const url = encodeUrl();
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.message || 'Something went wrong!');
        }
        const { records } = await resp.json();
        dispatch({ type: recipesActions.loadRecipes, records });
      } catch (error) {
        dispatch({
          type: recipesActions.setLoadError,
          errorMessage: error.message,
        });
      } finally {
        dispatch({ type: recipesActions.fetchRecipes, isLoading: false });
      }
    };
    fetchRecipes();
  }, [
    recipeState.sortField,
    recipeState.sortDirection,
    recipeState.queryString,
  ]);

  return (
    <div className={styles.appWrapper}>
      <Header title={title} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                recipeState={recipeState}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
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
            element={<RecipePage recipes={recipeState.recipes} />}
          />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Create a recipe</h2>
        <RecipeForm />
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
