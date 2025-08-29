import { supabase } from "./supabase";

export async function generateClientOrderId() {
  let unique = false;
  let id = "";
  while (!unique) {
    id = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
    const { data } = await supabase
      .from("orders")
      .select("id")
      .eq("client_order_id", id)
      .limit(1);

    if (!data || data.length === 0) {
      unique = true;
    }
  }
  return id;
}
