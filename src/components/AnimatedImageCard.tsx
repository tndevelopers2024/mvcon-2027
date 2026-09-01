"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedImageCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: (index % 8) * 0.1,
        ease: "easeOut",
      }}
      className="break-inside-avoid mb-6"
    >
      {children}
    </motion.div>
  );
}
