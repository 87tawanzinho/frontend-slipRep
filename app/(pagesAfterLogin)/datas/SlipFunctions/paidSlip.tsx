import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";
import { mySlips } from "../../home/components/slips";

export const changePaidSlip = async (
  id: number,
  fetchDataAndSetSlips: Dispatch<SetStateAction<any>>,
  setSlips: Dispatch<SetStateAction<mySlips[]>>
) => {
  try {
    const name = localStorage.getItem("name");
    await instance.put(`paidSlipOrNo/${name}`, { id });
    fetchDataAndSetSlips(setSlips);
  } catch (error) {
    console.log(error);
  }
};
