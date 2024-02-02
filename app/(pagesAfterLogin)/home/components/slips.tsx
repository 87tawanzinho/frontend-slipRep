"use client";
import React, { useEffect, useState } from "react";
import { ImInfo } from "react-icons/im";
import HowWorksThis from "./HowWorksTotal";
import { FaBarcode, FaFileInvoice, FaPlus } from "react-icons/fa6";
import Modal, { newPay } from "../../Modal";
import { fetchDataAndSetSlips } from "../../datas/BillFunctions/takeSlips";
import { PageWrapperModal } from "../../emotion/page-wrapperModal";
import { PageWrapper } from "../../emotion/page-wrapper";
import Image from "next/image";
import invoice from "@/public/invoice.png";
import { BsFillTrashFill, BsTrash2 } from "react-icons/bs";
import { PiTrashSimpleThin } from "react-icons/pi";
import { FiTrash } from "react-icons/fi";
import { removeSlip } from "../../datas/SlipFunctions/removeSlip";
import { format, isToday, parseISO } from "date-fns";
import { CiBarcode, CiUndo, CiWarning } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { changePaidSlip } from "../../datas/SlipFunctions/paidSlip";
import { Reveal } from "../../emotion/Reveal";
import { PageWrapperUp } from "../../emotion/page-wrapper-up";
import { useSlip } from "@/app/context/DataContext";
import { TbFileInvoice, TbFilterSearch } from "react-icons/tb";
import { IoFilterOutline } from "react-icons/io5";
import { BiDownArrow } from "react-icons/bi";
import ImageAnimation from "../../components/ImageAnimation";
import chatAnimation from "@/public/chatAnimation.json";
import slipPaid from "./slipPaid.json";
import sliptNotPaid from "./slipNotPaid.json";
import congrats from "./congrats.gif";
import { LiaUndoAltSolid } from "react-icons/lia";
function Slips() {
  const [info, setInfo] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [newSlip, setNewSlip] = useState<newPay>();
  const { slip, setSlip } = useSlip();
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    fetchDataAndSetSlips(setSlip);
  }, []);
  const isTodayDate = slip.filter((item) => isToday(parseISO(item.date)));

  useEffect(() => {
    if (animation) {
      const timeoutId = setTimeout(() => {
        setAnimation(false);
      }, 1600);

      return () => clearTimeout(timeoutId);
    }
  }, [animation]);

  return (
    <div className="px-4   custom:px-48  lg:px-60 pb-4  ">
      <ImageAnimation
        image={chatAnimation}
        alt="chat"
        text={"Precisa de ajuda? Entre em contato!"}
        iNeedHelp={true}
      />

      {animation && (
        <div className="h-screen w-full fixed flex justify-center items-center z-50 top-0 left-0 bg-black bg-opacity-95">
          {" "}
          <div className="flex flex-col items-center justify-center text-white">
            <Image src={congrats} alt="congrats" />
            <Reveal>
              {" "}
              <p className="text-lg mt-4">Parabéns, sua conta foi paga.</p>
            </Reveal>
          </div>
        </div>
      )}

      <div className="mt-20 p-4 w-full  rounded-lg custom:w-96 lg:w-1/3 flex flex-col bg-white     overflow-auto    ">
        {" "}
        <div className="flex items-center justify-between mb-4 ">
          <div className="flex items-center gap-2 justify-between">
            <p className="text-md text-start flex gap-2 items-center">
              Meus Boletos <TbFileInvoice />{" "}
            </p>
            <ImInfo
              className="cursor-pointer hover:opacity-75"
              onClick={() => setInfo(!info)}
            />
            <IoFilterOutline
              onClick={() => setShowFilter(!showFilter)}
              className=" cursor-pointer hover:opacity-75"
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
          <div className="overflow-auto shadow mb-2 max-h-96">
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
              <div
                className={` ${item.paid && "bg-yellow-200"}`}
                key={item._id}
              >
                <div
                  className={`flex justify-between  border text-[12px] p-1 text-red-800 px-2 items-center overflow-auto`}
                >
                  <p className="w-1/5 ">{item.name}</p>
                  {item.paid ? (
                    <p className="w-1/6 text-center">Pago</p>
                  ) : (
                    <p className="w-1/5 text-center ">
                      {format(parseISO(item.date), "dd/MM/yyyy ", {})}
                    </p>
                  )}

                  <p className=" w-1/4 lg:w-1/5 text-end">
                    <span className="text-[10px]">R$</span>
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {showFilter && (
          <PageWrapperUp>
            <input
              type="text"
              placeholder="Filtrar"
              className="border-red-900 h-7 rounded mb-2"
              onChange={(e) => setFilter(e.target.value)}
            />
          </PageWrapperUp>
        )}
        {slip.length > 0 ? (
          <div className={`flex flex-col overflow-x-auto h-auto max-h-96  `}>
            {slip
              .filter((slip) =>
                filter === ""
                  ? slip
                  : slip.name
                      .toLowerCase()
                      .includes(filter.toLocaleLowerCase()) ||
                    slip.price.toString().includes(filter)
              )
              .map((item, index) => (
                <PageWrapper key={item._id}>
                  <div
                    key={item._id}
                    className={`${
                      item.paid === true && " hover:bg-opacity-100 "
                    } flex flex-col justify-center border-2  p-4 h-full text-sm   hover:opacity-95 transition-all `}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {item.paid ? (
                          <ImageAnimation
                            image={slipPaid}
                            height={"100px"}
                            width={"100px"}
                          />
                        ) : (
                          <ImageAnimation
                            image={sliptNotPaid}
                            height={"120px"}
                            width={"120px"}
                          />
                        )}
                        {item.paid && <p>Conta Paga</p>}
                      </div>
                      <div className="flex gap-2">
                        <FiTrash
                          onClick={() =>
                            removeSlip(
                              item._id,
                              fetchDataAndSetSlips,
                              slip,
                              setSlip
                            )
                          }
                          size={28}
                          className="  bg-red-400 text-white p-1  rounded-full cursor-pointer hover:opacity-40"
                        />
                        {!item.paid ? (
                          <MdDone
                            onClick={() => {
                              changePaidSlip(
                                item._id,
                                fetchDataAndSetSlips,
                                setSlip
                              );
                              if (!item.paid) {
                                setAnimation(true);
                              }
                            }}
                            size={28}
                            className={`${"bg-emerald-600"} p-1 rounded-full text-white cursor-pointer hover:opacity-40`}
                          />
                        ) : (
                          <LiaUndoAltSolid
                            onClick={() => {
                              changePaidSlip(
                                item._id,
                                fetchDataAndSetSlips,
                                setSlip
                              );
                              if (!item.paid) {
                                setAnimation(true);
                              }
                            }}
                            size={28}
                            className={`${"bg-emerald-600"} p-1 rounded-full text-white cursor-pointer hover:opacity-40`}
                          />
                        )}
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
            setData={setSlip}
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
