"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { mySlips } from "../(pagesAfterLogin)/home/components/slips";

interface SlipContextProps {
  slip: mySlips[];
  setSlip: Dispatch<SetStateAction<mySlips[]>>;
}
const SlipContext = createContext<SlipContextProps | undefined>(undefined);

export const SlipProvider = ({ children }: { children: React.ReactNode }) => {
  const [slip, setSlip] = useState<mySlips[]>([]);

  return (
    <SlipContext.Provider value={{ slip, setSlip }}>
      {children}
    </SlipContext.Provider>
  );
};

export const useSlip = () => {
  const context = useContext(SlipContext);
  if (!context) {
    throw new Error("UseSlip error");
  }
  return context;
};
