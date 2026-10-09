import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchProductList = async (limit) => {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&select=id,title,price,rating,thumbnail,images,category,discountPercentage`);
  if (!response.ok) throw new Error('Unable to load products');
  const data = await response.json();
  return data.products;
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  () => fetchProductList(8),
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  () => fetchProductList(50),
  {
    condition: (_, { getState }) => getState().products.allStatus === 'idle',
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    allItems: [],
    allStatus: 'idle',
    allError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.allStatus = 'loading';
        state.allError = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allStatus = 'succeeded';
        state.allItems = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.allStatus = 'failed';
        state.allError = action.error.message || 'Failed to load products';
      });
  },
});

export default productsSlice.reducer;
