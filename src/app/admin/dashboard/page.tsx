import OrderShippedButton from "@/components/OrderShippedButton";
import { getUnshippedOrders } from "@/lib/supabase-actions";
import { Order } from "@/types/order";

export const revalidate = 0; // or: export const dynamic = "force-dynamic"

function statusClasses(s?: string) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold";
  switch ((s || "").toUpperCase()) {
    case "PAID":
      return `${base} bg-green-100 text-green-700 ring-1 ring-green-200`;
    case "ORDER_CREATED":
      return `${base} bg-amber-100 text-amber-700 ring-1 ring-amber-200`;
    case "FAILED":
      return `${base} bg-red-100 text-red-700 ring-1 ring-red-200`;
    default:
      return `${base} bg-gray-100 text-gray-700 ring-1 ring-gray-200`;
  }
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-medium text-gray-500">{children}</div>;
}

function Value({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-semibold text-gray-900 break-words">
      {children}
    </div>
  );
}

export default async function OrdersPage() {
  const { orders, total } = await getUnshippedOrders();

  const formatINR = (n: number | null | undefined) =>
    typeof n === "number"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(n)
      : "—";

  return (
    <div className="p-5">
      <div className="mb-1 text-3xl font-semibold">Orders Dashboard</div>
      <div className="mb-5 text-sm font-medium text-gray-600">
        Total Unshipped Orders: {total}
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-gray-600">
          No unshipped orders right now.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {orders.map((o: Order) => (
            <div
              key={o.client_order_id ?? o.id}
              className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              {/* Card header */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-gray-500">
                    {new Date(o.created_at).toLocaleString()}
                  </div>
                  <div className="text-lg font-semibold">
                    #{o.client_order_id ?? o.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold">
                    {formatINR(o.total_inr)}
                  </div>
                  <div className={statusClasses(o.status!)}>
                    {o.status ?? "—"}
                  </div>
                </div>
              </div>
              {/* Card body */}
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label>Customer</Label>
                  <Value>{o.name ?? "—"}</Value>
                </div>

                <div>
                  <Label>Email</Label>
                  <Value>
                    {o.email ? (
                      <a
                        href={`mailto:${o.email}`}
                        className="underline decoration-gray-300 hover:decoration-gray-500"
                      >
                        {o.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </Value>
                </div>

                <div>
                  <Label>Phone</Label>
                  <Value>
                    {o.phone ? (
                      <a
                        href={`tel:${o.phone}`}
                        className="underline decoration-gray-300 hover:decoration-gray-500"
                      >
                        {o.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </Value>
                </div>

                <div className="col-span-2">
                  <Label>Address</Label>
                  <Value>
                    {[o.address, o.city, o.state, o.zipcode && `- ${o.zipcode}`]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </Value>
                </div>
              </div>
              {/* Optional actions */}
              <div className="mt-4 flex justify-end gap-2">
                <OrderShippedButton
                  id={o.client_order_id!}
                  toEmail={o.email!}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
