import { createSlice } from '@reduxjs/toolkit';

export const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState: {
    keyword: '',
    chipData: [],
  },

  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    resetKeyword: (state) => {
      state.keyword = '';
    },
    setChipList: (state, action) => {
      state.chipData = action.payload;
    },
    resetChipList: (state) => {
      state.chipData = [];
    },
  },
});

export const selectKeyword = (state) => state.searchFilter.keyword;

export const selectChipData = (state) => state.searchFilter.chipData;

export const {
  setKeyword,
  resetKeyword,
  setChipList,
  resetChipList,
} = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
