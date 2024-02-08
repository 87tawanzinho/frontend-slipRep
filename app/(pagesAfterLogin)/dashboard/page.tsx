"use client";
import { instance } from "@/app/axios/instance";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { myBills } from "../home/page";
import { MonthNames, getMonthNameInPortuguese } from "./components/translate";
import Details from "../home/components/details";
import { setClickedBill } from "../datas/BillFunctions/clickedOnGear";

function page() {
  const [month, takeMonth] = useState<keyof MonthNames>("January");
  const [billsByMonth, setBillsByMonth] = useState<myBills[] | null>();
  const [details, setDetails] = useState(false);
  const [detailsAboutThisBill, setDetailsAboutThisBill] = useState<myBills>();
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
        <p className="mt-10">
          Não há nada no mês de {getMonthNameInPortuguese(month)}
        </p>
      ) : (
        <div className="flex gap-2 items-center overflow-x-auto w-11/12 lg:w-7/12 mt-10">
          {billsByMonth.map((bill) => (
            <div
              key={bill._id}
              className="bg-emerald-950 h-32  w-40 relative rounded-lg px-2 py-2 text-white flex-shrink-0"
            >
              <div className="flex justify-between items-center ">
                <h2 className="text-white">{bill.name}</h2>
                <FaEye
                  onClick={() => {
                    setDetails(true);
                    setClickedBill(bill);
                  }}
                  className="text-emerald-200 cursor-pointer hover:opacity-75"
                />
              </div>

              <div className="flex justify-between  items-center text-[12px] ">
                <p className="absolute left-2 bottom-2">{bill.date}</p>
                <p className="absolute right-2 bottom-2">R${bill.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {details && <Details setDetailsAboutThisBill={setDetails} />}
    </div>
  );
}

export default page;
