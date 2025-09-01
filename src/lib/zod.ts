import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  address: z.string().min(10, "Address looks too short"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipcode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  additional_instructions: z.string().max(500).default(""),
});

export type OrderForm = z.infer<typeof orderSchema>;
