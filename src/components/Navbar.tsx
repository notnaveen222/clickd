"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RouterButton from "./router-button";
import { motion } from "framer-motion";
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
  const router = useRouter();
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full h-[80px] border-b border-b-black/15 flex items-center justify-center sm:justify-between px-7 sm:px-10  "
    >
      <motion.div variants={item}>
        <Image
          onClick={() => router.push("/")}
          src="/clickd_navbar_logo.svg"
          alt="clickd Logo"
          height={125}
          width={125}
          className="cursor-pointer"
        />
      </motion.div>
      <motion.div
        variants={item}
        className="hidden sm:flex gap-x-10 text-lg items-center font-semibold"
      >
        <RouterButton route="pricing" styles="cursor-pointer" title="Pricing" />

        <RouterButton route="contact" styles="cursor-pointer" title="Contact" />
        <div
          onClick={() => router.push("/order")}
          className="text-lg font-semibold cursor-pointer px-4 py-2 text-white rounded-full bg-brand-blue"
        >
          Get Started
        </div>
      </motion.div>
    </motion.div>
  );
}
