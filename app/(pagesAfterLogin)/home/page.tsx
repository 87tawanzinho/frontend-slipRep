"use client";
import React, { useEffect, useState } from "react";
import MyExpenses from "../components/MyExpenses";
import ItensExpenses from "../components/ItensExpenses";
import IncomeBills from "../datas/incomeBills";
import { format, isToday, parseISO } from "date-fns";
import { fetchDataAndSetBills } from "../datas/BillFunctions/takeBills";
import { BiDownArrowAlt } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import { removeBill } from "../datas/BillFunctions/removeBill";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Slips from "../components/slips";
import HowWorksThis from "../components/HowWorksTotal";
import { ImInfo } from "react-icons/im";
import { changePaidBill } from "../datas/BillFunctions/paidBill";
import { PageWrapper } from "../emotion/page-wrapper";
import { PageWrapperModal } from "../emotion/page-wrapperModal";
import { Reveal } from "../emotion/Reveal";

function PageHome() {
  const [bills, setBills] = useState<myBills[]>([]);
  const [incomeBill, setIncomeBill] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let bills;
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("incomeBills") !== null
    ) {
      setIncomeBill(parseFloat(localStorage.getItem("incomeBills") as any));
      bills = localStorage.getItem("incomeBills");
      setTimeout(() => {
        setLoading(false);
      }, 600);
      setName(localStorage.getItem("name")!!);
    }
    fetchDataAndSetBills(setBills);
  }, [bills]);
  return (
    <>
      {loading === false ? (
        <div className=" bg-home  pt-10 w-full flex flex-col  ">
          <div className="flex justify-center items-center    ">
            <div className="typewriter shadow-2xl p-4 rounded-lg ">
              <div className="slide">
                <i></i>
              </div>
              <div className="paper"></div>
              <div className="keyboard"></div>
            </div>
          </div>
          <main className="flex flex-col  items-center w-full">
            <MyExpenses
              text={" Minhas Despesas - Renda Mensal"}
              income="Bills"
              setData={setBills}
              span={<IncomeBills />}
            />
            <ItensExpenses
              type="Bills"
              payToday={
                <div className="rounded-2xl mb-10 border-b-4 box-green pb-4">
                  <p className="flex gap-2 items-center mb-4 font-bold">
                    {" "}
                    <CiWarning size={40} className="text-black" /> Contas para
                    pagar hoje
                  </p>

                  {bills.map((bill) => (
                    <div key={bill._id}>
                      {isToday(parseISO(bill.date)) ? (
                        <PageWrapper>
                          <div
                            className={` flex  font-bold text-sm justify-between items-center text-gray-800 px-2`}
                          >
                            <div
                              className={` ${
                                bill.paid && "bg-green-300 line-through"
                              } flex justify-between items-center w-full  `}
                            >
                              <p className="w-1/3 overflow-auto">{bill.name}</p>
                              <p className="flex justify-center w-1/3">
                                {format(parseISO(bill.date), "dd/MM/yyyy ", {})}
                              </p>
                              <p className="flex justify-end w-1/3">
                                R${bill.price}
                              </p>
                            </div>
                          </div>
                        </PageWrapper>
                      ) : null}
                    </div>
                  ))}
                </div>
              }
              data={
                <>
                  <div className=" py-4  flex gap-2 items-center">
                    Contas Gerais <BiDownArrowAlt />
                    <ImInfo
                      className="cursor-pointer hover:opacity-75"
                      onClick={() => setInfo(!info)}
                    />
                  </div>

                  {info && (
                    <p className="py-4">
                      <HowWorksThis text="Neste espaço, você encontrará uma tabela com todos os itens que você cadastrou. Aqui, é possível acompanhar detalhes de cada um deles. Para obter mais informações, basta clicar sobre o nome do item. Se desejar marcar um item como pago, clique no preço correspondente. Todos os valores serão automaticamente deduzidos de sua renda, proporcionando uma visão clara do total mensal." />
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-[16px] border-2 p-2 rounded border-gray-500">
                    <p>Nome</p>
                    <p>Data</p>
                    <p>Valor</p>
                  </div>
                  {bills.length > 0 ? (
                    bills.map((bill, index) => (
                      <PageWrapperModal key={bill._id}>
                        <div
                          className={`flex justify-between
                         items-center mt-2 text-[15px] border p-1  rounded  ${
                           bill.paid &&
                           "bg-green-300 transition-all line-through"
                         } `}
                          key={bill._id}
                        >
                          <div
                            className={`w-1/3 lg:w-1/4 overflow-y-auto   hover:transition-all
                          hover:text-black  cursor-pointer ${
                            !bill.paid
                              ? "hover:bg-sky-400 hover:text-white"
                              : "hover:bg-white"
                          }  `}
                            onClick={() => {
                              setWarning(true);
                              router.push(`home/${bill._id}?name=${name}`);
                            }}
                          >
                            <p className=" flex gap-2 ">
                              <span className="font-bold text-sm">
                                {index + 1}
                              </span>
                              {bill.name}
                            </p>
                          </div>
                          <div className="flex justify-center overflow-auto ">
                            {!bill.warn ? (
                              <p>
                                {format(parseISO(bill.date), "dd/MM/yyyy ", {})}
                              </p>
                            ) : (
                              <p className="text-sm">{bill.warn}</p>
                            )}
                          </div>

                          <div
                            onClick={() =>
                              changePaidBill(
                                bill._id,
                                fetchDataAndSetBills,
                                setBills
                              )
                            }
                            className={`w-1/3 lg:w-1/4 flex justify-end gap-1  items-center  overflow-auto cursor-pointer ${
                              !bill.paid
                                ? " hover:bg-green-400 "
                                : " hover:bg-red-400"
                            } `}
                          >
                            <p className="text-red-700 ">R$ {bill.price}</p>
                            <FaDeleteLeft
                              size={20}
                              className="cursor-pointer hover:opacity-75 transition-all   "
                              onClick={() => {
                                removeBill(
                                  bill._id,
                                  fetchDataAndSetBills,
                                  bills,
                                  setBills
                                );
                              }}
                            />
                          </div>
                          {warning && (
                            <div className="fixed h-screen w-full bg-black bg-opacity-20 top-0 left-0">
                              <div>
                                <Loading />
                              </div>
                            </div>
                          )}
                        </div>
                      </PageWrapperModal>
                    ))
                  ) : (
                    <PageWrapper>
                      <p className="mt-4">Ainda não há nada aqui</p>
                    </PageWrapper>
                  )}
                </>
              }
              total={
                incomeBill - bills.reduce((acc, bill) => acc + bill.price, 0)
              }
            />
          </main>

          <Reveal>
            <Slips />
          </Reveal>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default PageHome;

export interface myBills {
  name: string;
  price: number;
  date: string;
  _id: number;
  warn: string;
  paid: boolean;
  observation?: string;
}
