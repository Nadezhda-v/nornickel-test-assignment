import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../api/constants';

export const goodsRequestAsync = createAsyncThunk('goods/axios', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data.json`);
    const { category } = response.data;

    return category;
  } catch (error) {
    return error;
  }
});
