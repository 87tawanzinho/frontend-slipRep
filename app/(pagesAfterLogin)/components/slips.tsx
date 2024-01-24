"use client";
import React, { useEffect, useState } from "react";
import { ImInfo } from "react-icons/im";
import HowWorksThis from "./HowWorksTotal";
import { FaBarcode, FaFileInvoice, FaPlus } from "react-icons/fa6";
import Modal, { newPay } from "../Modal";
import { fetchDataAndSetSlips } from "../datas/BillFunctions/takeSlips";
import { PageWrapperModal } from "../emotion/page-wrapperModal";
import { PageWrapper } from "../emotion/page-wrapper";
import Image from "next/image";
import invoice from "@/public/invoice.png";
import { BsFillTrashFill, BsTrash2 } from "react-icons/bs";
import { PiTrashSimpleThin } from "react-icons/pi";
import { FiTrash } from "react-icons/fi";
import { removeSlip } from "../datas/SlipFunctions/removeSlip";
import { format, isToday, parseISO } from "date-fns";
import { CiBarcode, CiWarning } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { changePaidSlip } from "../datas/SlipFunctions/paidSlip";
import { Reveal } from "../emotion/Reveal";
import { PageWrapperUp } from "../emotion/page-wrapper-up";

function Slips() {
  const [info, setInfo] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [newSlip, setNewSlip] = useState<newPay>();
  const [data, setData] = useState<mySlips[]>([]);

  useEffect(() => {
    fetchDataAndSetSlips(setData);
  }, []);
  const isTodayDate = data.filter((item) => isToday(parseISO(item.date)));

  return (
    <div className="px-4   custom:px-40  lg:px-60 pb-4 ">
      <div className="mt-20 p-4 w-full  rounded-2xl custom:w-96 lg:w-1/3 flex flex-col bg-white    ] overflow-auto    ">
        {" "}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="text-md text-start">Meus Boletos </p>
            <ImInfo
              className="cursor-pointer hover:opacity-75"
              onClick={() => setInfo(!info)}
            />
          </div>
          <div className="">
            <FaPlus
              size={22}
              className="cursor-pointer bg-red-800 text-white rounded-full hover:opacity-75"
              onClick={() => setOpenNew(true)}
            />
          </div>
        </div>
        {info && (
          <div className="mb-4 mt-4">
            <HowWorksThis
              text="Aqui, você encontrará e registrará boletos que precisa lembrar de pagar."
              type="unique"
            />
          </div>
        )}
        {isTodayDate.length > 0 ? (
          <div
            className="   overflow-auto shadow mb-10 max-h-96"
            key={isTodayDate.length}
          >
            <div className="flex  items-center  justify-center py-4 text-sm gap-2">
              <CiWarning size={30} />
              <h2>Você tem boletos para pagar hoje</h2>
            </div>
            <div className=" shadow flex justify-between border p-2 text-red-800 font-bold ">
              <p>Nome</p>
              <p>Data</p>
              <p>Valor</p>
            </div>
            {isTodayDate.map((item) => (
              <div className={`mb-1 ${item.paid && "bg-yellow-200"}`}>
                <div
                  className={`flex justify-between  border text-[12px] p-1 text-red-800 px-2`}
                >
                  <p className="w-1/5 ">{item.name}</p>
                  {item.paid ? (
                    <p className="w-1/6 text-center">Pago</p>
                  ) : (
                    <p className="w-1/4 text-center ">{item.date}</p>
                  )}

                  <p className=" w-1/6 text-end">
                    <span className="text-[10px]">R$</span>
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {data.length > 0 ? (
          <div className={`flex flex-col overflow-x-auto h-auto max-h-96  `}>
            {data.map((item, index) => (
              <PageWrapper key={item._id}>
                <div
                  key={item._id}
                  className={`${
                    item.paid === true &&
                    "bg-yellow-100 hover:bg-yellow-200 hover:bg-opacity-100 "
                  } flex flex-col justify-center border-2  p-4 h-full text-sm   hover:opacity-95 transition-all `}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={invoice}
                        alt="fatura"
                        className="mb-2 h-14 w-14 "
                      />
                      {item.paid && <p>Conta Paga</p>}
                    </div>
                    <div className="flex gap-2">
                      <FiTrash
                        onClick={() =>
                          removeSlip(
                            item._id,
                            fetchDataAndSetSlips,
                            data,
                            setData
                          )
                        }
                        size={28}
                        className="  bg-red-400 text-white p-1  rounded-full cursor-pointer hover:opacity-40"
                      />
                      <MdDone
                        onClick={() => {
                          changePaidSlip(
                            item._id,
                            fetchDataAndSetSlips,
                            setData
                          );
                        }}
                        size={28}
                        className={`${
                          !item.paid ? "bg-yellow-600" : "bg-black"
                        } p-1 rounded-full text-white cursor-pointer hover:opacity-40`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col ">
                    <p>Nome: {item.name}</p>
                    <p>
                      Data: {format(parseISO(item.date), "dd/MM/yyyy ", {})}
                    </p>
                    <p className="">
                      Valor: <span className="text-[12px]">R$</span>
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  {!item.paid && (
                    <PageWrapperUp>
                      <div className="flex flex-col gap-2 items-center mt-4 rounded">
                        <p>Código de Barras:</p>
                        <CiBarcode size={100} />
                        <p
                          className={`w-full  bg-red-800
                      }  max-h-60 overflow-y-auto border-2 rounded break-words text-gray-200 text-center`}
                        >
                          {item.code}
                        </p>
                      </div>
                    </PageWrapperUp>
                  )}
                </div>
              </PageWrapper>
            ))}
          </div>
        ) : (
          "Ainda não existem boletos registrados."
        )}
      </div>
      {openNew && (
        <PageWrapperModal>
          <Modal
            setopenNew={setOpenNew}
            income="slips"
            setNewPay={setNewSlip}
            info={info}
            setData={setData}
            setOpenInfo={setInfo}
          />
        </PageWrapperModal>
      )}
    </div>
  );
}

export default Slips;

export interface mySlips {
  code: string;
  price: number;
  name: string;
  date: string;
  warn: string;
  _id: number;
  paid: boolean;
}
