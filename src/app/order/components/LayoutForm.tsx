"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { STRIP_LAYOUTS, type StripLayout } from "@/lib/layouts";

export interface layout extends StripLayout {
  price: number;
}

const FALLBACK_PRICES: Record<string, number> = { "1x3": 179, "1x4": 199 };

export default function LayoutPage({
  selectedLayout,
  setSelectedLayout,
}: {
  selectedLayout: layout | null;
  setSelectedLayout(layout: layout): void;
}) {
  const [layouts, setLayouts] = useState<layout[]>(() =>
    STRIP_LAYOUTS.map((l) => ({ ...l, price: FALLBACK_PRICES[l.id] ?? 0 }))
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/prices")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.prices) return;
        setLayouts((prev) =>
          prev.map((l) => ({ ...l, price: data.prices[l.id] ?? l.price }))
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

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
        {layouts.map((layout) => (
          <div
            key={layout.id}
            className={`border rounded-lg p-2 md:p-4 cursor-pointer transition-all hover:shadow-md ${
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
                <div className="bg-[#1980E5] font-semibold px-2 text-sm rounded-md text-white">
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
