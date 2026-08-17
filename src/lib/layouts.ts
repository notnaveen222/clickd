import { StaticImageData } from "next/image";
import { listPrices } from "./supabase-actions";
import { layoutImages, defaultLayoutImage } from "./layout-images";

export interface Layout {
  id: string;
  name: string;
  photos: number;
  description: string;
  price: number;
  image_url: StaticImageData;
}

/** Server-only: live layout+price data merged with the static layout images. */
export async function getLayouts(): Promise<Layout[]> {
  const prices = await listPrices();
  return prices.map((p) => ({
    id: p.layoutId,
    name: p.name ?? p.layoutId,
    description: p.description ?? "",
    price: Number(p.layoutPrice),
    photos: p.photos ?? 0,
    image_url: layoutImages[p.layoutId] ?? defaultLayoutImage,
  }));
}
