import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store cart items
  totalCount: 0, // Total count of items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalCount += 1;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        state.totalCount -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalCount += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalCount -= 1;
      } else if (existingItem) {
        state.totalCount -= 1;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
