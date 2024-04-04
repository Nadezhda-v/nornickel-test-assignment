import { createSlice } from '@reduxjs/toolkit';

import { categoriesRequestAsync } from './categoriesAction';

interface CategoriesState {
  loading: boolean;
  categories: string[];
  error: string;
}

const initialState: CategoriesState = {
  loading: false,
  categories: [],
  error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoriesRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(categoriesRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = '';
      })
      .addCase(categoriesRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as Error).message;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
