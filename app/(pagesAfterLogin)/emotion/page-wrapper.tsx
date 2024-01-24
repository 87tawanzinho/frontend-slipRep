"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
