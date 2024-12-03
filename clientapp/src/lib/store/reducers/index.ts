import { combineReducers } from '@reduxjs/toolkit';
import { generateReducer } from '../common/action-reducer';
import { productApi } from '../services/product';
import { authApi } from '../services/auth';
export default combineReducers({
  cart: generateReducer<[]>('cart').reducer,
  auth: generateReducer<[]>('auth').reducer,

  exp: generateReducer<[]>('exp').reducer, //expire token time
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
