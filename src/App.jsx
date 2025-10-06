// TODO
import {
  useState,
  // useReducer,
  // useLocation,
  // useCallback,
  // useEffect,
} from 'react';
import Header from './shared/Header';
import styles from './App.module.css';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import { records } from './data';
import Modal from './features/Modal/Modal';
import RecipeForm from './features/RecipeForm/RecipeForm';
import { Route, Routes } from 'react-router';

const initialRecipesState = {
  recipes: records,
  errorMessage: '',
  queryString: '',
  isSaving: false,
  sortDirection: 'desc',
  sortField: 'createdTime',
};

function App() {
  // const [recipeState, dispatch] = useReducer(recipesReducer, initialRecipesState);
  const [title, setTitle] = useState('Home');
  const [isModalOpen, setModalOpen] = useState(false);
  // const location = useLocation();

  // const token = `Bearer ${import.meta.env.VITE_PAT}`;

  // const encodeUrl = useCallback(() => {
  //   const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  //   let searchQuery = '';
  //   let sortQuery = `sort[0][field]=${recipeState.sortField}&sort[0][direction]=${recipeState.sortDirection}`;
  //   if (recipeState.queryString) {
  //     searchQuery = `&filterByFormula=SEARCH("${recipeState.queryString}",+title)`;
  //   }
  //   return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  // }, [
  //   recipeState.sortField,
  //   recipeState.sortDirection,
  //   recipeState.queryString,
  // ]);

  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   switch (location.pathname) {
  //     case '/':
  //       setTitle('Todo List');
  //       break;
  //     case '/about':
  //       setTitle('About');
  //       break;
  //     default:
  //       setTitle('Not Found');
  //   }
  // }, [location]);

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     // dispatch({ type: todoActions.fetchTodos, isLoading: true });
  //     const options = getOptions('GET', token);
  //     try {
  //       const url = encodeUrl();
  //       const resp = await fetch(url, options);
  //       if (!resp.ok) {
  //         throw new Error(resp.message || 'Something went wrong!');
  //       }
  //       const { records } = await resp.json();
  //       dispatch({ type: todoActions.loadTodos, records });
  //     } catch (error) {
  //       dispatch({
  //         type: todoActions.setLoadError,
  //         errorMessage: error.message,
  //       });
  //     } finally {
  //       dispatch({ type: todoActions.fetchTodos, isLoading: false });
  //     }
  //   };
  //   fetchTodos();
  // }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  return (
    <div className={styles.appWrapper}>
      <Header title={title} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                recipeState={initialRecipesState}
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
            element={<RecipePage recipes={initialRecipesState.recipes} />}
          />

          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Create a recipe</h2>
        <RecipeForm />
      </Modal>
      <footer>
        <p>
          &copy; <span className={styles.currentYear}>{currentYear}</span>
          My Todo List
        </p>
      </footer>
    </div>
  );
}

export default App;
