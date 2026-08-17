"use client";
import { layout } from "../page";
import { Camera, Upload, X } from "lucide-react";
import React from "react";
import TakePhotosPane from "./TakePhotosPane";
import PreviewPane from "./PreviewPane";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IMAGE_FORMAT_ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export default function PhotosPage({
  selectedLayout,
  currentStep,
  setCurrentStep,
  quantity,
  photos,
  setPhotos,
  photoMethod,
  setPhotoMethod,
  viewPreviewPane,
  setViewPreviewPane,
}: {
  selectedLayout: layout | null;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  quantity: number;
  photoMethod: "take" | "upload" | null;
  photos: File[];
  setPhotoMethod: (method: "take" | "upload" | null) => void;
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  viewPreviewPane: boolean;
  setViewPreviewPane: (viewPreviewPane: boolean) => void;
}) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedLayout) return;
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length == 0) return;
    const valid = files.filter((f) => {
      const ok = IMAGE_FORMAT_ALLOWED.includes(f.type);
      if (!ok) console.warn("Unsupported file type:", f.name, f.type);
      return ok;
    });

    if (valid.length === 0) return;
    const targetTotal = selectedLayout.photos;

    // push immediately to UI (capped to targetTotal)
    setPhotos((prev) => {
      const remaining = Math.max(targetTotal - prev.length, 0);
      if (remaining <= 0) return prev; // already have enough
      const toAdd = valid.slice(0, remaining);
      return [...prev, ...toAdd];
    });
  };

  return (
    <>
      {currentStep == 2 && (
        <Card className="rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="mb-1 flex items-center gap-x-2 text-xl font-semibold">
            <Camera className="size-6 text-brand-blue" />
            <div>How would you like to add photos?</div>
          </div>
          <div className="mb-4 font-medium text-gray-600">
            Choose to take photos directly or upload existing ones
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              className={`rounded-lg border p-6 text-center transition-all hover:shadow-md ${
                photoMethod === "take"
                  ? "border-brand-blue bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => {
                setCurrentStep(3);
                setPhotoMethod("take");
              }}
            >
              <Camera className="mx-auto mb-4 h-12 w-12 text-brand-blue" />
              <div className="mb-2 text-xl font-semibold text-gray-900">
                Take Photos
              </div>
              <p className="text-sm text-gray-600">
                Use your device camera to take photos directly
              </p>
            </button>
            <button
              type="button"
              className={`rounded-lg border p-6 text-center transition-all hover:shadow-md ${
                photoMethod === "upload"
                  ? "border-brand-blue bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => {
                setCurrentStep(3);
                setPhotoMethod("upload");
              }}
            >
              <Upload className="mx-auto mb-4 h-12 w-12 text-brand-blue" />
              <div className="mb-2 text-xl font-semibold text-gray-900">
                Upload Photos
              </div>
              <p className="text-sm text-gray-600">
                Upload photos from your device or cloud storage
              </p>
            </button>
          </div>
        </Card>
      )}
      {currentStep == 3 && selectedLayout && (
        <div>
          {photoMethod === "take" ? (
            <TakePhotosPane
              selectedLayout={selectedLayout}
              quantity={quantity}
              photos={photos}
              setPhotos={setPhotos}
              captureIntervalMs={5000}
              aspectRatio={null}
            />
          ) : (
            <Card className="rounded-xl border border-gray-200 p-5 shadow-sm transition-all duration-200">
              <div className="mb-1 flex items-center gap-x-2 text-xl font-semibold">
                <Upload className="size-6 text-brand-blue" />
                <div>Upload Your Photos</div>
              </div>
              <div className="mb-4 font-medium text-gray-600">
                Please upload at least {selectedLayout?.photos} photos, or a
                multiple of {selectedLayout?.photos}.
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Drag & Drop Photos
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Or click to browse your files
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button asChild className="h-auto rounded-lg bg-brand-blue px-3 py-2 font-semibold text-white hover:bg-brand-blue/90">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Shared Gallery for both upload & take */}
          {photos.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-2 font-semibold text-gray-900">
                Photos ({photos.length}/{selectedLayout!.photos})
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <div
                      key={index}
                      className="relative flex aspect-square items-center justify-center rounded border border-gray-200 bg-gray-100"
                    >
                      <img
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className="h-full w-full object-contain"
                        onLoad={(e) =>
                          URL.revokeObjectURL(
                            (e.target as HTMLImageElement).src
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPhotos((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute top-1 right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/50 text-xs text-white hover:bg-black/70"
                      >
                        <X className="size-3" />
                      </button>
                      <div className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-xs text-white">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <PreviewPane
            selectedLayout={selectedLayout}
            viewPreviewPane={viewPreviewPane}
            setViewPreviewPane={setViewPreviewPane}
            photos={photos}
          />
        </div>
      )}
    </>
  );
}
