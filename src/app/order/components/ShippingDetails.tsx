import { MapPin } from "lucide-react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { FormFields } from "../page";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Field({
  label,
  htmlFor,
  colSpan = 1,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  colSpan?: 1 | 2;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={colSpan === 2 ? "col-span-2" : "col-span-2 sm:col-span-1"}>
      <Label htmlFor={htmlFor} className="mb-1 font-semibold">
        {label}
      </Label>
      {children}
      {error && (
        <span className="mt-1 block text-sm font-medium text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}

export default function ShippingDetailsPage({
  register,
  handleSubmit,
  onSubmit,
  errors,
}: {
  register: UseFormRegister<FormFields>;
  handleSubmit: UseFormHandleSubmit<FormFields>;
  onSubmit: (values: FormFields) => void;
  errors: FieldErrors<FormFields>;
}) {
  const errClass = "border-red-500 focus-visible:ring-red-500";

  return (
    <Card className="rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-x-2 text-xl font-semibold">
        <MapPin className="size-6 text-brand-blue" />
        <div>Shipping Information</div>
      </div>
      <form id="order-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-10">
          <Field label="Full Name" htmlFor="name" error={errors.name?.message}>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              className={errors.name ? errClass : ""}
              {...register("name")}
            />
          </Field>
          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <Input
              id="email"
              type="text"
              placeholder="Email"
              className={errors.email ? errClass : ""}
              {...register("email")}
            />
          </Field>
          <Field label="Address" htmlFor="address" colSpan={2} error={errors.address?.message}>
            <Input
              id="address"
              type="text"
              placeholder="Address"
              className={errors.address ? errClass : ""}
              {...register("address")}
            />
          </Field>
          <Field label="City" htmlFor="city" error={errors.city?.message}>
            <Input
              id="city"
              type="text"
              placeholder="City"
              className={errors.city ? errClass : ""}
              {...register("city")}
            />
          </Field>
          <Field label="State" htmlFor="state" error={errors.state?.message}>
            <Input
              id="state"
              type="text"
              placeholder="State"
              className={errors.state ? errClass : ""}
              {...register("state")}
            />
          </Field>
          <Field label="Zip Code" htmlFor="zipcode" error={errors.zipcode?.message}>
            <Input
              id="zipcode"
              type="text"
              placeholder="Zip Code"
              className={errors.zipcode ? errClass : ""}
              {...register("zipcode")}
            />
          </Field>
          <Field label="Phone Number" htmlFor="phone" error={errors.phone?.message}>
            <Input
              id="phone"
              type="text"
              placeholder="Phone Number (+91)"
              className={errors.phone ? errClass : ""}
              {...register("phone")}
            />
          </Field>
          <Field
            label="Special Instruction (Optional, Max 100 words)"
            htmlFor="additional_instructions"
            colSpan={2}
            error={errors.additional_instructions?.message}
          >
            <Textarea
              id="additional_instructions"
              maxLength={500}
              rows={4}
              placeholder="Any Special delivery instructions..."
              className={errors.additional_instructions ? errClass : ""}
              {...register("additional_instructions")}
            />
          </Field>
        </div>
      </form>
    </Card>
  );
}
