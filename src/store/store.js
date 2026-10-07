import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { productsApi } from './productsApi';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});
