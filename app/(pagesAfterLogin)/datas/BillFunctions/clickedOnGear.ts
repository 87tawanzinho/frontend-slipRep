import { myBills } from "../../home/page";

interface typeDateBill {
  date: string[];
}

let clickedBill: myBills | null = null;
let dateBill: typeDateBill;
export const setClickedBill = (bill: myBills) => {
  clickedBill = bill;
};

export const getClickedBill = () => {
  return clickedBill;
};
