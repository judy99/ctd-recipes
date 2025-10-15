import { createContext, useContext, useReducer } from 'react';
import {
  reducer as recipesReducer,
  initialState as initialState,
} from './reducers/recipes.reducer';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [state, dispatch] = useReducer(recipesReducer, initialState);
  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecipeContext() {
  return useContext(RecipeContext);
}
