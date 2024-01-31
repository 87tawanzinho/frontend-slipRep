import React from "react";

function TypeWriter() {
  return (
    <div className="flex justify-center items-center    ">
      <div className="typewriter shadow-2xl p-4 rounded-lg ">
        <div className="slide">
          <i></i>
        </div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
    </div>
  );
}

export default TypeWriter;
