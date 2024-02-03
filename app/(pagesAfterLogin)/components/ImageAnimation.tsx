import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import advices from "@/app/(pagesAfterLogin)/components/advicesAboutFinance.json";
import { useHide } from "@/app/context/HideDivContext";

function ImageAnimation({
  image,
  text,
  iNeedHelp,
  isAdvice,
  height,
  width,
  congrats,
}: any) {
  const [randomAdvice, setRandomAdvice] = useState<string | null>(null);
  const { hide } = useHide();
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * advices.length);
    setRandomAdvice(advices[randomIndex].description);
  }, []);

  if (!text && !isAdvice) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center rounded-lg z-0 ${
          hide ? "opacity-0" : " opacity-100"
        }`}
      >
        <Player
          loop
          src={image}
          style={{
            height: height ? height : "120px",
            width: width ? width : "120px",
          }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col items-center justify-center text-center rounded-lg z-0 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
    >
      <Player
        autoplay
        loop
        src={image}
        style={{
          height: height ? height : "300px",
          width: width ? width : "300px",
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
        <p className="break-words bg-emerald-700 text-white rounded p-1 px-2 w-11/12 lg:w-auto">
          {text}
        </p>
      )}

      {iNeedHelp && (
        <Link
          href={"https://www.linkedin.com/in/thiago-tawan/"}
          className="w-full lg:w-auto"
          target="_blank"
        >
          <button className="bg-sky-400 w-7/12 lg:w-48 hover:bg-emerald-600 text-white mt-4 rounded-lg p-2">
            Linkedin
          </button>
        </Link>
      )}
    </div>
  );
}

export default ImageAnimation;
