import React from "react";
import MenuMobile from "./components/MenuMobile";
import MenuPC from "./components/MenuPC";

import { Reveal } from "./emotion/Reveal";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuPC />
      <MenuMobile />
      <Reveal>
        <div className="pt-12">{children}</div>
      </Reveal>
    </>
  );
}

export default HomeLayout;
