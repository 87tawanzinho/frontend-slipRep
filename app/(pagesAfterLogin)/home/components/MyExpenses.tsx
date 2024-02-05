"use client";
import { instance } from "@/app/axios/instance";
import React, { Dispatch, ReactNode, useState } from "react";
import { BiCloset, BiHide } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { justName } from "../../datas/name";
import { IoMdAddCircleOutline } from "react-icons/io";
import { fetchDataAndSetBills } from "../../datas/BillFunctions/takeBills";
import { PageWrapper } from "../../emotion/page-wrapper";
import { PageWrapperModal } from "../../emotion/page-wrapperModal";
import { IoCheckmark } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { ImInfo } from "react-icons/im";
import HowWorksThis from "./HowWorksTotal";
import Modal, { newPay } from "../../Modal";
import { FaRightLeft } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { useHide } from "@/app/context/HideDivContext";
import { TextField } from "@radix-ui/themes";

interface Expenses {
  text: string;
  span?: ReactNode;
  income: "Bills" | "Tickets";
  setData: Dispatch<any>;
}
function MyExpenses({ text, span, income, setData }: Expenses) {
  const [openInput, setOpenInput] = useState(false);
  const [openNew, setopenNew] = useState(false);
  const [value, setValue] = useState("");
  const [info, setOpenInfo] = useState(false);
  const [warning, setWarning] = useState("");
  const [hidePrice, setHidePrice] = useState(true);
  const [warningIncome, setWarningIncome] = useState("");
  const [newPay, setNewPay] = useState<newPay>();
  const myName = justName();
  const { setHide } = useHide();

  const handleChangeNumberIncomeOrTickets = async () => {
    setWarningIncome("Registrando sua renda..");
    const valueAsNumber = parseFloat(value);
    if (valueAsNumber <= 999) {
      return setWarningIncome("Sua renda precisa ser de pelo menos 1000");
    }
    try {
      const res = await instance.put("/newIncomeBills", {
        name: myName,
        mensalIncomeBills: valueAsNumber,
      });
      setOpenInput(false);
      setWarningIncome("");
      localStorage.setItem("incomeBills", valueAsNumber.toString());
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white w-11/12 lg:w-auto rounded-2xl mt-10 p-2 lg:p-12">
      {!openInput && (
        <PageWrapper>
          <div className="text-sm lg:text-lg  flex flex-col lg:flex-row gap-2 items-center">
            <h2> {text}</h2>
            <div className="flex gap-4 items-center">
              {" "}
              <span
                className={`${hidePrice ? "blur-sm" : null} text-emerald-600`}
              >
                {span}
              </span>{" "}
              <BiHide
                className="cursor-pointer hover:opacity-75"
                size={20}
                onClick={() => setHidePrice(!hidePrice)}
              />
              <MdModeEditOutline
                className="cursor-pointer hover:opacity-75"
                size={20}
                onClick={() => setOpenInput(true)}
              />
              <IoMdAddCircleOutline
                className="text-emerald-900 cursor-pointer heart hover:opacity-75"
                size={20}
                onClick={() => {
                  setopenNew(true);
                  setHide(true);
                }}
              />
            </div>
          </div>
        </PageWrapper>
      )}
      {openInput && (
        <PageWrapper>
          <div className="flex flex-col lg:flex-row  justify-normal lg:justify-between gap-2 lg:gap-24   p-1 ">
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[13px] w-60 ">
                Defina uma renda mensal para poder se{" "}
                <span className="italic">organizar</span>.. quanto você quer
                gastar por mês?
              </p>
              <TextField.Input
                style={{ fontSize: 16, color: "#333333" }}
                type="number"
                placeholder="00,00"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <div className="flex gap-2 items-center">
                <button
                  disabled={value === ""}
                  className={` rounded-full bg-emerald-400 text-white hover:bg-emerald-300 ${
                    value === "" && "opacity-75"
                  }`}
                  onClick={handleChangeNumberIncomeOrTickets}
                >
                  <IoCheckmark size={24} />
                </button>
                <button
                  className=" rounded-full bg-rose-400 text-white hover:bg-rose-300"
                  onClick={() => setOpenInput(false)}
                >
                  <CgClose size={24} />
                </button>
              </div>
              {warningIncome && (
                <p className="open-sans text-sm text-emerald-500">
                  {warningIncome}
                </p>
              )}
            </div>

            <div className=" flex-col items-center justify-center text-center hidden lg:flex   ">
              <GiMoneyStack size={80} />
              <p className="text-[13px] lg:w-96 break-words w-full   ">
                Lembre-se de guardar uma parte do que você ganha todos os meses.
              </p>
            </div>
          </div>
        </PageWrapper>
      )}

      {openNew && (
        <PageWrapperModal>
          <Modal
            setData={setData}
            income="Bills"
            info={info}
            setNewPay={setNewPay}
            setOpenInfo={setOpenInfo}
            setopenNew={setopenNew}
          />
        </PageWrapperModal>
      )}
    </div>
  );
}

export default MyExpenses;
