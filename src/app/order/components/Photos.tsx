"use client";
import { layout } from "../page";
import { Camera, Upload } from "lucide-react";
import React from "react";

export default function PhotosPage({
  selectedLayout,
  currentStep,
  quantity,
  photos,
  setPhotos,
  photoMethod,
  setPhotoMethod,
}: {
  selectedLayout: layout | null;
  currentStep: number;
  quantity: number;
  photoMethod: "take" | "upload" | null;
  photos: File[];
  setPhotoMethod: (method: "take" | "upload" | null) => void;
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedLayout) return;

    const perStrip = selectedLayout.photos; // e.g., 4
    const incoming = Array.from(event.target.files || []);
    if (incoming.length === 0) return;

    setPhotos((prev) => {
      // How many we can add to keep total a multiple of perStrip?
      const current = prev.length;
      const targetTotal = current + incoming.length;

      // Max total we allow right now = greatest multiple of perStrip not exceeding targetTotal
      const allowedTotal =
        perStrip > 0
          ? Math.floor(targetTotal / perStrip) * perStrip
          : targetTotal;

      const canAdd = Math.max(0, allowedTotal - current);
      const toAdd = incoming.slice(0, canAdd);

      // Hint messaging
      if (toAdd.length === 0) {
        // Already at a clean multiple — tell user how many are needed to start the next set
        const neededForNextSet =
          perStrip > 0 ? perStrip - (current % perStrip || 0) : 0;

        return prev;
      }

      return [...prev, ...toAdd];
    });

    // Clear the file input so selecting the same files again still triggers onChange
    event.target.value = "";
  };
  return (
    <>
      {currentStep == 2 && (
        <div className="border border-gray-200 p-5 rounded-xl shadow-md ">
          <div className="flex items-center font-semibold text-xl mb-1 gap-x-2">
            <Camera className="text-brand-blue size-6" />
            <div>How would you like to add photos?</div>
          </div>
          <div className="text-gray-600 font-medium mb-4">
            Choose to take photos directly or upload existing ones
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all  text-center  ${
                photoMethod === "take"
                  ? "border-[#1980E5] bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setPhotoMethod("take")}
            >
              <Camera className="w-12 h-12 mx-auto mb-4 text-[#1980E5]" />
              <div className=" text-xl font-semibold mb-2 text-gray-900">
                Take Photos
              </div>
              <p className="text-sm text-gray-600">
                Use your device camera to take photos directly
                <span className="font-semibold block">(Available Soon)</span>
              </p>
            </div>
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md text-center ${
                photoMethod === "upload"
                  ? "border-[#1980E5] bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setPhotoMethod("upload")}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#1980E5]" />
              <div className="text-xl font-semibold mb-2 text-gray-900">
                Upload Photos
              </div>
              <p className="text-sm text-gray-600">
                Upload photos from your device or cloud storage
              </p>
            </div>
          </div>
        </div>
      )}
      {currentStep == 3 && (
        <div>
          {photoMethod == "take" ? (
            <div>Take Photo</div>
          ) : (
            <div className="border border-gray-200 p-5 transition-all duration-200 rounded-xl shadow-md ">
              <div className="flex items-center font-semibold text-xl mb-1 gap-x-2">
                <Upload className="text-brand-blue size-6" />
                <div>Upload Your Photos</div>
              </div>
              <div className="text-gray-600 font-medium mb-4">
                Please upload at least {selectedLayout?.photos} photos, or a
                multiple of {selectedLayout?.photos}.
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-2 text-gray-900">
                    Drag & Drop Photos
                  </h3>
                  <p className="text-gray-600 mb-4">
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
                  <button className="bg-brand-blue cursor-pointer px-3 py-2 rounded-lg font-semibold text-white">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </button>
                </div>

                {photos.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">
                      Uploaded Photos ({photos.length}/
                      {selectedLayout!.photos * quantity})
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {photos.map((file, index) => (
                        <div
                          key={index}
                          className="aspect-square relative bg-gray-100 rounded border border-gray-200 flex items-center justify-center"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Uploaded ${index + 1}`}
                            className="object-contain w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setPhotos((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="absolute cursor-pointer top-1 right-1 bg-black/50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-black/70"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}{" "}
        </div>
      )}
    </>
  );
}
