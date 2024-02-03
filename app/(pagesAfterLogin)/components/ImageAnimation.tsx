import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import advices from "@/app/(pagesAfterLogin)/components/advicesAboutFinance.json";
import { useHide } from "@/app/context/HideDivContext";
import { Button } from "@radix-ui/themes";

function ImageAnimation({
  image,
  text,
  iNeedHelp,
  isAdvice,
  height,
  width,
  congrats,
}: any) {
  const { hide } = useHide();

  const randomAdvice = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * advices.length);
    return advices[randomIndex].description;
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center text-center rounded-lg z-0 ${
        hide && "absolute hidden"
      }`}
    >
      <Player
        autoplay
        loop
        src={image}
        style={{
          height: height || "250px",
          width: width || "250px",
        }}
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>

      {isAdvice ? (
        <p className="break-words bg-emerald-700 text-white rounded p-1 px-2 w-11/12 lg:max-w-[600px]">
          {randomAdvice}
        </p>
      ) : (
        <p
          className={`break-words bg-emerald-700 text-white rounded p-1 px-2 w-11/12 lg:w-auto  ${
            !text && "hidden"
          }`}
        >
          {text}
        </p>
      )}

      {iNeedHelp && (
        <Link
          href={"https://www.linkedin.com/in/thiago-tawan/"}
          className="w-full lg:w-auto"
          target="_blank"
        >
          <Button
            size={"2"}
            color="blue"
            radius="small"
            className="w-7/12 lg:w-40"
            style={{ marginTop: "12px", cursor: "pointer" }}
          >
            Linkedin
          </Button>
        </Link>
      )}
    </div>
  );
}

export default ImageAnimation;
