"use client";
import ProcessBox from "@/components/ProcessBox";
import { motion } from "framer-motion";
// const processDescriptions = [
//   "Take/Upload your favourite photos from your computer, phone.",
//   "Choose the strip layout you wish to order and get photo strips that suit your style.",
//   "Place your order and receive high-quality printed photo strips delivered to your door.",
// ];
export default function ProcessContainer({
  processDescription,
}: {
  processDescription: string[];
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delay: 0.5,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className="flex mb-10 sm:mb-0 flex-col items-center md:items-baseline   md:flex-row justify-center md:gap-x-8 lg:gap-x-16"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <ProcessBox
        imageURL="image"
        title="1. Choose your images"
        description={processDescription[0]}
        variants={item}
      />
      <ProcessBox
        imageURL="wand"
        title="2. Customize Design"
        description={processDescription[1]}
        variants={item}
      />
      <ProcessBox
        imageURL="truck"
        title="3. Order and Recieve"
        description={processDescription[2]}
        variants={item}
      />
    </motion.div>
  );
}
