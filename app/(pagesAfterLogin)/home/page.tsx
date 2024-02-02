"use client";
import React, { useEffect, useState } from "react";
import MyExpenses from "./components/MyExpenses";
import ItensExpenses from "./components/ItensExpenses";
import IncomeBills from "../datas/incomeBills";
import { format, isToday, parseISO } from "date-fns";
import { fetchDataAndSetBills } from "../datas/BillFunctions/takeBills";
import { BiDownArrowAlt } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Slips from "./components/slips";
import HowWorksThis from "./components/HowWorksTotal";
import { ImInfo } from "react-icons/im";
import { PageWrapper } from "../emotion/page-wrapper";
import { PageWrapperModal } from "../emotion/page-wrapperModal";
import { Reveal } from "../emotion/Reveal";
import { GoChevronRight, GoGear } from "react-icons/go";
import ModalConfig from "../ModalConfig";
import { setClickedBill } from "../datas/BillFunctions/clickedOnGear";
import { useSlip } from "@/app/context/DataContext";
import { DiAtom } from "react-icons/di";
import { FaEye, FaJava, FaRegEye } from "react-icons/fa6";

import { PageWrapperUp } from "../emotion/page-wrapper-up";
import { IoFilterOutline } from "react-icons/io5";
import Details from "./components/details";
import ExpensesAndTotals from "./components/expensesAndTotals";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { getToDown, setToDown } from "../datas/toDown";
import Image from "next/image";
import personAnimation from "@/public/AnimationMoney.json";
import ImageAnimation from "../components/ImageAnimation";

