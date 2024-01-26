"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchDataAndSetBills } from "./datas/BillFunctions/takeBills";
import { myBills } from "./home/page";
import Loading from "./loading";
import { changePaidBill } from "./datas/BillFunctions/paidBill";
import { removeBill } from "./datas/BillFunctions/removeBill";
import { getClickedBill } from "./datas/BillFunctions/clickedOnGear";

interface typeConfig {
  type: "Bill" | "Slip";
  setConfigModal: Dispatch<SetStateAction<boolean>>;
  allBillsData: Dispatch<SetStateAction<myBills[]>>;
}
function ModalConfig({ type, setConfigModal, allBillsData }: typeConfig) {
  const [data, setData] = useState<myBills | null>();
  if (type === "Bill") {
    useEffect(() => {
      const clickedBill = getClickedBill();
      setData(clickedBill);
    }, [data]);

    return (
      <>
        {data?._id ? (
          <div className=" flex items-center justify-center h-full top-0 left-0 fixed w-full bg-black bg-opacity-20 z-50">
            <div className=" rounded-xl shadow-2xl bg-white w-11/12 lg:w-4/12 h-auto py-8 px-4 relative">
              <p
                className="max-w-min  absolute end-4 top-4 text-red-700 cursor-pointer hover:opacity-75"
                onClick={() => setConfigModal(false)}
              >
                X
              </p>

              <div>
                <p>Registro: {data?.name} </p>
                <p>
                  Status Atual:
                  <span
                    className={data.paid ? "text-green-800 " : "text-red-800"}
                  >
                    {" "}
                    {data.paid ? "Pago" : "Não pago"}
                  </span>{" "}
                </p>
              </div>

              <div className="mt-4 flex gap-2 items-center">
                <button
                  onClick={() => {
                    setConfigModal(false);
                    changePaidBill(
                      data._id,
                      fetchDataAndSetBills,
                      allBillsData
                    );
                  }}
                  className={`${
                    data.paid
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }
                  text-sm
                 
                      rounded h-8 hover:opacity-75 w-48
                  `}
                >
                  {data.paid ? "NÃO PAGUEI" : "PAGAR DESPESA"}
                </button>

                <button
                  className="bg-black text-white h-8 w-48 rounded hover:bg-opacity-75"
                  onClick={() => {
                    setConfigModal(false);
                    removeBill(data._id, fetchDataAndSetBills, data, setData);
                  }}
                >
                  REMOVER DESPESA
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
  return (
    <div className=" flex items-center justify-center h-full top-0 left-0 fixed w-full bg-black bg-opacity-40 z-50">
      <div className=" rounded-xl shadow-2xl bg-white w-11/12 lg:w-9/12 h-auto py-8 px-4 relative">
        <p>{type}</p>
      </div>
    </div>
  );
}

export default ModalConfig;
