import { useEffect, useState } from "react";

export default function IncomeBills() {
  const [incomeBills, setIncomeBills] = useState<number>(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("name") !== null
    ) {
      const storedIncomeBills = localStorage.getItem("incomeBills");
      if (storedIncomeBills !== null) {
        setIncomeBills(parseFloat(storedIncomeBills));
      }
    } else {
      console.warn("localStorage is not available on the server side");
    }
  }, []);

  return (
    <p>
      <span className="text-[13px] ">R$</span>
      {incomeBills !== 0
        ? incomeBills.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "0"}{" "}
    </p>
  );
}
