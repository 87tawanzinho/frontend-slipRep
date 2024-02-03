"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getClickedBill } from "../../datas/BillFunctions/clickedOnGear";
import { myBills } from "../page";
import { FaArrowDown } from "react-icons/fa6";
import { PageWrapperModal } from "../../emotion/page-wrapperModal";
import { useHide } from "@/app/context/HideDivContext";

function Details({
  setDetailsAboutThisBill,
}: {
  setDetailsAboutThisBill: Dispatch<SetStateAction<boolean>>;
}) {
  const [details, setDetails] = useState<myBills | null>();
  const { setHide } = useHide();
  useEffect(() => {
    const bill = getClickedBill();
    setDetails(bill);
  }, [details]);
  return (
    <PageWrapperModal>
      <div className="h-full w-full fixed top-0 left-0 text-black z-50 bg-opacity-20 bg-black flex justify-center items-center">
        <div className="bg-white  h-auto w-11/12 lg:w-7/12   text-sm relative ">
          <div className="bg-emerald-800  text-white p-2 flex justify-between items-center">
            <p className="text-center text-lg text-gray-100 ">
              Informações da sua despesa
            </p>
            <p
              onClick={() => {
                setDetailsAboutThisBill(false);
                setHide(false);
              }}
              className="text-end cursor-pointer hover:opacity-75 text-xl"
            >
              X
            </p>
          </div>

          <div className="flex justify-between  mt-2  px-4 py-4 ">
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-gray-700">Nome</p>
                <FaArrowDown size={12} />
              </div>
              <p>{details?.name}</p>

              <div className="flex items-center">
                <p className="mt-4 text-gray-700">Status</p>
              </div>
              <p>{details?.paid ? "Pago" : "Não pago"}</p>

              <p className="mt-4 text-gray-700">Juros</p>
              <p>{details?.interest ? details.interest : "Não definido"}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-gray-700">Data Prevista</p>
                <FaArrowDown size={12} />
              </div>
              <p>{details?.date}</p>

              <p className="mt-4 text-gray-700">Data do Pagamento</p>
              <p>
                {details?.datePayment !== "Não definida"
                  ? details?.datePayment
                  : details?.datePayment}
              </p>

              <div className="flex flex-col lg:hidden">
                <p className="text-gray-700  mt-4 flex flex-col lg:hidden">
                  Valor
                </p>
                <p>
                  R$
                  {details?.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </p>

                <p className="text-gray-700 mt-4">Total com Juros</p>
                <p>
                  {details?.totalPriceWithInterest !== 0
                    ? `R$${details?.totalPriceWithInterest.toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2, minimumFractionDigits: 2 }
                      )}`
                    : "Não definido"}
                </p>
              </div>
            </div>

            <div className="lg:flex lg:flex-col hidden">
              <div className="flex gap-2 items-center">
                <p className="text-gray-700">Valor</p>
                <FaArrowDown size={12} />
              </div>
              <p>R${details?.price}</p>

              <div className="flex gap-2 items-center mt-4">
                <p className="text-gray-700 ">Total com Juros</p>
              </div>
              <p>
                {details?.totalPriceWithInterest !== 0
                  ? `R$${details?.totalPriceWithInterest}`
                  : "Não definido"}
              </p>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="flex gap-2 items-center">
              <p className="text-gray-700">Observação</p>
              <FaArrowDown size={12} />
            </div>
            {details?.observation ? (
              <div className="border  w-40 px-2 py-1 mt-2 rounded border-gray-500">
                <p className="break-words">{details.observation}</p>
              </div>
            ) : (
              "Não definido"
            )}
          </div>
        </div>
      </div>
    </PageWrapperModal>
  );
}

export default Details;
