export type MonthNames = {
  January: string;
  February: string;
  March: string;
  April: string;
  May: string;
  June: string;
  July: string;
  August: string;
  September: string;
  October: string;
  November: string;
  December: string;
};

export const getMonthNameInPortuguese = (monthValue: keyof MonthNames) => {
  const monthNames: MonthNames = {
    January: "Janeiro",
    February: "Fevereiro",
    March: "Março",
    April: "Abril",
    May: "Maio",
    June: "Junho",
    July: "Julho",
    August: "Agosto",
    September: "Setembro",
    October: "Outubro",
    November: "Novembro",
    December: "Dezembro",
  };

  return monthNames[monthValue] || monthValue;
};
