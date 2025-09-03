"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function DownloadImagesButton({
  clientOrderId,
}: {
  clientOrderId: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/${clientOrderId}/download`, {
        method: "GET",
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `HTTP ${res.status}`);
      }

      // Turn response into a blob
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and click it
      const a = document.createElement("a");
      a.href = url;
      a.download = `${clientOrderId}-photos.zip`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Could not download files");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg cursor-pointer border px-3 py-1.5 text-sm font-semibold hover:bg-black transition-all duration-200 ease-in-out hover:text-white"
    >
      <Download size={16} />
      {loading ? "Preparing…" : "Download"}
    </button>
  );
}
