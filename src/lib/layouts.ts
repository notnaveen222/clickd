import type { StaticImageData } from "next/image";

import strip1x3 from "../../public/layouts/3photostrip.png";
import strip1x4 from "../../public/layouts/4photostrip.png";

export interface StripLayout {
  id: string;
  name: string;
  photos: number;
  description: string;
  image_url: StaticImageData;
}

export const STRIP_LAYOUTS: StripLayout[] = [
  {
    id: "1x3",
    name: "Photostrip (3 Photos)",
    photos: 3,
    description: "3 Photos in a classic strip format ",
    image_url: strip1x3,
  },
  {
    id: "1x4",
    name: "Photostrip (4 Photos)",
    photos: 4,
    description: "4 Photos in a classic strip format ",
    image_url: strip1x4,
  },
];
