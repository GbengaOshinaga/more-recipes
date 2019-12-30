import React, { createContext, useContext } from 'react';
import useGlobalStore from './useGlobalStore';

const StoreContext = createContext();

export const useStoreContext = () => useContext(StoreContext);

export default function StoreProvider({ children }) {
  const store = useGlobalStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
