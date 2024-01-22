"use client";
import React, { useEffect, useState } from "react";
import { ImInfo } from "react-icons/im";
import HowWorksThis from "./HowWorksTotal";
import { FaPlus } from "react-icons/fa6";
import Modal, { newPay } from "../Modal";
import { fetchDataAndSetSlips } from "../datas/BillFunctions/takeSlips";

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
    <div className="px-4   custom:px-32  lg:px-60 pb-10 ">
      <div className="mt-20 p-4 w-full  rounded-2xl lg:w-96 flex flex-col   bg-white    ">
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center mb-4">
            <p className="text-md text-start">Meus Boletos </p>
            <ImInfo
              className="cursor-pointer hover:opacity-75"
              onClick={() => setInfo(!info)}
            />
          </div>

          <FaPlus
            className="text-red-800 cursor-pointer hover:opacity-75"
            onClick={() => setOpenNew(true)}
          />
        </div>
        {info && (
          <div className="mb-4">
            <HowWorksThis
              text="Aqui, você encontrará e registrará boletos que precisa lembrar de pagar."
              type="unique"
            />
          </div>
        )}
        <p className="text-sm py-4"> (ainda em desenvolvimento)</p>
        {data.length > 0
          ? data.map((item) => (
              <div
                key={item._id}
                className="text-sm flex justify-between items-center mt-2"
              >
                <div className="w-1/4 ">
                  <p className="text-red-700 font-bold overflow-auto">
                    {item.name}
                  </p>
                  <p>{item.date}</p>
                </div>
                <p>
                  R$ <span className="text-green-600">{item.price}</span>
                </p>
                <p className="bg-gray-300 bg-opacity-60 rounded-lg w-1/2 h-10 overflow-auto whitespace-nowrap">
                  {item.code}
                </p>
              </div>
            ))
          : "Ainda não existem boletos registrados."}
      </div>
      {openNew && (
        <Modal
          setopenNew={setOpenNew}
          income="slips"
          setNewPay={setNewSlip}
          info={info}
          setData={setData}
          setOpenInfo={setInfo}
        />
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
