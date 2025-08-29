import { useEffect, useRef, useState } from "react";
import { Camera, RotateCcw, CameraOff, RefreshCw } from "lucide-react";

type TakePhotoPaneProps = {
  selectedLayout: { photos: number } | null | undefined;
  quantity: number;
  uploadedPhotos: File[];
  setUploadedPhotos: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function TakePhotoPane({
  selectedLayout,
  quantity,
  uploadedPhotos,
  setUploadedPhotos,
}: TakePhotoPaneProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [error, setError] = useState<string | null>(null);
  const needed = (selectedLayout?.photos ?? 0) * (quantity ?? 1);

  async function startCamera(
    chosenFacing: "user" | "environment" = facingMode
  ) {
    setError(null);
    try {
      // Stop any existing stream first
      stopCamera();

      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: chosenFacing }, // mobile-friendly
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      setStream(s);
      setIsCameraOn(true);

      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e: any) {
      setError(
        e?.name === "NotAllowedError"
          ? "Camera permission denied. Please allow access and try again."
          : "Unable to start camera. Check permissions or try a different device."
      );
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    setStream(null);
    setIsCameraOn(false);
  }

  async function switchCamera() {
    const next = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    await startCamera(next);
  }

  async function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Use the actual video dimensions for crisp images
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, w, h);

    // Convert to Blob -> File to match your upload list type
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File(
          [blob],
          `capture-${new Date().toISOString().replace(/[:.]/g, "-")}.jpg`,
          { type: "image/jpeg" }
        );
        setUploadedPhotos((prev) => [...prev, file]);
      },
      "image/jpeg",
      0.92
    );
  }

  // Clean up on unmount
  useEffect(() => {
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border border-gray-200 p-5 rounded-xl shadow-md">
      <div className="flex items-center font-semibold text-xl mb-1 gap-x-2">
        <Camera className="text-brand-blue size-6" />
        <div>Take Photos</div>
      </div>

      <div className="text-gray-600 font-medium mb-4">
        Please take at least {selectedLayout?.photos} photos, or a multiple of{" "}
        {selectedLayout?.photos}.
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-0 text-center overflow-hidden">
          {/* Live Preview Area (kept visually similar in size/padding) */}
          <div className="relative bg-gray-50">
            {!isCameraOn ? (
              <div className="p-8">
                <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2 text-gray-900">
                  Start Camera
                </h3>
                <p className="text-gray-600 mb-4">
                  Grant permission to take photos directly from your device.
                </p>
                <button
                  type="button"
                  onClick={() => startCamera()}
                  className="bg-brand-blue text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Enable Camera
                </button>
                {error && (
                  <p className="text-red-600 font-medium mt-3">{error}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full max-h-[420px] object-contain bg-black"
                />
                <div className="flex items-center gap-3 p-4 justify-center">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="bg-brand-blue text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    Capture
                  </button>
                  <button
                    type="button"
                    onClick={switchCamera}
                    className="bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                    title="Switch front/back camera"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Flip
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <CameraOff className="w-4 h-4" />
                    Stop
                  </button>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        {uploadedPhotos.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">
              Captured Photos ({uploadedPhotos.length}/{needed})
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {uploadedPhotos.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="aspect-square relative bg-gray-100 rounded border border-gray-200 flex items-center justify-center"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Captured ${index + 1}`}
                    className="object-contain w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setUploadedPhotos((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute cursor-pointer top-1 right-1 bg-black/50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-black/70"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {needed > 0 && uploadedPhotos.length < needed && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mt-2">
                You need {needed - uploadedPhotos.length} more photo
                {needed - uploadedPhotos.length === 1 ? "" : "s"} to complete
                this order.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
