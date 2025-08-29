import { MapPin } from "lucide-react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormFields } from "../page";

export default function ShippingDetailsPage({
  register,
  handleSubmit,
  onSubmit,
}: {
  register: UseFormRegister<FormFields>;
  handleSubmit: UseFormHandleSubmit<FormFields>;
  onSubmit: (values: FormFields) => void;
}) {
  return (
    <div className="border border-gray-200 p-5 rounded-xl shadow-md ">
      <div className="flex items-center font-semibold text-xl mb-5 gap-x-2">
        <MapPin className="text-brand-blue size-6" />
        <div className="">Shipping Information</div>
      </div>
      <form action="" id="order-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
          <div className=" w-full">
            <div className=" font-semibold mb-1">Full Name</div>
            <input
              type="text"
              className="border w-full font-medium outline-none ring-0  focus:ring-brand-blue focus:ring-2 transition-all duration-200 focus:outline-neutral-500  border-black/10 rounded-lg py-2 px-2"
              placeholder="Name"
              {...register("name")}
            />
          </div>
          <div>
            <div className=" font-semibold mb-1">Email</div>
            <input
              type="text"
              className="border w-full outline-none ring-0 focus:ring-2 focus:ring-brand-blue transition-all duration-200 focus:outline-neutral-500  border-black/20 rounded-lg py-2 px-2"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <div className="col-span-2">
            <div className=" font-semibold mb-1">Address</div>
            <input
              type="text"
              className="border w-full outline-none ring-0 focus:ring-2 focus:ring-brand-blue transition-all duration-200 focus:outline-neutral-500  border-black/20 rounded-lg py-2 px-2"
              placeholder="Address"
              {...register("address")}
            />
          </div>
          <div>
            <div className=" font-semibold mb-1">City</div>
            <input
              type="text"
              className="border w-full outline-none ring-0 focus:ring-2 focus:ring-brand-blue transition-all duration-200 focus:outline-neutral-500  border-black/20 rounded-lg py-2 px-2"
              placeholder="City"
              {...register("city")}
            />
          </div>
          <div>
            <div className=" font-semibold mb-1">State</div>
            <input
              type="text"
              className="border w-full outline-none ring-0 focus:ring-2 focus:ring-brand-blue transition-all duration-200 focus:outline-neutral-500  border-black/20 rounded-lg py-2 px-2"
              placeholder="State"
              {...register("state")}
            />
          </div>
          <div>
            <div className=" font-semibold mb-1">Zip Code</div>
            <input
              type="text"
              className="border w-full outline-none ring-0 focus:ring-2 focus:ring-brand-blue transition-all duration-200 focus:outline-neutral-500  border-black/20 rounded-lg py-2 px-2"
              placeholder="Zip Code"
              {...register("zipcode")}
            />
          </div>
          <div>
            <div className=" font-semibold mb-1">Phone Number</div>
            <input
              type="text"
              className="border w-full outline-none ring-0 focus:ring-2 focus:ring-brand-blue transition-all duration-200 focus:outline-neutral-500  border-black/20 rounded-lg py-2 px-2"
              placeholder="Phone Number (+91)"
              {...register("phone")}
            />
          </div>
          <div className="col-span-2">
            <div className=" font-semibold mb-1">
              Special Instruction (Optional, Max 100 words)
            </div>
            <textarea
              maxLength={500}
              rows={4}
              className="border w-full outline-none ring-0 focus:ring-2 focus:ring-brand-blue transition-all duration-200 focus:outline-neutral-500  border-black/20 rounded-lg py-2 px-2"
              placeholder="Any Special delivery instructions..."
              {...register("additional_instructions")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
