"use client";
import { useEffect, useState } from "react";

export default function IncomeBills() {
  const [incomeBills, setIncomeBills] = useState<string | number>(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setIncomeBills(localStorage.getItem("incomeBills")!!);
    } else {
      console.warn("localStorage is not available on the server side");
    }
  }, []);

  return <p>R$ {incomeBills !== 0 ? incomeBills : 0} </p>;
}

export const incomeBillValue = () => {
  return parseFloat(localStorage.getItem("incomeBills")!!);
};