"use client";
import React, { useState } from "react";
import { GiBurningBook } from "react-icons/gi";
import { instance } from "../axios/instance";
import { useRouter } from "next/navigation";
import Link from "next/link";
function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSignUp = async () => {
    setWarning("Tentando criar sua conta..");
    if (password !== confirmPassword) {
      return setWarning("Senhas não coincidem.");
    }
    try {
      await instance.post("", { email, name, password }); // cria um usuario
      setWarning("Sucesso!");
      router.push("/");
    } catch (e: any) {
      setWarning(e.response.data.message);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen  ">
      <div className="text-center">
        <h2 className="text-4xl">Monify</h2>
        <p>Seja bem vindo!</p>
      </div>

      <div className="h-96  mt-4 w-11/12 lg:w-7/12 border-b-2 shadow-2xl  flex flex-col justify-center items-center">
        <div className="">
          <p>E-mail</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>

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

        <div>
          <p>Confirmar Senha</p>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-black text-white p-1 w-32 mt-4 hover:opacity-75"
          onClick={handleSignUp}
        >
          Entrar
        </button>

        {warning && <p className="text-sm mt-2">{warning}</p>}

        <div className="">
          <Link href={"/"}>
            <p className="text-gray-700 mt-4 border-b-2 border-gray-700 hover:opacity-75 ">
              Tela de Login
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
