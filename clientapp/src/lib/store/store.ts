import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import reducer from './reducers';
import { productApi } from './services/product';

// const persistConfig = {
//   key: 'persist',
//   storage,
//   whitelist: ['cart'],
// };

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(productApi.middleware);

const makeConfiguredStore = () =>
  configureStore({
    reducer,
    middleware,
  });

export const makeStore = () => {
  return makeConfiguredStore();
  // const isServer = typeof window === 'undefined';
  // if (isServer) {
  //   return makeConfiguredStore();
  // } else {
  //   const persistedReducer = persistReducer(persistConfig, reducer);
  //   let store: any = configureStore({
  //     reducer: persistedReducer,
  //     middleware,
  //   });
  //   store.persistor = persistStore(store);
  //   return store;
  // }
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];