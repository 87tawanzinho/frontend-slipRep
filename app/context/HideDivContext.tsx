"use client";
import { error } from "console";
import {
  SetStateAction,
  Dispatch,
  createContext,
  useContext,
  useState,
} from "react";

interface HideDivProps {
  hide: boolean;
  setHide: any;
}
const HideDivContext = createContext<HideDivProps | undefined>(undefined);

export const HideDivContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hide, setHide] = useState<boolean>(false);

  return (
    <HideDivContext.Provider value={{ hide, setHide }}>
      {children}
    </HideDivContext.Provider>
  );
};

export const useHide = () => {
  const context = useContext(HideDivContext);

  if (!context) {
    throw new Error("error");
  }
  return context;
};
