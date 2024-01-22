import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";
import { myBills } from "../home/page";

export const removeBill = async (
  id: number,
  fetchDataAndSetBills: Dispatch<SetStateAction<any>>,
  bills: myBills[],
  setBills: Dispatch<SetStateAction<myBills[]>>
) => {
  try {
    const newData = bills.map((bill) => {
      if (bill._id === id) {
        return { ...bill, warn: "Deletando.." };
      }
      return bill;
    });

    setBills(newData);

    const userName = localStorage.getItem("name");
    await instance.put(`deleteOneBill/${userName}`, { id });
    fetchDataAndSetBills(setBills);
  } catch (error) {
    console.log(error);
  }
};
