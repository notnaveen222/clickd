"use client";

import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { layoutImages, defaultLayoutImage } from "./layout-images";

export interface LiveLayout {
  id: string;
  name: string;
  photos: number;
  description: string;
  price: number;
  image_url: StaticImageData;
}

export function useLayouts() {
  const [layouts, setLayouts] = useState<LiveLayout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/layouts");
        if (!res.ok) throw new Error("Failed to load layouts");
        const data = await res.json();
        if (cancelled) return;
        const merged: LiveLayout[] = (data.layouts ?? []).map(
          (l: { id: string; name: string; description: string; price: number; photos: number }) => ({
            ...l,
            image_url: layoutImages[l.id] ?? defaultLayoutImage,
          })
        );
        setLayouts(merged);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load layouts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { layouts, loading, error };
}
