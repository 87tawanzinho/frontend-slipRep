import { myBills } from "../../home/page";

let clickedBill: myBills | null = null;

export const setClickedBill = (bill: myBills) => {
  clickedBill = bill;
};

export const getClickedBill = () => {
  return clickedBill;
};
