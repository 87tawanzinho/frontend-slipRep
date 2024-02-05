"use client";
import Link from "next/link";
import React, { useState } from "react";
import Avatar from "./Avatar";
import NameOfClient from "../datas/name";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

function MenuPC() {
  const path = usePathname();
  const [newDivWhenHover, setNewDivWhenHover] = useState(false);

  return (
    <nav className="hidden fixed lg:flex z-50  lg:flex-row-reverse bg-black justify-between px-24 p-4 items-center w-full top-0  text-gray-100">
      <div className="flex gap-8 items-center">
        <div>
          <Link
            href={"/home"}
            className={`${
              path === "/home" && "border-b-2 border-gray-100  rounded"
            } hover:text-emerald-100`}
          >
            Despesas
          </Link>
        </div>

        <div
          className="hover:opacity-75 "
          onMouseEnter={() => setNewDivWhenHover(true)}
        >
          <Avatar />
        </div>
      </div>
      <Logo size={20} text={"text-lg"} />
      {newDivWhenHover && (
        <div
          onMouseLeave={() => setNewDivWhenHover(false)}
          className="absolute top-16 bg-white w-64 text-black rounded-lg end-8 h-60 text-center"
        >
          <div className="hover:opacity-75 mt-2">
            <Link href={"/MonthlyReports"}>Relatórios Mensais</Link>
          </div>

          <div className="hover:opacity-75 absolute bottom-2 pt-2 left-0 right-0 border-t-2">
            <Link
              href={"/"}
              className=""
              onClick={() => {
                localStorage.removeItem("name");
                localStorage.removeItem("incomeBills");
                localStorage.removeItem("incomeTickets");
              }}
            >
              Sair
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default MenuPC;
