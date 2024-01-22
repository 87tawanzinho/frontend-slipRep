import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";
import { myBills } from "../../home/page";

export const changePaidBill = async (
  id: number,
  fetchDataAndSetBills: Dispatch<SetStateAction<any>>,
  setBills: Dispatch<SetStateAction<myBills[]>>
) => {
  try {
    const userName = localStorage.getItem("name");
    await instance.put(`paidBillOrNo/${userName}`, { id });
    fetchDataAndSetBills(setBills);
  } catch (error) {
    console.log(error);
  }
};
