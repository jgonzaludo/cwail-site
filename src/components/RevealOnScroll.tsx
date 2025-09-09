"use client";
import { motion } from "framer-motion";
import React from "react";

export function RevealOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
