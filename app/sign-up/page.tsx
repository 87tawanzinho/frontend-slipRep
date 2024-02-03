"use client";
import React, { useState } from "react";
import { GiBurningBook } from "react-icons/gi";
import { instance } from "../axios/instance";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, TextField } from "@radix-ui/themes";
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
    <main className="flex flex-col justify-center items-center h-screen bg-white  ">
      <div className="h-full  mt-4 w-11/12 lg:w-7/12 border-b-2  flex flex-col justify-center items-center">
        <h2 className="text-xl">Monify</h2>
        <div className="">
          <p>E-mail</p>
          <TextField.Input
            variant="surface"
            type="text"
            className="border-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <p>Usuário</p>
          <TextField.Input
            variant="surface"
            type="text"
            className="border-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p>Senha</p>
          <TextField.Input
            variant="surface"
            type="password"
            className="border-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <p>Confirmar Senha</p>
          <TextField.Input
            variant="surface"
            type="password"
            className="border-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          variant="solid"
          style={{ marginTop: "20px", cursor: "pointer" }}
          className="w-24"
          onClick={handleSignUp}
        >
          Registrar
        </Button>
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
