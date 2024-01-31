import Image from "next/image";
import React from "react";
import user from "@/public/user.png";

function Avatar() {
  return <Image src={user} alt="user" />;
}

export default Avatar;
