"use client";
import React, { useEffect, useState } from "react";
import { instance } from "@/app/axios/instance";
import { myBills } from "../page";
import { useSearchParams } from "next/navigation";
import { BiCalendar, BiMoney, BiMoneyWithdraw } from "react-icons/bi";
import { CiMoneyBill } from "react-icons/ci";
import { format, parseISO } from "date-fns";
import { FaArrowDown, FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import Link from "next/link";
import Loading from "../../loading";

function page({ params }: { params: { myBill: string } }) {
  const [informationsAboutThisBill, setInformationsAboutThisBill] =
    useState<myBills>();
  const { myBill } = params;
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBillById(myBill, name);
        setInformationsAboutThisBill(res!.data.bill[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {informationsAboutThisBill ? (
        <div className="flex flex-col justify-center items-center pt-40">
          <div className=" border-gray-400 shadow-2xl  w-11/12 p-4">
            <div className="flex justify-center p-4">
              <GiPayMoney size={100} />
            </div>
            <p
              className={` mb-2 font-bold  ${
                informationsAboutThisBill.paid
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {" "}
              {informationsAboutThisBill.paid
                ? "Você pagou essa conta."
                : "Você não pagou essa conta."}
            </p>
            <p>
              Informações sobre a despesa: {informationsAboutThisBill?.name}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <CiMoneyBill
                  className="rounded-full bg-black text-white"
                  size={20}
                />

                <p>Valor total da despesa</p>
                <FaArrowRight />
              </div>
              R$
              {informationsAboutThisBill?.price}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <BiCalendar
                  className="rounded-full bg-black text-white"
                  size={20}
                />
                <p>Data de pagamento</p>
                <FaArrowRight />
              </div>
              {informationsAboutThisBill?.date &&
                format(
                  parseISO(informationsAboutThisBill!!.date),
                  "dd/MM/yyyy ",
                  {}
                )}
            </div>
            <div className="mt-6 flex items-center gap-2">
              <p>Observação</p>
              <FaArrowDown />
            </div>

            <div className="  text-gray-300 bg-zinc-800  rounded-lg p-2 w-full lg:w-80 mt-4">
              <p className="break-words">
                {informationsAboutThisBill.observation ? (
                  informationsAboutThisBill.observation
                ) : (
                  <p className="  ">Sem observações</p>
                )}
              </p>
            </div>

            <Link href={"/home"}>
              <button className="mt-10 hover:opacity-75">
                <FaArrowLeftLong
                  size={24}
                  className=" bg-black rounded-full text-white p-1"
                />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}

export default page;

const getBillById = async (id: string, name: string | null) => {
  try {
    const res = await instance.get(`showBillById/${name}/${id}`);
    return res;
  } catch (error) {}
};
