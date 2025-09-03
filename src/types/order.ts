// types/order.ts
export type Order = {
  id: string;
  client_order_id?: string | null;
  created_at: string; // ISO string from DB
  total_inr: number | null;
  status?: "PAID" | "ORDER_CREATED" | "FAILED" | string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
};
