"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { instance } from "./axios/instance";
import { jwtDecode } from "jwt-decode";
import { Reveal } from "./(pagesAfterLogin)/emotion/Reveal";
import { Box, Button, Flex, Text, TextField, Link } from "@radix-ui/themes";
import { Player } from "@lottiefiles/react-lottie-player";
import HomeLottie from "@/public/animationHome.json";
export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

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
    <main className="h-screen bg-white p-4 lg:p-20 ">
      <Box>
        <Text size={"6"} className="px-0 ">
          <span className="text-zinc-600 font-bold">M</span>onify
        </Text>
      </Box>

      <Flex
        direction={{ initial: "column", sm: "row" }}
        align={"center"}
        justify={"between"}
      >
        <Flex
          direction={"column"}
          style={{ width: 400, maxWidth: "100%" }}
          gap={"2"}
        >
          <p className="mt-10  text-xl font-bold">Se conectar</p>

          <p className="mt-4">Usuário</p>
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

          {warning && warning}
          <Button
            size={"4"}
            color="green"
            style={{ cursor: "pointer" }}
            onClick={handleSignUp}
          >
            Entrar
          </Button>

          <Link
            href={"/sign-up"}
            underline="always"
            color="brown"
            style={{ marginTop: "10px" }}
          >
            Ainda não sou um membro
          </Link>
        </Flex>

        <Player
          className="w-auto lg:w-96  h-auto lg:h-96"
          src={HomeLottie}
          autoplay
          loop
        ></Player>
      </Flex>
    </main>
  );

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
}
