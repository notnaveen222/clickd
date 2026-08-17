"use client";

import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useLayouts, LiveLayout } from "@/lib/use-layouts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function LayoutPage({
  selectedLayout,
  setSelectedLayout,
}: {
  selectedLayout: LiveLayout | null;
  setSelectedLayout(layout: LiveLayout): void;
}) {
  const { layouts, loading, error } = useLayouts();

  return (
    <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="mb-1 flex items-center gap-x-2 text-xl font-semibold">
        <ImageIcon className="size-6 text-brand-blue" />
        Choose Your Strip Layout
      </div>
      <div className="mb-4 font-medium text-gray-600">
        Select the perfect layout for your photo strip
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          Couldn&apos;t load layouts, please refresh.
        </div>
      )}

      {loading && !error && (
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-2 md:p-4">
              <Skeleton className="aspect-[2/3] w-full rounded-md" />
              <Skeleton className="mt-3 h-4 w-3/4" />
              <Skeleton className="mt-2 h-3 w-full" />
              <Skeleton className="mt-2 h-5 w-16" />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4">
          {layouts.map((layout) => (
            <button
              type="button"
              key={layout.id}
              className={`rounded-lg border p-2 text-left transition-all hover:shadow-md md:p-4 ${
                selectedLayout?.id === layout.id
                  ? "border-brand-blue bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedLayout(layout)}
            >
              <div className="mb-3 flex aspect-[2/3] items-center justify-center rounded bg-gray-100">
                <Image
                  src={layout.image_url}
                  alt={layout.name}
                  width={150}
                  height={250}
                  priority
                  placeholder="blur"
                />
              </div>
              <h3 className="font-semibold text-gray-900">{layout.name}</h3>
              <p className="mb-2 text-sm text-gray-600">{layout.description}</p>
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-gray-100 px-2 text-gray-700">
                  ₹{layout.price}
                </div>
                {selectedLayout?.id === layout.id && (
                  <Badge className="bg-brand-blue text-white">Selected</Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
