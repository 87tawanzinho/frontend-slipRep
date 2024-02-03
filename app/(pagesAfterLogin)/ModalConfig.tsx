"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchDataAndSetBills } from "./datas/BillFunctions/takeBills";
import { myBills } from "./home/page";
import Loading from "./loading";
import { changePaidBill } from "./datas/BillFunctions/paidBill";
import { removeBill } from "./datas/BillFunctions/removeBill";
import { getClickedBill } from "./datas/BillFunctions/clickedOnGear";
import { PageWrapper } from "./emotion/page-wrapper";
import { PageWrapperUp } from "./emotion/page-wrapper-up";
import { useHide } from "../context/HideDivContext";

interface typeConfig {
  type: "Bill" | "Slip";
  setConfigModal: Dispatch<SetStateAction<boolean>>;
  allBillsData: Dispatch<SetStateAction<myBills[]>>;
}

interface interestAndDate {
  interest: number;
  date: string;
}
function ModalConfig({ type, setConfigModal, allBillsData }: typeConfig) {
  const [data, setData] = useState<myBills | null>();
  const [showDivInterestRate, setShowDivInterestRate] = useState(false);
  const [inputsToConfirm, setInputsToConfirm] = useState<interestAndDate>();
  const { setHide } = useHide();
  if (type === "Bill") {
    useEffect(() => {
      const clickedBill = getClickedBill();
      setData(clickedBill);
    }, [data]);

    const handleValueOfInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setInputsToConfirm((prev: any) => ({
        ...prev,
        [name]: value,
      }));

      console.log(name, value);
    };

    return (
      <>
        {data?._id ? (
          <div className="h-full w-full fixed top-0 left-0 text-black z-50 bg-opacity-40 bg-black flex justify-center items-center">
            <div className=" rounded  bg-white w-11/12 lg:w-4/12 h-auto relative text-[14px]">
              <div className="bg-emerald-800 text-white p-2 flex justify-between items-center">
                <p className="text-center text-lg text-gray-100 ">
                  Configuração da Despesa
                </p>
                <p
                  onClick={() => {
                    setConfigModal(false);
                    setHide(false);
                  }}
                  className="text-end cursor-pointer hover:opacity-75 text-xl"
                >
                  X
                </p>
              </div>
              <div className="py-2 px-4">
                <p>Despesa: {data?.name} </p>
                <p>
                  Status Atual:
                  <span
                    className={data.paid ? "text-emerald-800 " : "text-red-800"}
                  >
                    {" "}
                    {data.paid ? "Pago" : "Não pago"}
                  </span>{" "}
                </p>
              </div>

              <div className="flex gap-2 items-center py-4 px-4">
                {data.paid && (
                  <button
                    onClick={() => {
                      setConfigModal(false);
                      changePaidBill(
                        data._id,
                        fetchDataAndSetBills,
                        allBillsData
                      );
                    }}
                    className="bg-red-600 text-white h-8 w-48 rounded hover:opacity-75"
                  >
                    REMOVER PAGAMENTO
                  </button>
                )}

                {!data.paid && (
                  <button
                    onClick={() => setShowDivInterestRate(!showDivInterestRate)}
                    className={`h-8 w-48 rounded hover:opacity-75  ${
                      showDivInterestRate
                        ? "bg-gray-300 border text-gray-800"
                        : "bg-emerald-600 text-white "
                    } `}
                  >
                    {!showDivInterestRate ? "PAGAR DESPESA" : "VOLTAR"}
                  </button>
                )}
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
              {showDivInterestRate && (
                <PageWrapperUp>
                  <div className=" py-4 px-4 bg-emerald-950 text-white">
                    <p className="">Valor do Juros</p>
                    <input
                      type="number"
                      name="interest"
                      defaultValue={0}
                      onChange={handleValueOfInputs}
                    />
                    <p className="mt-2">Data do Pagamento</p>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        name="date"
                        onChange={handleValueOfInputs}
                      />
                      <button
                        className="bg-emerald-400 text-white rounded w-32 hover:opacity-75"
                        onClick={() => {
                          if (inputsToConfirm?.date === undefined) {
                            return alert("Qual a data que você pagou?");
                          }
                          setConfigModal(false);
                          changePaidBill(
                            data._id,
                            fetchDataAndSetBills,
                            allBillsData,
                            inputsToConfirm?.interest,
                            inputsToConfirm?.date
                          );
                        }}
                      >
                        Pagar
                      </button>
                    </div>
                  </div>
                </PageWrapperUp>
              )}
            </div>
          </div>
        ) : null}
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
