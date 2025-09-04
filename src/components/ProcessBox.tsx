"use client";
import { Image as ImageIcon, Truck, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
interface BoxProp {
  imageURL: "image" | "truck" | "wand";
  title: string;
  description: string;
  variants: {
    hidden: { opacity: number; y: number };
    show: { opacity: number; y: number };
  };
}

const icons = {
  image: <ImageIcon className="w-8 h-8 text-blue-600" />,
  truck: <Truck className="w-8 h-8 text-blue-600" />,
  wand: <WandSparkles className="w-8 h-8 text-blue-600" />,
};

const ProcessBox = ({ imageURL, title, description, variants }: BoxProp) => {
  return (
    <motion.div
      variants={variants}
      className="w-[340px] md:w-[280px] lg:w-[350px] mt-10 rounded-3xl bg-surface-gray/50 px-3 h-[210px] md:h-[260px] py-8 gap-3 flex flex-col justify-center items-center"
    >
      <div className="bg-brand-blue/30 p-2.5 rounded-full flex items-center justify-center">
        {icons[imageURL]}
      </div>
      <div className="text-[22px] font-semibold">{title}</div>
      <div className="text-sub-text font-medium text-center text-[17px]">
        {description}
      </div>
    </motion.div>
  );
};

export default ProcessBox;
