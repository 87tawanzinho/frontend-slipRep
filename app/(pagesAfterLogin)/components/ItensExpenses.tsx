"use client";
import React, { ReactNode, useState } from "react";
import { ImInfo } from "react-icons/im";
import HowWorksThis from "./HowWorksTotal";

interface ItensExpenses {
  data: ReactNode;
  total: number;
  type: "Bills" | "Tickets";
  payToday: ReactNode;
  thereBillsToPayToday: boolean;
}
function ItensExpenses({
  data,
  total,
  type,
  payToday,
  thereBillsToPayToday,
}: ItensExpenses) {
  const [info, setInfo] = useState(false);
  return (
    <div className="bg-white w-11/12 lg:w-9/12 max-h-[60rem] overflow-auto rounded-2xl  mt-10 h-full p-4 ">
      {thereBillsToPayToday && <div className="rounded-lg ">{payToday}</div>}
      {data}

      {info && (
        <HowWorksThis
          text=" A sua renda mensal (o quanto você pode gastar por mês) será
            subtraida pelas contas que você colocou."
        />
      )}
    </div>
  );
}

export default ItensExpenses;
