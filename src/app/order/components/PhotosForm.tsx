"use client";
import { layout } from "../page";
import { Camera, Upload } from "lucide-react";
import React, { useEffect } from "react";

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
  useEffect(() => {
    fetch("/api/session/init").catch(() => {});
  }, []);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedLayout) return;

    const perStrip = selectedLayout.photos; // HARD CAP = strip size only
    const incoming = Array.from(e.target.files || []);
    e.target.value = ""; // allow re-selecting same files
    if (incoming.length === 0) return;

    // filter allowed types
    const valid = incoming.filter((f) => {
      const ok = IMAGE_FORMAT_ALLOWED.includes(f.type);
      if (!ok) console.warn("Unsupported type:", f.name, f.type);
      return ok;
    });
    if (valid.length === 0) return;

    // 1) OPTIMISTIC UI: add immediately, capped to strip size
    let toUpload: File[] = [];
    setPhotos((prev) => {
      if (prev.length >= perStrip) return prev;
      const remaining = Math.max(0, perStrip - prev.length);
      toUpload = valid.slice(0, remaining);
      return remaining ? [...prev, ...toUpload] : prev;
    });

    if (toUpload.length === 0) return;

    // 2) BACKGROUND UPLOAD (doesn't block UI)
    // (async () => {
    //   await Promise.all(
    //     toUpload.map(async (file) => {
    //       try {
    //         // get signed slot (uses cookie session if your API expects it)
    //         const res = await fetch("/api/storage/signed-upload", {
    //           method: "POST",
    //           headers: { "Content-Type": "application/json" },
    //           credentials: "include",
    //           body: JSON.stringify({ filename: file.name }),
    //         });
    //         const json = await res.json();
    //         if (!res.ok) throw new Error(json?.error || "signed-upload failed");

    //         const { path, token } = json;

    //         // upload to Supabase
    //         const { error } = await supabase.storage
    //           .from("order-photos")
    //           .uploadToSignedUrl(path, token, file, { contentType: file.type });

    //         if (error) throw error;
    //       } catch (err) {
    //         console.error("Upload failed:", file.name, err);
    //         // OPTIONAL: if an upload fails, remove that file from the UI
    //         // setPhotos((prev) => prev.filter((f) => f !== file));
    //       }
    //     })
    //   );
    // })();
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
