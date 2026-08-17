"use client";

import { useState } from "react";
import { Loader2, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrderShippedButton({
  id,
  toEmail,
}: {
  id: string;
  toEmail: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/mark-shipped", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: id, toEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        toast.error(data?.message || "Failed to mark order as shipped");
        return;
      }
      toast.success(`Order #${id} marked as shipped`);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark order as shipped");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? <Loader2 className="animate-spin" /> : <PackageCheck />}
      Mark as Shipped
    </Button>
  );
}
