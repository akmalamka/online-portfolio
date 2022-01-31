import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { recipeSlice } from './slices/recipeSlice';
import { searchFilterSlice } from './slices/searchFilterSlice';
import { writingSlice } from './slices/writingSlice';

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};
const persistedState = loadState();

const store = configureStore({
  reducer: {
    recipe: recipeSlice.reducer,
    writing: writingSlice.reducer,
    searchFilter: searchFilterSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: persistedState,
  middleware: [thunk],
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
