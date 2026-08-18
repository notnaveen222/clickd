"use client";

import { useState } from "react";
import type { LayoutPrice } from "@/lib/supabase-actions";

const LAYOUT_LABELS: Record<string, string> = {
  "1x3": "Photostrip (3 Photos)",
  "1x4": "Photostrip (4 Photos)",
};

export default function PricesEditor({ prices }: { prices: LayoutPrice[] }) {
  const [rows, setRows] = useState(prices);
  const [drafts, setDrafts] = useState<Record<string, string>>(
    Object.fromEntries(prices.map((p) => [p.layoutId, String(p.layoutPrice)]))
  );
  const [savingId, setSavingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  async function handleSave(layoutId: string) {
    const value = Number(drafts[layoutId]);
    if (!Number.isFinite(value) || value <= 0) {
      setErrorId(layoutId);
      setSavedId(null);
      return;
    }
    setErrorId(null);
    setSavedId(null);
    setSavingId(layoutId);
    try {
      const res = await fetch("/api/admin/prices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layoutId, layoutPrice: value }),
      });
      if (!res.ok) {
        setErrorId(layoutId);
        return;
      }
      const data = await res.json();
      setRows((prev) =>
        prev.map((r) => (r.layoutId === layoutId ? data.price : r))
      );
      setSavedId(layoutId);
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.layoutId}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          <div className="mb-1 text-xs font-medium text-gray-500">
            {LAYOUT_LABELS[row.layoutId] ?? "Layout"}
          </div>
          <div className="mb-3 text-sm font-semibold text-gray-900">
            {row.layoutId}
          </div>

          <label className="mb-1 block text-xs font-medium text-gray-500">
            Price (INR)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              value={drafts[row.layoutId]}
              onChange={(e) =>
                setDrafts((d) => ({ ...d, [row.layoutId]: e.target.value }))
              }
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button
              onClick={() => handleSave(row.layoutId)}
              disabled={savingId === row.layoutId}
              className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-200 ease-in-out hover:bg-black hover:text-white disabled:opacity-50"
            >
              {savingId === row.layoutId ? "Saving..." : "Save"}
            </button>
          </div>

          {errorId === row.layoutId && (
            <div className="mt-2 text-xs font-medium text-red-600">
              Failed to save. Enter a valid positive price.
            </div>
          )}
          {savedId === row.layoutId && (
            <div className="mt-2 text-xs font-medium text-green-600">Saved.</div>
          )}
        </div>
      ))}
    </div>
  );
}
