"use client";
import { Image as ImageIcon, Truck, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

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
  image: <ImageIcon className="size-8 text-brand-blue" />,
  truck: <Truck className="size-8 text-brand-blue" />,
  wand: <WandSparkles className="size-8 text-brand-blue" />,
};

const ProcessBox = ({ imageURL, title, description, variants }: BoxProp) => {
  return (
    <motion.div variants={variants} className="mt-10">
      <Card className="flex h-[210px] w-[340px] flex-col items-center justify-center gap-3 rounded-3xl border-gray-200 bg-surface-gray/40 px-3 py-8 shadow-sm transition-shadow hover:shadow-md md:h-[260px] md:w-[280px] lg:w-[350px]">
        <CardContent className="flex flex-col items-center gap-3 p-0 text-center">
          <div className="flex items-center justify-center rounded-full bg-brand-blue/15 p-2.5">
            {icons[imageURL]}
          </div>
          <div className="text-[22px] font-semibold">{title}</div>
          <div className="text-center text-[17px] font-medium text-sub-text">
            {description}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProcessBox;
