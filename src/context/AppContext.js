'use client'

import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [instanceState, setInstanceState] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContext.Provider value={{ instanceState, setInstanceState, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}