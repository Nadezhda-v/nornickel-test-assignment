import { configureStore } from '@reduxjs/toolkit';

import { goodsReducer } from './goods/goodsSlice';
import { categoriesReducer } from './categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    goods: goodsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
