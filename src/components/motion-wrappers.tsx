"use client";
import { motion } from "framer-motion";
export function FadeUpAnimation({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
    >
      {children}
    </motion.div>
  );
}

export function HoverImageScale({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInAnimation({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay }}
    >
      {children}
    </motion.div>
  );
}
