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
import RecipesPage from './pages/RecipePage';
import { records } from './data';

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
        <RecipesPage recipeState={initialRecipesState} />
      </main>
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
