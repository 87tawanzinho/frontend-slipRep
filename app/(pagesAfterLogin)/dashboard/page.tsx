import React from "react";
import { FaEye } from "react-icons/fa6";

function page() {
  return (
    <div className="mt-12 px-4 lg:px-12 flex flex-col justify-center items-center lg:items-start lg:justify-normal">
      <div className="bg-white p-4 h-auto w-11/12 lg:w-96 rounded-2xl flex items-center justify-between">
        <h2 className="text-lg">Despesas Gerais - </h2>
        <select className="max-h-14 overflow-auto">
          <option value="January">Janeiro</option>
          <option value="February">Fevereiro</option>
          <option value="March">Março</option>
          <option value="April">Abril</option>
          <option value="May">Maio</option>
          <option value="June">Junho</option>
          <option value="July">Julho</option>
          <option value="August">Agosto</option>
          <option value="September">Setembro</option>
          <option value="October">Outubro</option>
          <option value="November">Novembro</option>
          <option value="December">Dezembro</option>
        </select>
      </div>

      <div className="flex gap-2 flex-wrap justify-center items-center mt-10">
        <div className="bg-emerald-950 h-20 overflow-auto w-40 relative rounded-lg px-2 py-2 text-white">
          <div className="flex justify-between items-center ">
            <h2 className="text-white">Brastemp</h2>
            <FaEye className="text-emerald-200 cursor-pointer hover:opacity-75" />
          </div>
          <div className="flex justify-between gap-8 items-center text-sm absolute bottom-2">
            <p>24/12/2024</p>
            <p>R$400</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
