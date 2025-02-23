"use client";
import { createContext, useState, ReactNode, FC } from "react";

interface StateContextValue {
  isBackdrop: boolean;
  setIsBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultStateContextValue: StateContextValue = {
  isBackdrop: false,
  setIsBackdrop: () => {},
};

const StateContext = createContext<StateContextValue>(defaultStateContextValue);

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider: FC<StateProviderProps> = ({ children }) => {
  const [isBackdrop, setIsBackdrop] = useState<boolean>(false);

  return (
    <StateContext.Provider
      value={{
        isBackdrop,
        setIsBackdrop,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
