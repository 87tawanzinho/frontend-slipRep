import type { Metadata } from "next";
import {
  Inter,
  Open_Sans,
  Poppins,
  Roboto,
  Roboto_Slab,
} from "next/font/google";
import "./globals.css";
import { Reveal } from "./(pagesAfterLogin)/emotion/Reveal";
import { SlipProvider } from "./context/DataContext";
import { HideDivContextProvider } from "./context/HideDivContext";

const inter = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Monify - Despesas Pessoais",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SlipProvider>
        <HideDivContextProvider>
          <body className={inter.className}>
            <Reveal>{children}</Reveal>
          </body>
        </HideDivContextProvider>
      </SlipProvider>
    </html>
  );
}
