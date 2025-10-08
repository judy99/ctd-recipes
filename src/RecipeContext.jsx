import { createContext, useContext, useReducer } from 'react';
import {
  reducer as recipesReducer,
  // actions,
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

export function useRecipeContext() {
  return useContext(RecipeContext);
}
