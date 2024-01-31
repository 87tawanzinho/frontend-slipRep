"use client";
import React, { useEffect, useState } from "react";
import { getClickedBill } from "../../datas/BillFunctions/clickedOnGear";
import { myBills } from "../page";

function Details() {
  const [details, setDetails] = useState<myBills | null>();
  useEffect(() => {
    const bill = getClickedBill();
    setDetails(bill);
  }, [details]);
  return (
    <div className="h-full w-full fixed top-0 left-0 text-black z-50 bg-opacity-75 bg-black flex justify-center items-center">
      <div className="bg-white h-auto w-11/12 lg:9/12 rounded  p-2 text-sm ">
        <p className="text-xl text-center font-sans font-bold">
          {details?.name}
        </p>
        (EM DESENVOLVIMENTO)
        <div className="flex flex-col gap-2">
          <p className="mt-12">
            Status:{" "}
            <span
              className={` px-2 ${
                !details?.paid
                  ? "bg-red-900 text-white rounded-lg "
                  : "bg-green-900 text-white rounded-lg"
              }`}
            >
              {" "}
              {details?.paid
                ? "Você já pagou essa conta"
                : "Você ainda não pagou essa conta"}
            </span>
          </p>

          <p>
            Total de juros:{" "}
            <span
              className={` ${
                details?.interest == 0 ? "bg-green-900" : "bg-red-900"
              }
               text-white px-2 rounded-lg `}
            >
              {details?.interest}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
