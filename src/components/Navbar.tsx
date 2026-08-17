"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="sticky top-0 z-20 flex h-[80px] w-full items-center justify-center border-b border-b-black/10 bg-white/80 px-7 backdrop-blur-md sm:justify-between sm:px-10"
    >
      <motion.div variants={item}>
        <Link href="/">
          <Image
            src="/clickd_navbar_logo.svg"
            alt="clickd Logo"
            height={125}
            width={125}
            className="cursor-pointer"
          />
        </Link>
      </motion.div>
      <motion.div
        variants={item}
        className="hidden items-center gap-x-10 text-lg font-semibold sm:flex"
      >
        <Link
          href="/pricing"
          className="cursor-pointer transition-colors hover:text-brand-blue"
        >
          Pricing
        </Link>
        <Link
          href="/contact"
          className="cursor-pointer transition-colors hover:text-brand-blue"
        >
          Contact
        </Link>
        <Button asChild size="lg" className="h-auto rounded-full px-5 py-2 text-lg">
          <Link href="/order">Get Started</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
