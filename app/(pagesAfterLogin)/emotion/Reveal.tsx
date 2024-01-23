"use client";
// Import React at the top of your Reveal component file
import React, { useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";

export const Reveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
    }
    mainControls.start("visible");
  }, [isInView]);
  return (
    <div className="relative overflow-hidden " ref={ref}>
      <AnimatePresence>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 75 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
