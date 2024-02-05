import React from "react";
import { FaJava } from "react-icons/fa6";

function Logo({ text, size }: { text?: string; size?: number }) {
  return (
    <div className={`flex items-center gap-2 ${text}`}>
      <h2>Monify</h2>
      <FaJava size={size} />
    </div>
  );
}

export default Logo;
