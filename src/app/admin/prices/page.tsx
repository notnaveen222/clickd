"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Tag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { layoutImages, defaultLayoutImage } from "@/lib/layout-images";

interface PriceRow {
  id: string;
  layoutId: string;
  layoutPrice: number;
  name: string | null;
  description: string | null;
  photos: number | null;
}

interface DraftState {
  name: string;
  description: string;
  layoutPrice: string;
}

export default function PricesPage() {
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/prices");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load prices");
        const rows: PriceRow[] = data.prices ?? [];
        setPrices(rows);
        setDrafts(
          Object.fromEntries(
            rows.map((p) => [
              p.layoutId,
              {
                name: p.name ?? "",
                description: p.description ?? "",
                layoutPrice: String(p.layoutPrice ?? ""),
              },
            ])
          )
        );
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load prices");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateDraft = (layoutId: string, field: keyof DraftState, value: string) => {
    setDrafts((prev) => ({
      ...prev,
      [layoutId]: { ...prev[layoutId], [field]: value },
    }));
  };

  const isDirty = (p: PriceRow) => {
    const draft = drafts[p.layoutId];
    if (!draft) return false;
    return (
      draft.name !== (p.name ?? "") ||
      draft.description !== (p.description ?? "") ||
      draft.layoutPrice !== String(p.layoutPrice ?? "")
    );
  };

  const handleSave = async (layoutId: string) => {
    const draft = drafts[layoutId];
    const price = Number(draft.layoutPrice);
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid price greater than 0");
      return;
    }
    if (!draft.name.trim()) {
      toast.error("Name can't be empty");
      return;
    }

    setSavingId(layoutId);
    try {
      const res = await fetch("/api/admin/prices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          layoutId,
          name: draft.name.trim(),
          description: draft.description,
          layoutPrice: price,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setPrices((prev) =>
        prev.map((p) => (p.layoutId === layoutId ? data.price : p))
      );
      toast.success(`${draft.name} updated`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save price");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <div className="text-2xl font-semibold">Prices</div>
        <div className="text-sm text-muted-foreground">
          Edit the name, description and price shown for each strip layout.
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      ) : prices.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          <Tag className="size-8 text-muted-foreground/60" />
          No layouts found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {prices.map((p) => {
            const draft = drafts[p.layoutId] ?? {
              name: "",
              description: "",
              layoutPrice: "",
            };
            const saving = savingId === p.layoutId;
            const dirty = isDirty(p);
            return (
              <Card key={p.layoutId} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Layout: {p.layoutId}</span>
                    {p.photos ? (
                      <span className="text-xs font-normal text-muted-foreground">
                        {p.photos} photos
                      </span>
                    ) : null}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex justify-center rounded-lg bg-muted/40 p-4">
                    <Image
                      src={layoutImages[p.layoutId] ?? defaultLayoutImage}
                      alt={draft.name || p.layoutId}
                      width={110}
                      height={180}
                      className="h-44 w-auto object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`name-${p.layoutId}`}>Name</Label>
                    <Input
                      id={`name-${p.layoutId}`}
                      value={draft.name}
                      onChange={(e) =>
                        updateDraft(p.layoutId, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`desc-${p.layoutId}`}>Description</Label>
                    <Textarea
                      id={`desc-${p.layoutId}`}
                      rows={2}
                      value={draft.description}
                      onChange={(e) =>
                        updateDraft(p.layoutId, "description", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`price-${p.layoutId}`}>Price (₹)</Label>
                    <Input
                      id={`price-${p.layoutId}`}
                      type="number"
                      min={1}
                      value={draft.layoutPrice}
                      onChange={(e) =>
                        updateDraft(p.layoutId, "layoutPrice", e.target.value)
                      }
                    />
                  </div>

                  <Button
                    onClick={() => handleSave(p.layoutId)}
                    disabled={saving || !dirty}
                    className="mt-1 w-full"
                  >
                    {saving ? <Loader2 className="animate-spin" /> : null}
                    {saving ? "Saving…" : "Save changes"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
