"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PageWrapperUp = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: "tween", duration: 0.4 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
