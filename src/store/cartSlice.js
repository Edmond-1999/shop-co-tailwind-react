import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const { id, color, size } = action.payload;
      const key = `${id}-${color}-${size}`;
      const quantityToAdd = action.payload.quantity ?? 1;
      const existingItem = state.items.find((item) => item.key === key);

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.items.push({
          ...action.payload,
          key,
          quantity: quantityToAdd,
        });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    updateQuantity(state, action) {
      const { key, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.key === key);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.key !== key);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartSubtotal = (state) => {
  return state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default cartSlice.reducer;
