"use client";
//todo
//handle currentStep in seperate function, detailed ifs
//handle number of photos uploaded, if quantity multiple, then check if enough photos uploaded for one strip, or for full quantity
//handle multiple of 4 photo upload even tho quantity set to 1
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Package } from "lucide-react";
import Script from "next/script";
import LayoutPage from "./components/LayoutForm";
import PhotosPage from "./components/PhotosForm";
import ShippingDetailsPage from "./components/ShippingDetails";
import { supabase } from "@/lib/supabase";

export interface layout {
  id: string;
  name: string;
  photos: number;
  description: string;
  price: number;
  image_url: string;
}
interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

export interface RazorpayOptions {
  key: string; // Live/Test key_id
  amount: number; // in paise
  currency: string; // e.g. "INR"
  name?: string;
  description?: string;
  order_id: string; // from your server
  prefill?: RazorpayPrefill;
  notes?: Record<string, string>;
  handler?: (resp: RazorpayResponse) => void;
  theme?: { color?: string };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
export type FormFields = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  additional_instructions: string | null;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: (resp: unknown) => void) => void;
    };
  }
}

export default function Order() {
  const [selectedLayout, setSelectedLayout] = useState<layout | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1); //make it only specific numbers
  const [quantity, setQuantity] = useState<number>(1);
  const [photoMethod, setPhotoMethod] = useState<"take" | "upload" | null>(
    null
  );
  const [photos, setPhotos] = useState<File[]>([]);
  // const [uploadHint, setUploadHint] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: "sample",
      email: "sample",
      phone: "sample",
      address: "sample",
      city: "sample",
      state: "sample",
      zipcode: "sample",
      additional_instructions: "",
    },
  });
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const onSubmit = async (values: FormFields) => {
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          layout: selectedLayout,
          quantity: quantity,
          status: "ORDER_CREATED",
          razorpay_order_id: "init",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create order");
      }
      const client_order_id = data.client_order_id;
      const PaymentData: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: "Clickd",
        description: `Selected Layout & Quantity: ${selectedLayout?.name} x ${quantity}`,
        order_id: data.razorpayOrderId,
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },
        notes: {
          layout: selectedLayout!.name,
          qty: String(quantity),
          orderId: String(data.orderId), // your internal id
        },
        handler: async function (resp: RazorpayResponse) {
          try {
            const v = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...resp,
                client_order_id: client_order_id,
              }),
            });
            const vr = await v.json();
            if (vr.ok) {
              window.location.href = `/order/success?orderId=${data.client_order_id}`;
            } else {
              window.location.href = `/order/failure?orderId=${data.client_order_id}`;
            }
          } catch (e) {
            console.error(e);
            alert("Verification failed. Please contact support.");
          }
        },
      };
      const rzp = new window.Razorpay(PaymentData);
      rzp.open();
      // const data = await res.json();
      // console.log("Order created:", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number.parseInt(e.target.value));
  };
  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!selectedLayout) return;

  //   const perStrip = selectedLayout.photos; // e.g., 4
  //   const incoming = Array.from(event.target.files || []);
  //   if (incoming.length === 0) return;

  //   setUploadedPhotos((prev) => {
  //     // How many we can add to keep total a multiple of perStrip?
  //     const current = prev.length;
  //     const targetTotal = current + incoming.length;

  //     // Max total we allow right now = greatest multiple of perStrip not exceeding targetTotal
  //     const allowedTotal =
  //       perStrip > 0
  //         ? Math.floor(targetTotal / perStrip) * perStrip
  //         : targetTotal;

  //     const canAdd = Math.max(0, allowedTotal - current);
  //     const toAdd = incoming.slice(0, canAdd);

  //     // Hint messaging
  //     if (toAdd.length === 0) {
  //       // Already at a clean multiple — tell user how many are needed to start the next set
  //       const neededForNextSet =
  //         perStrip > 0 ? perStrip - (current % perStrip || 0) : 0;
  //       setUploadHint(
  //         neededForNextSet > 0
  //           ? `Add ${neededForNextSet} more to complete the next set of ${perStrip}.`
  //           : `You can add ${perStrip} photos to start a new set.`
  //       );
  //       return prev;
  //     }

  //     const ignored = incoming.length - toAdd.length;
  //     if (ignored > 0) {
  //       setUploadHint(
  //         `Added ${toAdd.length} photo${toAdd.length > 1 ? "s" : ""}. ` +
  //           `${ignored} ignored to keep a multiple of ${perStrip}.`
  //       );
  //     } else {
  //       setUploadHint(null);
  //     }

  //     return [...prev, ...toAdd];
  //   });

  //   // Clear the file input so selecting the same files again still triggers onChange
  //   event.target.value = "";
  // };
  const uploadImagesToSupabase = async () => {
    return Promise.all(
      photos.map(async (file) => {
        try {
          const res = await fetch("/api/storage/signed-upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ filename: file.name }),
          });
          if (!res.ok) {
            throw new Error("signed-upload failed");
          }
          const json = await res.json();
          const { path, token } = json;
          const { error } = await supabase.storage
            .from("order-photos")
            .uploadToSignedUrl(path, token, file, { contentType: file.type });
          if (error) throw error;
        } catch (error) {
          console.error("Upload to supabase bucket failed", error);
        }
      })
    );
  };
  useEffect(() => {
    fetch("/api/session/init").catch(() => {});
  }, []);
  return (
    <div className="mb-10 mt-4 ">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex items-center justify-center space-x-0 mb-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep
                  ? "bg-[#1980E5] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={`w-12 h-0.5 ${
                  step < currentStep ? "bg-[#1980E5]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-base mb-4 font-medium text-black/60">
        {currentStep === 1 && "Choose Layout"}
        {currentStep === 2 && "Photo Method"}
        {currentStep === 3 && "Add Photos"}
        {currentStep === 4 && "Shipping & Payment"}
      </div>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-y-3 sm:gap-y-0 sm:gap-x-2 lg:gap-x-8 sm:max-w-7xl px-2 sm:mx-auto ">
        <div className=" col-span-2">
          {currentStep == 1 && (
            <LayoutPage
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
            />
          )}
          {(currentStep == 2 || currentStep == 3) && (
            <PhotosPage
              selectedLayout={selectedLayout}
              currentStep={currentStep}
              quantity={quantity}
              photoMethod={photoMethod}
              photos={photos}
              setPhotoMethod={setPhotoMethod}
              setPhotos={setPhotos}
            />
          )}

          {currentStep == 4 && (
            <ShippingDetailsPage
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          )}
        </div>
        <div className="col-span-1 ">
          <div className="sm:sticky sm:top-6 flex flex-col border gap-y-5 transition-all duration-200 ease-in-out border-gray-200 p-5 rounded-xl shadow-md">
            <div className="flex items-center gap-x-4 ">
              <Package className="text-brand-blue" />
              <div className="font-semibold text-xl">Order Summary</div>
            </div>
            <div className="text-center">
              {!selectedLayout && (
                <div className="text-gray-600">
                  Select Layout to view details
                </div>
              )}
              {selectedLayout && (
                <div className="flex flex-col gap-y-5">
                  <div className="flex justify-between text-gray-700 font-semibold">
                    <span>{selectedLayout.name}</span>
                    <span className="font-semibold">
                      ₹{selectedLayout.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-gray-700 ">
                    <div>Quantity</div>
                    <div className="">
                      <select
                        onChange={handleQuantityChange}
                        className="w-16 border transition-all  duration-200 ease-in-out  border-gray-300 rounded-lg shadow-sm px-2 py-1"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  <div className="border-t border-t-black/20 pt-4">
                    <div className="flex text-lg font-semibold justify-between items-center mb-4">
                      <div>Total</div>
                      <div>₹{quantity * selectedLayout.price}</div>
                    </div>
                    <div className="text-gray-700/70 font-semibold flex items-start text-[15px] flex-col">
                      <div>• Minimum {selectedLayout.photos} photos needed</div>
                      <div>• Free Shipping</div>
                      <div>• 3-5 buisness day delivery</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2 mb-3">
              {currentStep == 1 && (
                <button
                  onClick={() => {
                    if (selectedLayout != null) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  className={`${
                    selectedLayout
                      ? "bg-brand-blue/100 cursor-pointer"
                      : "bg-brand-blue/75 cursor-default"
                  }  transition-all duration-200 rounded-lg text-white font-semibold py-2`}
                >
                  Continue
                </button>
              )}
              {currentStep == 2 && (
                <button
                  onClick={() => {
                    if (photoMethod != null) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  className={`${
                    photoMethod
                      ? "bg-brand-blue/100 cursor-pointer"
                      : "bg-brand-blue/75 cursor-default"
                  }  transition-all duration-200 rounded-lg text-white font-semibold py-2`}
                >
                  Continue
                </button>
              )}
              {currentStep == 3 && (
                <button
                  onClick={async () => {
                    const required = selectedLayout?.photos
                      ? selectedLayout.photos * quantity
                      : 0;
                    if (photos.length === required) {
                      await uploadImagesToSupabase();
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  className={`${
                    photos.length === (selectedLayout?.photos ?? 0) * quantity
                      ? "bg-brand-blue/100 cursor-pointer"
                      : "bg-brand-blue/75 cursor-default"
                  } transition-all duration-200 rounded-lg text-white font-semibold py-2 mt-4`}
                >
                  Proceed to Checkout
                </button>
              )}
              {currentStep == 4 && (
                <button
                  type="submit"
                  form="order-form"
                  className="bg-brand-blue hover:bg-brand-blue transition-all duration-200 rounded-lg text-white font-semibold cursor-pointer py-2"
                  onClick={() => setPaymentProcessing(true)}
                >
                  {paymentProcessing
                    ? "Initiating Payment..."
                    : "Pay & Place Order"}
                </button>
              )}
              {currentStep > 1 && (
                <button
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                  className="transition-all duration-200 rounded-lg text-black border border-gray-300 shadow-xs font-semibold cursor-pointer py-2"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
