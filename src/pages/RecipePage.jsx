import { useParams } from 'react-router';
import { useRecipeContext } from '../context/RecipeContext';
import Recipe from '../features/Recipe/Recipe';

export default function RecipePage() {
  const { id } = useParams();
  const { state, dispatch } = useRecipeContext();

  const recipe = state.recipes?.find((r) => r.id == id);
  return <Recipe recipe={recipe} dispatch={dispatch} />;
}
