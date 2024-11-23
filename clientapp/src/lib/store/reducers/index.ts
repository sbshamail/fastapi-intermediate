import { combineReducers } from '@reduxjs/toolkit';
import { generateReducer } from '../common/action-reducer';
import { productApi } from '../services/product';
export default combineReducers({
  cart: generateReducer<[]>('cart').reducer,
  [productApi.reducerPath]: productApi.reducer,
});
