"use client";

export default function OrderShippedButton({
  id,
  toEmail,
}: {
  id: string;
  toEmail: string;
}) {
  const handleClick = async ({
    id,
    toEmail,
  }: {
    id: string;
    toEmail: string;
  }) => {
    const res = await fetch("/api/admin/mark-shipped", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id, toEmail: toEmail }),
    });
  };
  return (
    <button
      className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
      onClick={() => handleClick({ id, toEmail })}
    >
      Mark as Shipped
    </button>
  );
}
