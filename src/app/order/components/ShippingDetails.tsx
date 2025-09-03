import { MapPin } from "lucide-react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { FormFields } from "../page";

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
  return (
    <div className="border border-gray-200 p-5 rounded-xl shadow-md ">
      <div className="flex items-center font-semibold text-xl mb-5 gap-x-2">
        <MapPin className="text-brand-blue size-6" />
        <div className="">Shipping Information</div>
      </div>
      <form action="" id="order-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-10 gap-y-5">
          <div className=" w-full">
            <div className=" font-semibold mb-1">Full Name</div>
            <input
              type="text"
              className={`border w-full font-medium outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/10"
              }`}
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <div className=" font-semibold mb-1">Email</div>
            <input
              type="text"
              className={`border w-full outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/20"
              }`}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="col-span-2">
            <div className=" font-semibold mb-1">Address</div>
            <input
              type="text"
              className={`border w-full outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/20"
              }`}
              placeholder="Address"
              {...register("address")}
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.address.message}
              </span>
            )}
          </div>
          <div>
            <div className=" font-semibold mb-1">City</div>
            <input
              type="text"
              className={`border w-full outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.city
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/20"
              }`}
              placeholder="City"
              {...register("city")}
            />
            {errors.city && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.city.message}
              </span>
            )}
          </div>
          <div>
            <div className=" font-semibold mb-1">State</div>
            <input
              type="text"
              className={`border w-full outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.state
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/20"
              }`}
              placeholder="State"
              {...register("state")}
            />
            {errors.state && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.state.message}
              </span>
            )}
          </div>
          <div>
            <div className=" font-semibold mb-1">Zip Code</div>
            <input
              type="text"
              className={`border w-full outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.zipcode
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/20"
              }`}
              placeholder="Zip Code"
              {...register("zipcode")}
            />
            {errors.zipcode && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.zipcode.message}
              </span>
            )}
          </div>
          <div>
            <div className=" font-semibold mb-1">Phone Number</div>
            <input
              type="text"
              className={`border w-full outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/20"
              }`}
              placeholder="Phone Number (+91)"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="col-span-2">
            <div className=" font-semibold mb-1">
              Special Instruction (Optional, Max 100 words)
            </div>
            <textarea
              maxLength={500}
              rows={4}
              className={`border w-full outline-none ring-0 focus:ring-2 transition-all duration-200 focus:outline-neutral-500 rounded-lg py-2 px-2 ${
                errors.additional_instructions
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-blue border-black/20"
              }`}
              placeholder="Any Special delivery instructions..."
              {...register("additional_instructions")}
            />
            {errors.additional_instructions && (
              <span className="text-red-500 text-sm mt-1 block font-medium">
                {errors.additional_instructions.message}
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
