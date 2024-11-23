import { createSlice } from '@reduxjs/toolkit';
import { CartDataType } from '../../interfaces';
export interface CartState {
  data: CartDataType[];
}

const initialState: CartState = {
  data: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.data = action.payload;
    },
    minusCartQuantity: (state, action) => {
      state.data = action.payload;
    },
    deleteCartItem: (state, action) => {
      state.data = action.payload;
    },
    deleteCart: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCartItem, minusCartQuantity, deleteCartItem, deleteCart } =
  cartSlice.actions;

export default cartSlice.reducer;
