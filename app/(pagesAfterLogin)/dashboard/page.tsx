"use client";
import { instance } from "@/app/axios/instance";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { myBills } from "../home/page";
import { MonthNames, getMonthNameInPortuguese } from "./components/translate";

function page() {
  const [month, takeMonth] = useState<keyof MonthNames>("January");
  const [billsByMonth, setBillsByMonth] = useState<myBills[] | null>();
  const takeSlipsByMonth = async () => {
    const name = localStorage.getItem("name");
    const bills = await instance.get(`showBillsByFilter/${name}/${month}/2024`);

    console.log(bills);
    setBillsByMonth(bills.data);
  };
  useEffect(() => {
    takeSlipsByMonth();
  }, [month]);

  return (
    <div className="mt-12 px-4 lg:px-12 flex flex-col justify-center items-center lg:items-start lg:justify-normal">
      <div className="bg-white p-4 h-auto w-11/12 lg:w-96 rounded-2xl flex items-center justify-between">
        <h2 className="text-lg">Despesas Gerais - </h2>
        <select
          className="max-h-14 overflow-auto"
          name="Month"
          onChange={(e: any) => takeMonth(e.target.value)}
        >
          <option value="January">Janeiro</option>
          <option value="February">Fevereiro</option>
          <option value="March">Março</option>
          <option value="April">Abril</option>
          <option value="May">Maio</option>
          <option value="June">Junho</option>
          <option value="July">Julho</option>
          <option value="August">Agosto</option>
          <option value="September">Setembro</option>
          <option value="October">Outubro</option>
          <option value="November">Novembro</option>
          <option value="December">Dezembro</option>
        </select>
      </div>

      {!billsByMonth?.length ? (
        <p>Não há nada no mês de {getMonthNameInPortuguese(month)}</p>
      ) : (
        <div className="flex gap-2 flex-wrap  items-center mt-10">
          {billsByMonth.map((bill) => (
            <div className="bg-emerald-950 h-32 overflow-auto w-40 relative rounded-lg px-2 py-2 text-white">
              <div className="flex justify-between items-center ">
                <h2 className="text-white">{bill.name}</h2>
                <FaEye className="text-emerald-200 cursor-pointer hover:opacity-75" />
              </div>
              <div className="flex justify-between gap-8 items-center text-[12px] absolute bottom-2">
                <p>{bill.date}</p>
                <p>R${bill.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