function PageHome() {
  const [bills, setBills] = useState<myBills[]>([]);
  const [incomeBill, setIncomeBill] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const [configBillModal, setConfigBillModal] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [totalIncome, setTotalIcome] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [totalAboutAll, setTotalAboutAll] = useState(0);
  const [infoAboutTotal, setInfoAboutTotal] = useState(false);
  const [detailsAboutThisBill, setDetailsAboutThisBill] = useState(false);
  let { slip } = useSlip();
  const toDown = getToDown();
  const billsAll = bills
    .filter((bill) => bill.paid)
    .reduce((acc, bill) => acc + bill.totalPriceWithInterest, 0);
  const slipAll = slip
    .filter((slip) => slip.paid)
    .reduce((acc, slip) => acc + slip.price, 0);

  const total = billsAll + slipAll;

  useEffect(() => {
    const totalAboutAll = () => {
      if (bills.length === 0 && slip.length === 0) {
        return setTotalAboutAll(0);
      }
      if (bills.length >= 1 && slip.length === 0) {
        const total = billsAll;

        return setTotalAboutAll(total);
      }
      if (bills.length === 0 && slip.length >= 1) {
        const total = slipAll;
        return setTotalAboutAll(total);
      }
      if (bills.length >= 1 && slip.length >= 1) {
        const total = billsAll + slipAll;

        return setTotalAboutAll(total);
      }
    };

    const remainingIncome = () => {
      if (bills.length === 0 && slip.length === 0) {
        return setTotalIcome(incomeBill);
      }
      if (bills.length >= 1 && slip.length === 0) {
        return setTotalIcome(incomeBill - billsAll);
      }
      if (bills.length >= 1 && slip.length >= 1) {
        return setTotalIcome(incomeBill - (billsAll + slipAll));
      }
      if (bills.length >= 0 && slip.length >= 1) {
        return setTotalIcome(incomeBill - slipAll);
      }
    };

    totalAboutAll();
    remainingIncome();
  }, [bills, slip, setBills]);

  useEffect(() => {
    let bills;
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("incomeBills") !== null
    ) {
      setIncomeBill(parseFloat(localStorage.getItem("incomeBills") as any));
      bills = localStorage.getItem("incomeBills");

      setName(localStorage.getItem("name")!!);
    }
    fetchDataAndSetBills(setBills).then(() => {
      setLoading(false);
    });
  }, [bills]);
  const thereBillsToPayToday = bills.some((bill) =>
    isToday(parseISO(bill.date))
  );
  return (
    <>
      {loading === false ? (
        <div className=" bg-home  w-full flex flex-col  ">
          <main className="flex flex-col  items-center w-full">
            <MyExpenses
              text={"Minhas Despesas - Renda Mensal "}
              income="Bills"
              setData={setBills}
              span={<IncomeBills />}
            />

            <ExpensesAndTotals
              totalIncome={totalIncome}
              billsAll={billsAll}
              infoAboutTotal={infoAboutTotal}
              setInfoAboutTotal={setInfoAboutTotal}
              slipAll={slipAll}
              total={total}
              totalAboutAll={totalAboutAll}
            />
            <div className="py-12">
              <ImageAnimation image={personAnimation} isAdvice={true} />
            </div>
            <ItensExpenses
              type="Bills"
              thereBillsToPayToday={thereBillsToPayToday}
              payToday={
                <div className="rounded-lg mb-4  shadow pb-4 z-0  text-gray-900">
                  <p className="flex gap-2 items-center mb-4">
                    {" "}
                    <CiWarning size={32} className="text-gray-900" /> Contas
                    para pagar hoje
                  </p>

                  {bills.map((bill) => (
                    <div key={bill._id}>
                      {isToday(parseISO(bill.date)) ? (
                        <PageWrapper>
                          <div
                            className={` flex  text-[14px] justify-between items-center text-gray-900 px-2 `}
                          >
                            <div
                              className={` ${
                                bill.paid && "bg-emerald-100 "
                              } flex justify-between items-center w-full  `}
                            >
                              <p className="w-1/3 overflow-auto">{bill.name}</p>
                              <p className="flex justify-center w-1/3">
                                {format(parseISO(bill.date), "dd/MM/yyyy ", {})}
                              </p>
                              <p className="flex justify-end w-1/3">
                                R$
                                {bill.interest === 0 || bill.interest === null
                                  ? bill.price.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })
                                  : bill.totalPriceWithInterest.toLocaleString(
                                      undefined,
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }
                                    )}
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
                    <IoFilterOutline
                      onClick={() => setShowFilter(!showFilter)}
                      className=" cursor-pointer hover:opacity-75"
                    />
                    {!toDown ? (
                      <FaArrowAltCircleUp
                        onClick={() => setToDown(true)}
                        className="hover:opacity-75 cursor-pointer"
                      />
                    ) : (
                      <FaArrowAltCircleDown
                        onClick={() => setToDown(false)}
                        className="hover:opacity-75 cursor-pointer"
                      />
                    )}
                  </div>

                  {showFilter && (
                    <PageWrapperUp>
                      <input
                        type="text"
                        placeholder="Filtrar"
                        onChange={(e) => setFilter(e.target.value)}
                        className="h-8 rounded mb-2 shadow-2xl border-none "
                      />
                    </PageWrapperUp>
                  )}

                  {info && (
                    <p className="py-4">
                      <HowWorksThis
                        text={`Neste espaço, você encontrará uma tabela com todos os itens que você cadastrou. Aqui, é possível acompanhar detalhes de cada um deles. Para obter mais informações, basta clicar sobre o nome do item. Se desejar marcar um item como pago, clique no preço correspondente. Todos os valores pagos serão automaticamente deduzidos de sua renda, proporcionando uma visão clara do total mensal.`}
                      />
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-[16px] border-2 p-2 rounded border-gray-400">
                    <p>Nome</p>
                    <p>Data</p>
                    <p>Valor</p>
                  </div>
                  {bills.length > 0 ? (
                    bills
                      .filter((bill) =>
                        filter === ""
                          ? bill
                          : bill.name
                              .toLowerCase()
                              .includes(filter.toLowerCase())
                      )
                      .map((bill, index) => (
                        <PageWrapperModal key={bill._id}>
                          <div
                            className={`flex justify-between
                         items-center mt-2 text-[13px] lg:text-[15px] border p-1  rounded  ${
                           bill.paid && "bg-emerald-100 transition-all "
                         } `}
                            key={bill._id}
                          >
                            <div
                              className={`w-1/3 lg:w-1/4 flex   overflow-auto justify-start items-center relative   hover:transition-all
                          hover:text-black  cursor-pointer hover:opacity-75
                            `}
                              onClick={() => {}}
                            >
                              <span className="font-bold text-[11px] w-[1px] mr-4 py-1   ">
                                {index + 1}
                              </span>
                              <div className={`flex gap-1 items-center `}>
                                <FaEye
                                  onClick={() => {
                                    setDetailsAboutThisBill(true);
                                    setClickedBill(bill);
                                  }}
                                  size={14}
                                />
                                <p className="text-[11px] lg:text-[14px] text-nowrap ">
                                  {bill.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-center overflow-auto ">
                              <p>
                                {format(parseISO(bill.date), "dd/MM/yyyy ", {})}
                              </p>
                            </div>

                            <div
                              className={`w-1/3 lg:w-1/4 flex justify-end   items-center  overflow-auto 
                             `}
                            >
                              <p className="text-red-700 flex items-center  ">
                                <span className="text-[10px]">R$</span>
                                {bill.interest === null ||
                                bill.interest === 0 ? (
                                  <p>
                                    {bill.price.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </p>
                                ) : (
                                  <p>
                                    {bill.totalPriceWithInterest.toLocaleString(
                                      undefined,
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }
                                    )}{" "}
                                  </p>
                                )}
                              </p>
                              <GoGear
                                size={20}
                                className="cursor-pointer hover:opacity-75 transition-all   "
                                onClick={() => {
                                  setClickedBill(bill);
                                  setConfigBillModal(true);
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
                            {configBillModal && (
                              <div className="absolute">
                                <PageWrapperModal>
                                  <ModalConfig
                                    type="Bill"
                                    setConfigModal={setConfigBillModal}
                                    allBillsData={setBills}
                                  />
                                </PageWrapperModal>
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
                incomeBill -
                bills
                  .filter((item) => item.paid)
                  .reduce((acc, bill) => acc + bill.price, 0)
              }
            />
          </main>
          {detailsAboutThisBill && (
            <Details setDetailsAboutThisBill={setDetailsAboutThisBill} />
          )}

          <Slips />
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
  paid: boolean;
  interest: number;
  datePayment?: string;
  totalPriceWithInterest: number;
  observation?: string;
}
