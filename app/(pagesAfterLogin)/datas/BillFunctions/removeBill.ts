import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";
import { myBills } from "../../home/page";

export const removeBill = async (
  id: number,
  fetchDataAndSetBills: Dispatch<SetStateAction<any>>,
  bill: myBills,
  setBills: Dispatch<SetStateAction<any>>
) => {
  try {
    setBills(bill);

    const userName = localStorage.getItem("name");
    await instance.put(`deleteOneBill/${userName}`, { id });
    fetchDataAndSetBills(setBills);
  } catch (error) {
    console.log(error);
  }
};
