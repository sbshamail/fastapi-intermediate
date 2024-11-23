'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store/store';
// import { PersistGate } from 'redux-persist/integration/react';
import { setupListeners } from '@reduxjs/toolkit/query';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
    // for initial state
    // storeRef.current.dispatch(initializeCount(count))
  }

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={storeRef.current.persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
