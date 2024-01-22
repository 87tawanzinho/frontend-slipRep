import { instance } from "@/app/axios/instance";
import { Dispatch, SetStateAction } from "react";
import { myBills } from "../../home/page";
import { mySlips } from "../../components/slips";

export const removeSlip = async (
  id: number,
  fetchDataAndSetSlips: Dispatch<SetStateAction<any>>,
  slips: mySlips[],
  setSlips: Dispatch<SetStateAction<mySlips[]>>
) => {
  try {
    const newData = slips.map((slip) => {
      if (slip._id === id) {
        return { ...slip, warn: "Deletando.." };
      }
      return slip;
    });

    setSlips(newData);

    const userName = localStorage.getItem("name");
    await instance.put(`deleteOneSlip/${userName}`, { id });
    fetchDataAndSetSlips(setSlips);
  } catch (error) {
    console.log(error);
  }
};
