import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext({
  loading: false,
  setLoading: null,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LoadingProvider({ children }: any) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    //@ts-expect-error thats important
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Что-то сломалось');
  }
  return context;
}
