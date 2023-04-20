/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const LoadingContext = createContext({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
