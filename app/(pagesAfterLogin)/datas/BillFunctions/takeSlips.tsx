import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";

const fetchData = async () => {
  const name = localStorage.getItem("name");
  const res = await instance.get(`showSlips/${name}`);
  const result = res.data.tickets.reverse();
  return result;
};

export const fetchDataAndSetSlips = async (
  set: Dispatch<SetStateAction<any>>
) => {
  const result = await fetchData();

  set(result);
};
