import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'utils/api';

export const fetchRecipeList = createAsyncThunk(
  'recipes/fetchRecipeList',
  async () => {
    const response = await api.get('/recipes');
    return response.data;
  },
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (recipeId) => {
    const response = await api.get(`/recipes/${recipeId}`);
    return response.data;
  },
);

export const fetchRecipeByName = createAsyncThunk(
  'recipes/fetchRecipeByName',
  async (recipeName: string) => {
    const title = recipeName.replaceAll('-', ' ');
    const response = await api.get(`/recipes/${title}`);
    return response.data;
  },
);

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    chosenRecipe: [],
    chosenRecipeId: 0,
    recipeList: [],
    recipeListLoading: 'idle',
    chosenRecipeLoading: 'idle',
    chosenRecipeTitle: '',
  },

  reducers: {
    setRecipeTitle: (state, action) => {
      state.chosenRecipeTitle = action.payload;
    },
    resetChosenRecipe: (state) => {
      state.chosenRecipe = [];
      state.chosenRecipeTitle = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipeList.pending, (state) => {
      if (state.recipeListLoading === 'idle') {
        state.recipeListLoading = 'pending';
      }
    });
    builder.addCase(fetchRecipeByName.pending, (state) => {
      if (state.chosenRecipeLoading === 'idle') {
        state.chosenRecipeLoading = 'pending';
      }
    });
    builder.addCase(fetchRecipeList.fulfilled, (state, action) => {
      state.recipeList = action.payload.data;
      state.recipeListLoading = 'fulfilled';
    });
    builder.addCase(fetchRecipeById.fulfilled, (state, action) => {
      state.chosenRecipe = action.payload.data;
    });
    builder.addCase(fetchRecipeByName.fulfilled, (state, action) => {
      const { id, title } = action.payload.data;
      state.chosenRecipeId = id;
      state.chosenRecipeTitle = title;
      state.chosenRecipe = action.payload.data;
      state.chosenRecipeLoading = 'idle';
    });
  },
});

export const selectAllRecipes = (state) => state.recipe.recipeList;

export const selectChosenRecipe = (state) => state.recipe.chosenRecipe;

export const selectChosenRecipeLoading = (state) =>
  state.recipe.chosenRecipeLoading;

export const selectChosenRecipeTitle = (state) =>
  state.recipe.chosenRecipeTitle;

export const selectChosenRecipeId = (state) => state.recipe.chosenRecipeId;

export const selectRecipeListLoading = (state) =>
  state.recipe.recipeListLoading;

export const { setRecipeTitle, resetChosenRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
