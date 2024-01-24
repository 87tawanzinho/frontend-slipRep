"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { instance } from "./axios/instance";
import { jwtDecode } from "jwt-decode";
import { PageWrapper } from "./(pagesAfterLogin)/emotion/page-wrapper";
import Link from "next/link";
import { PageWrapperUp } from "./(pagesAfterLogin)/emotion/page-wrapper-up";
import { Reveal } from "./(pagesAfterLogin)/emotion/Reveal";
export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setWarning("Estamos tentando...");
    try {
      const res = await instance.post("login", {
        name,
        password,
      });
      const token = res.data.token;
      const tokenDecode = jwtDecode(token) as jwtToken;
      localStorage.setItem("name", tokenDecode.name);
      localStorage.setItem("incomeBills", tokenDecode.mensalIncomeBills);
      localStorage.setItem("incomeTickets", tokenDecode.mensalIncomeTickets);
      setWarning("Entrando na sua conta..");
      router.push("/home");
    } catch (e: ErrorLogin | any) {
      if (e.hasOwnProperty("response") && e.response) {
        setWarning(e.response.data.message);
        console.error(e);
        console.error(e);
      }
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen py-8 ">
      <div className="text-center">
        <h2 className="text-4xl">Monify</h2>
        <p>a melhor forma de organizar suas contas</p>
      </div>

      <div className="h-80 w-11/12 lg:w-7/12 border-b-2 shadow-2xl mt-4 flex flex-col justify-center items-center">
        <div>
          <p>Usuário</p>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <p>Senha</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-black text-white p-1 w-32 mt-4 hover:opacity-75"
          onClick={handleSignUp}
        >
          Entrar
        </button>

        {warning && (
          <Reveal>
            {" "}
            <p className="text-sm pt-4">{warning}</p>{" "}
          </Reveal>
        )}

        <Link href={"/sign-up"}>
          <p className="text-gray-700 mt-4 border-b-2 border-gray-700 hover:opacity-75">
            Se cadastrar
          </p>
        </Link>
      </div>
    </main>
  );
}

interface jwtToken {
  name: string;
  id: number;
  email: string;
  mensalIncomeBills: string;
  mensalIncomeTickets: string;
}

interface ErrorLogin {
  response: {
    data: {
      message: string;
    };
  };
}
