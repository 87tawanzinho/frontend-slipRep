"use client";
import React, { useEffect, useState } from "react";
import MyExpenses from "../components/MyExpenses";
import ItensExpenses from "../components/ItensExpenses";
import IncomeBills from "../datas/incomeBills";
import { format, isToday, parseISO } from "date-fns";
import { fetchDataAndSetBills } from "../datas/BillFunctions/takeBills";
import { BiDownArrowAlt } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Slips from "../components/slips";
import HowWorksThis from "../components/HowWorksTotal";
import { ImInfo } from "react-icons/im";
import { PageWrapper } from "../emotion/page-wrapper";
import { PageWrapperModal } from "../emotion/page-wrapperModal";
import { Reveal } from "../emotion/Reveal";
import { GoChevronRight, GoGear } from "react-icons/go";
import ModalConfig from "../ModalConfig";
import { setClickedBill } from "../datas/BillFunctions/clickedOnGear";
import { useSlip } from "@/app/context/DataContext";
import { DiAtom } from "react-icons/di";
import { FaJava } from "react-icons/fa6";
import { TbFilterSearch } from "react-icons/tb";
import { PageWrapperUp } from "../emotion/page-wrapper-up";
import { IoFilterOutline } from "react-icons/io5";

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
  let { slip } = useSlip();
  const billsAll = bills
    .filter((bill) => bill.paid)
    .reduce((acc, bill) => acc + bill.price, 0);
  const slipAll = slip
    .filter((slip) => slip.paid)
    .reduce((acc, slip) => acc + slip.price, 0);
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
      setTimeout(() => {
        setLoading(false);
      }, 600);
      setName(localStorage.getItem("name")!!);
    }
    fetchDataAndSetBills(setBills);
  }, [bills]);
  const thereBillsToPayToday = bills.some((bill) =>
    isToday(parseISO(bill.date))
  );
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
              text={"Minhas Despesas - Renda Mensal -"}
              income="Bills"
              setData={setBills}
              span={<IncomeBills />}
            />

            {totalAboutAll !== 0 && (
              <div className="mt-6 bg-white rounded-lg p-4 flex gap-2 ">
                <div className=" text-sm flex gap-2">

                  <div className="flex gap-1 items-center">
                    <span className="text-black">Total</span>{" "}

                    <span
                      className={`${totalIncome <= -1 ? "text-red-700" : "text-green-700"
                        }`}
                    >
                      R${totalIncome.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>{" "}
                    <FaJava />

                  </div>
                  <div className="flex items-center gap-1">  <span className="text-black">Gastos  </span>
                    <p className="text-red-700">R$
                      {totalAboutAll!!.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</p>
                  </div>
                </div>
              </div>
            )}
            <ItensExpenses
              type="Bills"
              thereBillsToPayToday={thereBillsToPayToday}
              payToday={
                <div className="rounded-2xl mb-4  shadow pb-4">
                  <p className="flex gap-2 items-center mb-4">
                    {" "}
                    <CiWarning size={32} className="text-black" /> Contas para
                    pagar hoje
                  </p>

                  {bills.map((bill) => (
                    <div key={bill._id}>
                      {isToday(parseISO(bill.date)) ? (
                        <PageWrapper>
                          <div
                            className={` flex  text-[14px] justify-between items-center text-gray-800 px-2 `}
                          >
                            <div
                              className={` ${bill.paid && "bg-green-300 line-through"
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
                    <IoFilterOutline onClick={() => setShowFilter(!showFilter)} className=" cursor-pointer hover:opacity-75" />
                  </div>

                  {showFilter && <PageWrapperUp>
                    <input
                      type="text"
                      placeholder="Filtrar"
                      onChange={(e) => setFilter(e.target.value)}
                      className="h-8 rounded mb-2 shadow-2xl border-none "
                    /></PageWrapperUp>}

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
                         items-center mt-2 text-[13px] lg:text-[15px] border p-1  rounded  ${bill.paid &&
                              "bg-green-300 transition-all line-through"
                              } `}
                            key={bill._id}
                          >
                            <div
                              className={`w-1/3 lg:w-1/4 overflow-y-auto   hover:transition-all
                          hover:text-black  cursor-pointer hover:opacity-75
                            `}
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
                              <p>
                                {format(parseISO(bill.date), "dd/MM/yyyy ", {})}
                              </p>
                            </div>

                            <div
                              className={`w-1/3 lg:w-1/4 flex justify-end gap-1  items-center  overflow-auto 
                             `}
                            >
                              <p className="text-red-700  ">
                                <span className="text-[10px]">R$</span>
                                {bill.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
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
  observation?: string;
}
