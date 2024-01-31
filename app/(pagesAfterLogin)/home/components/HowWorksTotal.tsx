"use client";
import React, { useState } from "react";
import { PageWrapper } from "../../emotion/page-wrapper";
import { PageWrapperModal } from "../../emotion/page-wrapperModal";

function HowWorksThis({
  text,
  type,
}: {
  text: string;
  type?: "unique" | "normal";
}) {
  if (type === "unique") {
    return (
      <PageWrapperModal>
        <div>
          <div className="border-zinc-400 border w-auto lg:w-80 p-2 rounded shadow-md  text-zinc-400 text-sm">
            <p>{text}</p>
          </div>
        </div>
      </PageWrapperModal>
    );
  }
  return (
    <PageWrapper>
      <div>
        <div className="border-zinc-400 border w-auto lg:w-[600px] p-2 rounded shadow-md  text-zinc-400 text-sm">
          <p>{text}</p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default HowWorksThis;
