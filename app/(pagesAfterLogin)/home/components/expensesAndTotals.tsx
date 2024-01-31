"use client";
import { useHide } from "@/app/context/HideDivContext";
import React, { Dispatch } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaJava } from "react-icons/fa6";
import { PageWrapperUp } from "../../emotion/page-wrapper-up";
import { IoMdArrowDropright } from "react-icons/io";

interface allThings {
  totalIncome: number;
  totalAboutAll: number;
  setInfoAboutTotal: any;
  infoAboutTotal: boolean;
  billsAll: number;
  slipAll: number;
  total: number;
}
function ExpensesAndTotals({
  totalIncome,
  totalAboutAll,
  setInfoAboutTotal,
  infoAboutTotal,
  billsAll,
  slipAll,
  total,
}: allThings) {
  const { hide } = useHide();

  return (
    <>
      {!hide && (
        <div className="mt-6 bg-white rounded-lg p-4 relative z-0">
          <div className=" flex gap-2  ">
            <div className=" text-sm flex gap-2">
              <div className="flex gap-1 items-center">
                <span className="text-black">Total</span>{" "}
                <span
                  className={`${
                    totalIncome <= -1 ? "text-red-700" : "text-green-700"
                  }`}
                >
                  R$
                  {totalIncome.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>{" "}
                <FaJava />
              </div>
              <div className="flex items-center gap-1">
                {" "}
                <span className="text-black">Gastos </span>
                <p className="text-red-700">
                  R$
                  {totalAboutAll!!.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <p
              onClick={() => setInfoAboutTotal(!infoAboutTotal)}
              className="absolute top-1 end-1 cursor-pointer hover:opacity-75"
            >
              <AiFillCaretDown size={14} className="text-gray-400" />
            </p>
          </div>

          {infoAboutTotal && (
            <PageWrapperUp>
              <div className="mt-4 text-[13px] text-gray-700">
                <p className="flex items-center">
                  Gastos com contas gerais <IoMdArrowDropright />{" "}
                  <span className="text-red-700">
                    R$
                    {billsAll.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
                <p className="flex items-center">
                  Gastos com boletos <IoMdArrowDropright />{" "}
                  <span className="text-red-700">
                    R$
                    {slipAll.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>

                <p className="flex items-center">
                  Total <IoMdArrowDropright />{" "}
                  <span className="text-red-700">
                    R$
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </div>
            </PageWrapperUp>
          )}
        </div>
      )}
    </>
  );
}

export default ExpensesAndTotals;
