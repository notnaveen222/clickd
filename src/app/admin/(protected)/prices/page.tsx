import PricesEditor from "@/components/admin/PricesEditor";
import { getLayoutPrices } from "@/lib/supabase-actions";

export const revalidate = 0;

export default async function PricesPage() {
  const prices = await getLayoutPrices();

  return (
    <div className="p-5">
      <div className="mb-1 text-3xl font-semibold">Prices</div>
      <div className="mb-5 text-sm font-medium text-gray-600">
        Update the price charged at checkout for each strip layout.
      </div>
      <PricesEditor prices={prices} />
    </div>
  );
}
