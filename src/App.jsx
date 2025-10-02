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

// recipe structure
// const record = {
//   fields: {
//     photo: object,
//     category: [string],
//     title: string,
//     ingredients: string,
//     method: string,
//     notes: string,
//   },
// };

const recipe1 = {
  id: 1,
  photo: './src/assets/recipe1.png',
  category: 'breakfast',
  title: 'Chinese Eggplant with Garlic Sauce',
  ingredients: `10 oz Chinese eggplant (about 2 small eggplant) , chopped to bite-size pieces (*Footnote 1)
1 teaspoon salt
1 tablespoon cornstarch
Sauce:
1 tablespoon light soy sauce (or soy sauce)
1 tablespoon water
1/2 teaspoon dark soy sauce (*see footnote 3)
2 teaspoons sugar
1 teaspoon cornstarch`,
  method: `
1. Spread the sliced eggplant on a towel.
2. Sprinkle Kosher salt on both surfaces of the sliced eggplant.
3. Allow to rest for 15 minutes.
4. Rinse the salt off the eggplant and pat each surface dry.
The second way is:
Place the eggplant in a large bowl and add water to cover.
Add 1/4 teaspoon salt, mix well.
Place a pot lid on top to keep the eggplant under water for 15 minutes.
Drain and pat dry
`,
  notes: `The secret to getting perfect Chinese style eggplant involves two things.
You have to prepare the eggplant properly before cooking in order to get the right texture.
You need to make a sauce that is flavorful enough.
To prepare the eggplant, there are two ways to do it.
Before introducing the first method, I want to thank my friend Steve S. He taught me this method quite a long time ago, to prevent the eggplant from absorbing oil.`,
};

const recipe2 = {
  id: 2,
  photo: './src/assets/recipe2.png',
  category: 'lunch',
  title: 'Wonton Soup',
  ingredients: `1 pack wonton wrappers (80 wrappers)
Filling
1/2 lb ground lean pork
1/2 lb peeled shrimp, chopped into small pieces
1 tablespoon finely minced ginger
2 green onions , finely chopped
1 tablespoon light soy sauce (or soy sauce)
2 tablespoons Shaoxing wine (or dry sherry)
1/2 teaspoon salt
2 tablespoons sesame oil
(Option 1) Chicken soup base
8 cups chicken stock
8 teaspoons light soy sauce (or soy sauce)
8 teaspoons minced ginger
4 teaspoons sesame oil
Salt , to taste`,
  method: `
Without a food processor: Combine ground pork, shrimp, ginger, green onion, soy sauce, Shaoxing wine, salt and sesame oil in a big bowl. Mix well with a fork until everything combines well together and the mixture feels a bit sticky.
With a food processor or a blender: coarsely chop the ginger and green onion. Add all the filling ingredients except the shrimp. Mix until it forms a silky paste. Add the shrimp and blend again, until the shrimp are finely chopped but don’t become a paste.
Wrap the wonton
To make wontons, place a wonton wrapper in one hand, scoop a teaspoon of wonton filling and place it near the narrow side of the wonton wrapper (you can add more filling to the wonton if you like, as long as you can still wrap it). Fold the narrow side over the filling, then roll the filling all the way through the other side of the wrapper. Bind both ends and press together to lock the filling inside the wrapper. Brush a thin layer of water onto the wonton wrapper and press the ends together.
Make one wonton at a time, and line up all the wontons on a big wooden cutting board. If you aren’t going to boil the wontons immediately, use a damp paper towel (or cheesecloth) to cover the wontons to prevent them from drying out.
If you aren’t going to boil the wontons the same day, place them in an airtight container with several layers of wet paper towels on the bottom. This way, they can be stored in the fridge for up to 2 days.
(Option 1) Make the chicken soup base
Combine the chicken stock, ginger, and soy sauce in a pot. Bring to a boil. Let boil for 10 minutes. Turn to lowest heat to keep warm and start cooking wontons (see below).
Prepare 8 medium-sized bowls. Pour in 1 cup hot broth into each bowl. Add the cooked wontons and bok choy. Top with green onion and 1/2 teaspoon sesame oil into each bowl. Garnish with cilantro and chili oil, if using. Add a bit more soy sauce or salt to adjust seasoning if needed. Serve hot.
`,
  notes: `There are many types of dried seaweed. My original recipe used a type of instant seaweed that will rehydrate immediately once placed into the hot soup. There are other types of seafood that require some soaking before using. Read the back of your package and follow the instructions accordingly.
The nutrition facts for this recipe are calculated based on 1 bowl of chicken-broth-based soup containing 10 wontons.`,
};

// category structure
// const record = {
//   fields: {
//     name: string,
//   },
// };

const initialRecipesState = {
  recipes: [recipe1, recipe2],
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
