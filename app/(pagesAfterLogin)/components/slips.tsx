"use client";
import React, { useEffect, useState } from "react";
import { ImInfo } from "react-icons/im";
import HowWorksThis from "./HowWorksTotal";
import { FaFileInvoice, FaPlus } from "react-icons/fa6";
import Modal, { newPay } from "../Modal";
import { fetchDataAndSetSlips } from "../datas/BillFunctions/takeSlips";
import { PageWrapperModal } from "../emotion/page-wrapperModal";
import { PageWrapper } from "../emotion/page-wrapper";
import Image from "next/image";
import invoice from "@/public/invoice.png";
function Slips() {
  const [info, setInfo] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [newSlip, setNewSlip] = useState<newPay>();
  const [warning, setWarning] = useState("");
  const [data, setData] = useState<mySlips[]>([]);

  useEffect(() => {
    fetchDataAndSetSlips(setData);
  }, []);
  return (
    <div className="px-4   custom:px-32  lg:px-60 pb-4 ">
      <div className="mt-20 p-4 w-full  rounded-2xl lg:w-1/3 flex flex-col bg-white    max-h-[40rem] overflow-auto    ">
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
        {data.length > 0 ? (
          <div className="flex flex-col overflow-x-auto h-full">
            {data.map((item, index) => (
              <PageWrapper key={item._id}>
                <div className="flex flex-col justify-center border-2 font-bold p-4 h-full  gap-2 hover:bg-opacity-10 transition-all  hover:bg-black">
                  <Image src={invoice} alt="fatura" className="mb-4" />

                  <p>Nome: {item.name}</p>
                  <p>Data: {item.date}</p>
                  <p className="">Preço: R${item.price}</p>
                  <div className="flex gap-2 items-center ">
                    <p>Código:</p>
                    <p className="w-32 overflow-auto border-2 rounded">
                      {item.code}
                    </p>
                  </div>
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

interface mySlips {
  code: string;
  price: number;
  name: string;
  date: string;
  _id: number;
}
