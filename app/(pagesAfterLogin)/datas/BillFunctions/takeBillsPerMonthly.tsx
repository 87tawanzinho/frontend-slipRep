import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";
import { getToDown } from "../toDown";

const fetchData = async () => {
  const toDown = getToDown();
  const name = localStorage.getItem("name");
  const res = await instance.get(`showBillsByMonthly/${name}`);
  const result = toDown ? res.data : res.data.reverse();
  return result;
};

export const fetchDataAndSetBills = async (
  set: Dispatch<SetStateAction<any>>
) => {
  const result = await fetchData();
  set(result);
};
