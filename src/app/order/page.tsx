"use client";
//todo
//handle currentStep in seperate function, detailed ifs
//handle number of photos uploaded, if quantity multiple, then check if enough photos uploaded for one strip, or for full quantity
//handle multiple of 4 photo upload even tho quantity set to 1
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Package } from "lucide-react";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import LayoutPage from "./components/LayoutForm";
import PhotosPage from "./components/PhotosForm";
import ShippingDetailsPage from "./components/ShippingDetails";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/zod";
import { LiveLayout } from "@/lib/use-layouts";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type layout = LiveLayout;
interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

export interface RazorpayOptions {
  key: string; // Live/Test key_id
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  order_id: string; // from  server
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
  additional_instructions?: string | undefined;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: (resp: unknown) => void) => void;
    };
  }
}

const STEP_LABELS = ["Layout", "Method", "Photos", "Shipping"];
const STEP_TITLES: Record<number, string> = {
  1: "Choose Layout",
  2: "Photo Method",
  3: "Add Photos",
  4: "Shipping & Payment",
};

export default function Order() {
  const [selectedLayout, setSelectedLayout] = useState<layout | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1); //make it only specific numbers
  const [quantity, setQuantity] = useState<number>(1);
  const [photoMethod, setPhotoMethod] = useState<"take" | "upload" | null>(
    null
  );
  const [photos, setPhotos] = useState<File[]>([]);
  // const [uploadHint, setUploadHint] = useState<string | null>(null);

  const [viewPreviewPane, setViewPreviewPane] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(orderSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      additional_instructions: "",
    },
  });
  const [paymentStage, setPaymentStage] = useState<
    "idle" | "initiating" | "processing"
  >("idle");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imagesUploaded, setImagesUploaded] = useState<boolean>(false);
  const [imageUploadError, setImageUploadError] = useState<boolean>(false);

  const onSubmit = async (values: FormFields) => {
    if (currentStep !== 4 || paymentStage !== "idle") {
      console.log("Form submission blocked:", { currentStep, paymentStage });
      return;
    }
    const layoutForServer = selectedLayout
      ? (({ id, name, photos, description, price }) => ({
          id,
          name,
          photos,
          description,
          price,
        }))(selectedLayout)
      : null;
    try {
      setPaymentStage("initiating");
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          layout: layoutForServer,
          quantity: quantity,
          status: "ORDER_CREATED",
          razorpay_order_id: "init",
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setPaymentStage("idle"); // Reset payment stage on error
        throw new Error(msg || "Failed to create order");
      }
      const data = await res.json();
      const client_order_id = data.client_order_id;
      const PaymentData: RazorpayOptions & {
        modal?: { ondismiss?: () => void };
      } = {
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
          orderId: String(data.orderId), // internal big id
        },
        handler: async function (resp: RazorpayResponse) {
          try {
            setPaymentStage("processing");
            const v = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...resp,
                client_order_id: client_order_id,
                email: values.email,
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
            setPaymentStage("idle"); // Reset payment stage on error
            alert("Verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => {
            // User closed the Razorpay modal
            setPaymentStage("idle");
          },
        },
      };
      const rzp = new window.Razorpay(PaymentData);
      rzp.open();
      // const data = await res.json();
      // console.log("Order created:", data);
      rzp.on?.("payment.failed", () => {
        setPaymentStage("idle");
      });
    } catch (error) {
      console.error(error);
      setPaymentStage("idle"); // Reset payment stage on any error
    }
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(Number.parseInt(value));
  };
  const maxPhotos = selectedLayout?.photos ?? 0;

  useEffect(() => {
    if (!selectedLayout) return;
    setPhotos((prev) =>
      prev.length > maxPhotos ? prev.slice(0, maxPhotos) : prev
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayout?.photos]);
  const uploadImagesToSupabase = async () => {
    return Promise.all(
      photos.map(async (file, index) => {
        try {
          const res = await fetch("/api/storage/signed-upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ filename: file.name, index: index }),
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
        } catch (err) {
          throw new Error(
            `Upload failed: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      })
    );
  };
  async function setNewSessionId() {
    const res = await fetch("/api/session/init", { method: "POST" });
    if (!res.ok) throw new Error("Failed to rotate session id");
  }

  const remainingPhotos = Math.max(
    0,
    (selectedLayout?.photos ?? 0) - photos.length
  );

  return (
    <div className="mb-10 mt-4 ">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="mb-2 px-4">
        <Stepper steps={STEP_LABELS.map((label) => ({ label }))} currentStep={currentStep} />
      </div>
      <div className="text-center text-base mb-4 font-medium text-black/60">
        {STEP_TITLES[currentStep]}
      </div>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-y-3 sm:gap-y-0 sm:gap-x-2 lg:gap-x-8 sm:max-w-7xl px-2 sm:mx-auto ">
        <div className=" col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {currentStep == 1 && (
                <LayoutPage
                  selectedLayout={selectedLayout}
                  setSelectedLayout={setSelectedLayout}
                />
              )}
              {(currentStep == 2 || currentStep == 3) && (
                <PhotosPage
                  selectedLayout={selectedLayout}
                  setCurrentStep={setCurrentStep}
                  currentStep={currentStep}
                  quantity={quantity}
                  photoMethod={photoMethod}
                  photos={photos}
                  setPhotoMethod={setPhotoMethod}
                  setPhotos={setPhotos}
                  viewPreviewPane={viewPreviewPane}
                  setViewPreviewPane={setViewPreviewPane}
                />
              )}

              {currentStep == 4 && (
                <ShippingDetailsPage
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  errors={errors}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="col-span-1 ">
          <Card className="sm:sticky sm:top-6 flex flex-col gap-y-5 rounded-xl border border-gray-200 p-5 shadow-sm transition-all duration-200 ease-in-out">
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
                    <div>
                      Quantity{" "}
                      <span className="font-medium text-sm">
                        {" "}
                        ( 1 Qty = 2 Strips )
                      </span>
                    </div>
                    <div className="">
                      <Select
                        defaultValue="1"
                        onValueChange={handleQuantityChange}
                      >
                        <SelectTrigger className="w-16" size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {currentStep == 4 && (
                    <div className="flex justify-between text-gray-700 font-semibold">
                      <span>Delivery Fees</span>
                      <span>
                        <span className="mr-2 text-white bg-brand-blue px-2 pb-1 rounded-md">
                          Free Delivery
                        </span>
                        <span className="font-semibold line-through">₹50</span>
                      </span>
                    </div>
                  )}
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
                <Button
                  onClick={() => {
                    if (selectedLayout != null) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  disabled={!selectedLayout}
                  className="h-auto rounded-lg bg-brand-blue py-2 text-base font-semibold text-white hover:bg-brand-blue/90"
                >
                  Continue
                </Button>
              )}
              {currentStep == 2 && (
                <Button
                  disabled
                  className="h-auto rounded-lg bg-brand-blue/75 py-2 text-base font-semibold text-white"
                >
                  Choose an option
                </Button>
              )}
              {currentStep == 3 && (
                <Button
                  disabled={
                    isUploading ||
                    photos.length !== (selectedLayout?.photos ?? 0) * quantity
                  }
                  onClick={async () => {
                    if (isUploading) return;

                    setIsUploading(true);
                    setImagesUploaded(false);
                    setImageUploadError(false);
                    setCurrentStep(4);

                    try {
                      await setNewSessionId();
                      try {
                        await uploadImagesToSupabase();
                        setImagesUploaded(true);
                      } catch (error) {
                        console.error(error);
                        setImageUploadError(true);
                      }
                    } catch (e) {
                      console.error(e);
                    } finally {
                      setIsUploading(false);
                      setPaymentStage("idle"); // Ensure payment stage is reset
                    }
                  }}
                  className="h-auto rounded-lg bg-brand-blue py-2 mt-4 text-base font-semibold text-white hover:bg-brand-blue/90"
                >
                  {isUploading ? "Uploading..." : "Proceed to Checkout"}
                </Button>
              )}
              {currentStep == 4 && (
                <Button
                  type="submit"
                  form="order-form"
                  disabled={
                    !imagesUploaded ||
                    Object.keys(errors).length > 0 ||
                    paymentStage !== "idle" ||
                    imageUploadError
                  }
                  className="h-auto rounded-lg bg-brand-blue py-2 text-base font-semibold text-white hover:bg-brand-blue/90 disabled:bg-gray-400"
                >
                  {!imagesUploaded
                    ? "Uploading Images..."
                    : imageUploadError
                    ? "Upload Failed, Go back & Try Again"
                    : paymentStage === "initiating"
                    ? "Initiating Payment..."
                    : paymentStage === "processing"
                    ? "Processing Payment..."
                    : "Pay & Place Order"}
                </Button>
              )}
              {currentStep == 3 && (
                <Button
                  variant="outline"
                  disabled={photos.length != selectedLayout?.photos}
                  onClick={() => setViewPreviewPane(true)}
                  className="h-auto rounded-lg border-gray-300 py-2 text-base font-semibold text-black shadow-xs"
                >
                  Preview Your Strip
                  {remainingPhotos > 0 && (
                    <>
                      {" "}
                      ({remainingPhotos} Image{remainingPhotos === 1 ? "" : "s"}{" "}
                      left)
                    </>
                  )}
                </Button>
              )}
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                  className="h-auto rounded-lg border-gray-300 py-2 text-base font-semibold text-black shadow-xs"
                >
                  Back
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
