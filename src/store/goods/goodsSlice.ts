import { createSlice } from '@reduxjs/toolkit';

import { goodsRequestAsync } from './goodsAction';
import { CategoryItem } from '../../components/GoodsTable/GoodsTable';

interface GoodsState {
  loading: boolean;
  category: CategoryItem[];
  filtredData: CategoryItem[];
  error: string;
}

const initialState: GoodsState = {
  loading: false,
  category: [],
  filtredData: [],
  error: '',
};

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    filterGoods: (state, action) => {
      const { id, name, type } = action.payload;

      state.filtredData = state.category
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => {
            return (
              (!id || item.id === +id) &&
              (!name ||
                item.name.toLowerCase().includes(name.toLowerCase().trim()))
            );
          }),
        }))
        .filter((category) => !type || category.type === type);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(goodsRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(goodsRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.filtredData = action.payload;
        state.error = '';
      })
      .addCase(goodsRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as Error).message;
      });
  },
});

export const goodsReducer = goodsSlice.reducer;
