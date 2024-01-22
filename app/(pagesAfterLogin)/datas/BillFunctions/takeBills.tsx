import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";

const fetchData = async () => {
  const name = localStorage.getItem("name");
  const res = await instance.get(`showBills/${name}`);
  const result = res.data.bills.reverse();
  return result;
};

export const fetchDataAndSetBills = async (
  set: Dispatch<SetStateAction<any>>
) => {
  const result = await fetchData();
  set(result);
};
