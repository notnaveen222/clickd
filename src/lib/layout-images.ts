import { StaticImageData } from "next/image";
import strip1x3 from "../../public/layouts/3photostrip.png";
import strip1x4 from "../../public/layouts/4photostrip.png";

export const layoutImages: Record<string, StaticImageData> = {
  "1x3": strip1x3,
  "1x4": strip1x4,
};

export const defaultLayoutImage = strip1x4;
