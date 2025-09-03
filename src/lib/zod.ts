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

const clientLayoutSchema = z.object({
  id: z.string().min(1, "Layout id is required"),
  name: z.string().min(1, "Layout name is required"),
  photos: z.number().int().positive().optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"), // Required for server orders
  image_url: z.string().url().optional(),
});

export const serverOrderSchema = z
  .object({
    // shipping/contact (same rules as client)
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

    //extra data
    layout: clientLayoutSchema,
    quantity: z.number().int().min(1), // max?

    status: z
      .enum(["ORDER_CREATED", "PENDING_PAYMENT", "PAID", "CANCELLED"])
      .optional(),
    razorpay_order_id: z.string().optional(),
  })
  .strip(); // drop any unknown props instead of erroring

export type ServerOrderInput = z.infer<typeof serverOrderSchema>;
export type OrderForm = z.infer<typeof orderSchema>;
