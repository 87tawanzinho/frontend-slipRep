"use client";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import NameOfClient from "../datas/name";
import { usePathname } from "next/navigation";

function MenuPC() {
  const path = usePathname();
  return (
    <nav className="hidden fixed lg:flex z-50  lg:flex-row-reverse bg-nav justify-between px-24 p-4 items-center w-full top-0  text-gray-100">
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-4">
          <Avatar />
          <NameOfClient />
        </div>
        <div>
          <Link
            href={"/home"}
            className={`${
              path === "/home" && "border-b-2 border-gray-100  rounded"
            } hover:text-green-100`}
          >
            despesas gerais
          </Link>
        </div>

        <div>
          <Link
            href={"/checks"}
            className={`${
              path === "/checks" && "border-b-2 border-gray-100  rounded"
            } hover:text-green-100`}
          >
            Cheques
          </Link>
        </div>

        <div>
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
      <p className="text-xl font-sans italic">Monify</p>
    </nav>
  );
}

export default MenuPC;
