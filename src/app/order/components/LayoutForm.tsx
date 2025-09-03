import { Image as ImageIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import strip1x3 from "../../../../public/layouts/3photostrip.png";
import strip1x4 from "../../../../public/layouts/4photostrip.png";

interface layout {
  id: string;
  name: string;
  photos: number;
  description: string;
  price: number;
  image_url: StaticImageData;
}

export const stripLayouts = [
  {
    id: "1x3",
    name: "Photostrip (3 Photos)",
    photos: 3,
    description: "3 Photos in classic strip format, ",
    price: 179,
    image_url: strip1x3,
  },
  {
    id: "1x4",
    name: "Photostrip (4 Photos)",
    photos: 4,
    description: "4 Photos in classic strip format, ",
    price: 199,
    image_url: strip1x4,
  },
];

export default function LayoutPage({
  selectedLayout,
  setSelectedLayout,
}: {
  selectedLayout: layout | null;
  setSelectedLayout(layout: layout): void;
}) {
  return (
    <div className="border border-gray-200 p-5 mx-2 rounded-xl shadow-md">
      <div className="flex items-center font-semibold text-xl mb-1 gap-x-2">
        <ImageIcon className="text-brand-blue size-6" />
        Choose Your Strip Layout
      </div>
      <div className="text-gray-600 font-medium mb-4">
        Select the perfect layout for your photo strip
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stripLayouts.map((layout) => (
          <div
            key={layout.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedLayout?.id === layout.id
                ? "border-[#1980E5] bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedLayout(layout)}
          >
            <div className="aspect-[2/3] bg-gray-100 rounded mb-3 flex items-center justify-center">
              <Image
                src={layout.image_url}
                alt="Layout Image"
                width={150}
                height={250}
                priority
                placeholder="blur"
              />
            </div>
            <h3 className="font-semibold text-gray-900">{layout.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{layout.description}</p>
            <div className="flex items-center justify-between">
              <div className="bg-gray-100 text-gray-700 px-2 rounded-lg">
                ₹{layout.price}
              </div>
              {selectedLayout?.id === layout.id && (
                <div className="bg-[#1980E5] font-semibold px-2 rounded-md text-white">
                  Selected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
