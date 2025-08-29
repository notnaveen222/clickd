import { Image as ImageIcon, Truck, WandSparkles } from "lucide-react";

interface BoxProp {
  imageURL: "image" | "truck" | "wand";
  title: string;
  description: string;
}

const icons = {
  image: <ImageIcon className="w-8 h-8 text-blue-600" />,
  truck: <Truck className="w-8 h-8 text-blue-600" />,
  wand: <WandSparkles className="w-8 h-8 text-blue-600" />,
};

const ProcessBox = ({ imageURL, title, description }: BoxProp) => {
  return (
    <div className="w-[350px] md:w-[280px] lg:w-[350px] mt-10 rounded-3xl bg-surface-gray/50 px-3 h-[210px] md:h-[260px] py-8 gap-3 flex flex-col justify-center items-center">
      <div className="bg-brand-blue/30 p-2.5 rounded-full flex items-center justify-center">
        {icons[imageURL]}
      </div>
      <div className="text-[22px] font-semibold">{title}</div>
      <div className="text-sub-text font-medium text-center text-[17px]">
        {description}
      </div>
    </div>
  );
};

export default ProcessBox;
