"use client";
import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { IoMdMenu } from "react-icons/io";
import Avatar from "./Avatar";
import Link from "next/link";
import { justName } from "../datas/name";
import { PageWrapperModal } from "../emotion/page-wrapperModal";
import { useHide } from "@/app/context/HideDivContext";
import { FaJava } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { PageWrapperUp } from "../emotion/page-wrapper-up";
import Logo from "./Logo";
import { TbReport } from "react-icons/tb";
function MenuMobile() {
  const name = justName();
  const [openMenu, setOpenMenu] = useState(false);
  const { hide } = useHide();
  return (
    <nav
      className={`flex  fixed lg:hidden px-2  bg-black  text-white p-1  justify-between items-center text-xl w-full top-0 z-50`}
    >
      <Logo />
      <IoMdMenu size={40} onClick={() => setOpenMenu(true)} />

      {openMenu && (
        <div className="h-screen w-full z-50 fixed top-0 left-0 text-gray-700 bg-black bg-opacity-20 flex ">
          <PageWrapperUp>
            <div className="bg-white h-full w-4/5 p-4">
              <div className="flex justify-between  items-center">
                <div className="flex items-center gap-2">
                  <h3>Monify</h3>
                  <FaJava />
                </div>
                <VscChromeClose onClick={() => setOpenMenu(false)} />
              </div>

              <div className="flex flex-col mt-10 text-lg gap-3">
                <Link
                  href={"/home"}
                  className="border-b-2 flex items-center gap-2"
                  onClick={() => setOpenMenu(false)}
                >
                  <IoHomeOutline />
                  Despesas Gerais
                </Link>

                <Link
                  href={"/MonthlyReports"}
                  className="border-b-2 flex items-center gap-2"
                  onClick={() => setOpenMenu(false)}
                >
                  <TbReport />
                  Relatórios Mensais
                </Link>

                <Link
                  href={"/"}
                  className="border-b-2   flex items-center gap-2"
                  onClick={() => {
                    localStorage.removeItem("name");
                    localStorage.removeItem("incomeBills");
                    localStorage.removeItem("incomeTickets");
                  }}
                >
                  <CiLogout />
                  Sair
                </Link>
              </div>
            </div>
          </PageWrapperUp>
        </div>
      )}
    </nav>
  );
}

export default MenuMobile;
