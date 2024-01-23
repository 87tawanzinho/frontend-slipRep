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
      <div className="mt-10 pb-2 text-xl flex items-center gap-4">
        <div>
          Total do mês: R${" "}
          <span
            className={`${total <= -1 ? "text-red-600" : "text-green-600"}`}
          >
            {" "}
            {total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <ImInfo
          className="text-zinc-700 hover:opacity-75 transition-all cursor-pointer"
          onClick={() => setInfo(!info)}
        />
      </div>

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
