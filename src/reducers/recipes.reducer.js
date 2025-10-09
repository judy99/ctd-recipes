const initialState = {
  recipes: [],
  isLoading: false,
  errorMessage: '',
  queryString: '',
  isSaving: false,
  sortDirection: 'asc',
  sortField: 'title',
  recipeToEdit: null,
};

const actions = {
  //actions in useEffect that loads recipes
  fetchRecipes: 'fetchRecipes',
  loadRecipes: 'loadRecipes',
  //found in useEffect and addRecipes to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addRecipes
  startRequest: 'startRequest',
  addRecipe: 'addRecipe',
  endRequest: 'endRequest',
  //found in helper functions
  updateRecipe: 'updateRecipe',
  //reverts recipes when requests fail
  revertRecipe: 'revertRecipe',
  //action on Dismiss Error button
  clearError: 'clearError',
  // change sort direction in RecipesViewForm
  changeSortDirection: 'changeSortDirection',
  // change sort field in RecipesViewForm
  changeSortField: 'changeSortField',
  // change query string
  changeQueryString: 'changeQueryString',
  modalOpen: 'modalOpen',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // Pessimistic UI for fetching
    // fetchRecipes, loadRecipes, setLoadError
    case actions.fetchRecipes:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case actions.modalOpen:
      return {
        ...state,
        isModalOpen: action.isModalOpen,
        recipeToEdit: action.recipeToEdit,
      };

    case actions.loadRecipes:
      const recipes = action.records.map((record) => {
        const item = {
          id: record.id,
          ...record.fields,
        };
        return item;
      });

      return {
        ...state,
        recipes: [...recipes],
        isLoading: false,
      };

    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    // add recipe (pessimistic UI)
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.endRequest:
      return {
        ...state,
        isSaving: false,
        isLoading: false,
      };

    case actions.addRecipe:
      const savedRecipe = {
        id: action.records[0].id,
        ...action.records[0].fields,
      };

      // Airtable does not return false or empty fields
      if (!action.records[0].fields.urlCloudinary) {
        savedRecipe.urlCloudinary = null;
      }

      return {
        ...state,
        isSaving: false,
        recipes: [...state.recipes, savedRecipe],
      };

    // updateRecipe (Optimistic UI)
    case actions.revertRecipe:
    case actions.updateRecipe:
      const updatedRecipesList = state.recipes.map((recipe) =>
        recipe.id === action.editedRecipe.id ? action.editedRecipe : recipe
      );

      const updatedState = {
        ...state,
        recipes: [...updatedRecipesList],
        errorMessage: action.errorMessage ? action.errorMessage : '',
      };
      return {
        ...updatedState,
      };

    case actions.changeSortField:
      return {
        ...state,
        sortField: action.sortField,
      };

    case actions.changeSortDirection:
      return {
        ...state,
        sortDirection: action.sortDirection,
      };

    case actions.changeQueryString:
      return {
        ...state,
        queryString: action.queryString,
      };
  }
}

export { initialState, actions, reducer };
