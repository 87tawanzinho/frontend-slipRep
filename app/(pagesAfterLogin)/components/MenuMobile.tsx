"use client";
import React, { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { IoMdMenu } from "react-icons/io";
import Avatar from "./Avatar";
import Link from "next/link";
import { justName } from "../datas/name";
import { PageWrapper } from "../emotion/page-wrapper";
import { PageWrapperModal } from "../emotion/page-wrapperModal";
import { useHide } from "@/app/context/HideDivContext";
function MenuMobile() {
  const name = justName();
  const [openMenu, setOpenMenu] = useState(false);
  const { hide } = useHide();
  const [bg, setBG] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 8) {
        setBG(true);
      } else {
        setBG(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run the effect only once during component mount

  return (
    <nav
      className={`flex fixed lg:hidden px-2 p-2  justify-between transition-all duration-300 ease-in-out ${
        bg ? "bg-black  text-white" : "shadow-2xl"
      } items-center text-xl w-full top-0 z-50`}
    >
      <h2 className="font-sans italic">Monify</h2>
      <IoMdMenu size={40} onClick={() => setOpenMenu(true)} />

      {openMenu && (
        <div className="h-screen w-full absolute top-0 left-0 text-zinc-900 bg-black bg-opacity-20 flex ">
          <PageWrapperModal>
            <div className="bg-white h-full w-11/12 p-4">
              <div className="flex justify-between px-4 items-center">
                <h3 className="text-gray-800">Meu Perfil</h3>
                <VscChromeClose onClick={() => setOpenMenu(false)} />
              </div>

              <div className="mt-10 px-10 flex gap-4 items-center text-lg">
                <Avatar />
                <p>- {name}</p>
              </div>

              <div className="flex flex-col mt-10 text-lg">
                <Link
                  href={"/home"}
                  className="border-b-2 shadow-lg"
                  onClick={() => setOpenMenu(false)}
                >
                  Despesas
                </Link>
                <Link
                  href={"/checks"}
                  className="border-b-2 shadow-lg"
                  onClick={() => setOpenMenu(false)}
                >
                  cheques
                </Link>
                <Link
                  href={"/"}
                  className="border-b-2 shadow-lg mt-4"
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
          </PageWrapperModal>
        </div>
      )}
    </nav>
  );
}

export default MenuMobile;
