import type { Metadata } from "next";
import { Inter, Open_Sans, Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Reveal } from "./(pagesAfterLogin)/emotion/Reveal";

const inter = Open_Sans({ subsets: ["latin"], weight: ["400"] });

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
      <body className={inter.className}>
        <Reveal>{children}</Reveal>
      </body>
    </html>
  );
}
