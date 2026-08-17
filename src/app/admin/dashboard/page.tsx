import DownloadImagesButton from "@/components/DownloadImagesButton";
import OrderShippedButton from "@/components/OrderShippedButton";
import { getUnshippedOrders } from "@/lib/supabase-actions";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

export const revalidate = 0;

function StatusBadge({ status }: { status?: string | null }) {
  const s = (status || "").toUpperCase();
  const variant =
    s === "PAID"
      ? "bg-green-100 text-green-700 ring-1 ring-green-200"
      : s === "ORDER_CREATED" || s === "PENDING_PAYMENT"
      ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
      : s === "FAILED"
      ? "bg-red-100 text-red-700 ring-1 ring-red-200"
      : "bg-gray-100 text-gray-700 ring-1 ring-gray-200";
  return (
    <Badge className={`${variant} font-semibold`} variant="outline">
      {status ?? "—"}
    </Badge>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold break-words text-foreground">
        {children}
      </div>
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
      <div className="mb-5">
        <div className="text-2xl font-semibold">Orders</div>
        <div className="text-sm text-muted-foreground">
          {total} unshipped order{total === 1 ? "" : "s"}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          <PackageOpen className="size-8 text-muted-foreground/60" />
          No unshipped orders right now.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {orders.map((o: Order) => (
            <Card key={o.client_order_id ?? o.id} className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(o.created_at).toLocaleString()}
                    </div>
                    <CardTitle className="text-lg">
                      #{o.client_order_id ?? o.id}
                    </CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold">
                      {formatINR(o.total_inr)}
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Field label="Customer">{o.name ?? "—"}</Field>
                </div>
                <Field label="Email">
                  {o.email ? (
                    <span className="underline decoration-muted-foreground/40 underline-offset-2">
                      {o.email}
                    </span>
                  ) : (
                    "—"
                  )}
                </Field>
                <Field label="Phone">
                  {o.phone ? (
                    <span className="underline decoration-muted-foreground/40 underline-offset-2">
                      {o.phone}
                    </span>
                  ) : (
                    "—"
                  )}
                </Field>
                <div className="col-span-2">
                  <Field label="Address">
                    {[o.address, o.city, o.state, o.zipcode && `- ${o.zipcode}`]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </Field>
                </div>
                <div className="col-span-2 mt-2 flex justify-end gap-2">
                  <DownloadImagesButton clientOrderId={o.client_order_id!} />
                  <OrderShippedButton
                    id={o.client_order_id!}
                    toEmail={o.email!}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
