"use client";
import React, { useState } from "react";
import { GiBurningBook } from "react-icons/gi";
import { instance } from "../axios/instance";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Text, TextField, Link } from "@radix-ui/themes";
import { Player } from "@lottiefiles/react-lottie-player";
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
    <main className="h-screen flex flex-col pt-10 items-center bg-white p-4 lg:p-20 ">
      <Box>
        <Text size={"6"} className="px-0 ">
          <span className="text-zinc-600 font-bold">M</span>onify
        </Text>
      </Box>

      <Flex align={"center"} justify={"center"}>
        <Flex
          direction={"column"}
          style={{ width: 300, maxWidth: "100%" }}
          gap={"2"}
        >
          <p className="mt-10  text-xl font-bold">Se Registrar</p>

          <p>E-mail</p>
          <TextField.Input
            color="green"
            size={"3"}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>Usuário</p>
          <TextField.Input
            color="green"
            size={"3"}
            onChange={(e) => setName(e.target.value)}
          />

          <p>Senha</p>
          <TextField.Input
            color="green"
            type="password"
            size={"3"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p>Confirmar sua senha</p>
          <TextField.Input
            color="green"
            type="password"
            size={"3"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {warning && warning}
          <Button
            color="green"
            size={"4"}
            style={{ cursor: "pointer" }}
            onClick={handleSignUp}
          >
            Registrar
          </Button>

          <Link
            href={"/"}
            underline="always"
            color="brown"
            style={{ marginTop: "10px" }}
          >
            Já tenho uma conta
          </Link>
        </Flex>
      </Flex>
    </main>
  );
}

export default SignUpPage;
