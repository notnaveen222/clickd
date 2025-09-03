"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Camera } from "lucide-react";
// adjust this path based on where this file lives relative to your page
import { layout } from "../page";

// ---------- utils ----------
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
function blobToFile(blob: Blob, filename: string): File {
  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now(),
  });
}
async function videoFrameToJpeg(
  video: HTMLVideoElement,
  opts: { maxEdge?: number; quality?: number; aspectRatio?: number | null } = {}
): Promise<Blob> {
  const { maxEdge = 2400, quality = 0.9, aspectRatio = null } = opts;
  const vw = video.videoWidth || 0;
  const vh = video.videoHeight || 0;
  if (vw === 0 || vh === 0) throw new Error("Video not ready");

  let targetW = vw,
    targetH = vh;
  const longEdge = Math.max(vw, vh);
  if (longEdge > maxEdge) {
    const scale = maxEdge / longEdge;
    targetW = Math.round(vw * scale);
    targetH = Math.round(vh * scale);
  }

  let outW = targetW,
    outH = targetH;
  if (aspectRatio && aspectRatio > 0) {
    if (targetW / targetH > aspectRatio) {
      outH = targetH;
      outW = Math.round(targetH * aspectRatio);
    } else {
      outW = targetW;
      outH = Math.round(targetW / aspectRatio);
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context missing");

  // center-crop to match output aspect if needed
  let sx = 0,
    sy = 0,
    sw = vw,
    sh = vh;
  if (aspectRatio && aspectRatio > 0) {
    const targetAR = outW / outH;
    const srcAR = vw / vh;
    if (srcAR > targetAR) {
      const newSW = Math.round(vh * targetAR);
      sx = Math.round((vw - newSW) / 2);
      sw = newSW;
    } else if (srcAR < targetAR) {
      const newSH = Math.round(vw / targetAR);
      sy = Math.round((vh - newSH) / 2);
      sh = newSH;
    }
  }

  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, outW, outH);
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", quality)
  );
  return blob;
}

// ---------- camera hook ----------
function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const facingRef = useRef<MediaTrackConstraints["facingMode"]>("environment");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const start = useCallback(async () => {
    setError(null);
    setReady(false);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }

      const constraints: MediaStreamConstraints = {
        video: { facingMode: facingRef.current || "environment" },
        audio: false,
      };

      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        facingRef.current = "user";
      }

      streamRef.current = stream;
      if (videoRef.current) {
        const v = videoRef.current;
        v.srcObject = stream;
        v.muted = true;
        v.playsInline = true;

        await new Promise<void>((resolve) => {
          if (v.readyState >= 1) return resolve();
          const onLoaded = () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            resolve();
          };
          v.addEventListener("loadedmetadata", onLoaded, { once: true });
        });

        try {
          await v.play();
          setReady(true);
        } catch (err: unknown) {
          // Safari can throw AbortError if play() is called too early
          if (err instanceof DOMException && err.name === "AbortError") {
            v.srcObject = null;
            v.srcObject = stream;
            await v.play();
            setReady(true);
          } else {
            throw err;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setError(
        "Unable to access camera. Check browser permissions or use Upload instead."
      );
    }
  }, []);

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setReady(false);
  }, []);

  const switchFacing = useCallback(async () => {
    facingRef.current =
      facingRef.current === "environment" ? "user" : "environment";
    await start();
  }, [start]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return {
    videoRef,
    start,
    stop,
    switchFacing,
    ready,
    error,
    facing: facingRef.current,
  };
}

// ---------- TakePhotosPane (exported) ----------
export default function TakePhotosPane({
  selectedLayout,
  quantity,
  photos,
  setPhotos,
  captureIntervalMs = 5000,
  aspectRatio = null, // e.g. 1 for square; null keeps original
}: {
  selectedLayout: layout;
  quantity: number;
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  captureIntervalMs?: number;
  aspectRatio?: number | null;
}) {
  const { videoRef, start, stop, switchFacing, ready, error, facing } =
    useCamera();
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdownSec, setCountdownSec] = useState<number | null>(null);

  const runIdRef = useRef<number>(0);
  const countdownCancelRef = useRef<boolean>(false);
  const photosCountRef = useRef<number>(photos.length);
  useEffect(() => {
    photosCountRef.current = photos.length;
  }, [photos.length]);

  const targetTotal = useMemo(
    () => (selectedLayout?.photos || 0) * Math.max(1, quantity || 1),
    [selectedLayout, quantity]
  );

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const captureOne = useCallback(async () => {
    const video = videoRef.current;
    if (!video) throw new Error("Video element missing");
    const blob = await videoFrameToJpeg(video, {
      maxEdge: 2400,
      quality: 0.9,
      aspectRatio,
    });
    const stamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .replace("Z", "");
    return blobToFile(blob, `camera_${stamp}.jpg`);
  }, [videoRef, aspectRatio]);

  const startAutoCapture = useCallback(async () => {
    if (!ready) return;
    const capTotal = targetTotal;
    if (capTotal - photosCountRef.current <= 0) return;

    setIsCapturing(true);
    const myRun = Date.now();
    runIdRef.current = myRun;
    countdownCancelRef.current = false;

    const secsPerShot = Math.max(1, Math.round(captureIntervalMs / 1000));

    while (runIdRef.current === myRun && !countdownCancelRef.current) {
      const toGo = Math.max(capTotal - photosCountRef.current, 0);
      if (toGo <= 0) break;

      // countdown first
      for (let s = secsPerShot; s > 0; s--) {
        if (runIdRef.current !== myRun || countdownCancelRef.current) break;
        setCountdownSec(s);
        await sleep(1000);
      }
      setCountdownSec(null);
      if (runIdRef.current !== myRun || countdownCancelRef.current) break;

      // capture one
      try {
        const file = await captureOne();
        setPhotos((prev) => {
          if (prev.length >= capTotal) return prev;
          return [...prev, file];
        });
        photosCountRef.current += 1;
      } catch (e) {
        console.error("Capture failed", e);
      }
    }

    setCountdownSec(null);
    setIsCapturing(false);
  }, [ready, captureIntervalMs, captureOne, setPhotos, targetTotal]);

  const stopAutoCapture = useCallback(() => {
    countdownCancelRef.current = true;
    runIdRef.current = 0;
    setCountdownSec(null);
    setIsCapturing(false);
  }, []);

  return (
    <div className="border border-gray-200 p-5 transition-all duration-200 rounded-xl shadow-md">
      <div className="flex items-center font-semibold text-xl mb-1 gap-x-2">
        <Camera className="text-brand-blue size-6" />
        <div>Take Photos</div>
      </div>
      <div className="text-gray-600 font-medium mb-4">
        We will auto-capture a photo every{" "}
        {Math.round(captureIntervalMs / 1000)} seconds until you reach{" "}
        {selectedLayout.photos} photo(s).
      </div>

      {/* Preview */}
      <div className="rounded-lg overflow-hidden bg-black relative">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className="w-full h-72 object-contain bg-black"
        />
        {isCapturing && countdownSec !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/20 text-white px-4 py-3 rounded-xl shadow-lg text-center">
              <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                Next photo in
              </div>
              <div className="text-3xl font-bold leading-none">
                {countdownSec}s
              </div>
              <div className="mt-2 w-40 h-1.5 bg-white/25 rounded">
                <div
                  className="h-1.5 bg-white rounded transition-all"
                  style={{
                    width: `${
                      ((Math.max(1, Math.round(captureIntervalMs / 1000)) -
                        countdownSec) /
                        Math.max(1, Math.round(captureIntervalMs / 1000))) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {!ready && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black/40">
            Initializing camera…
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-100 text-sm bg-red-500/70 px-4 text-center">
            {error}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <button
          type="button"
          className={`px-3 py-2 cursor-pointer rounded-lg font-semibold text-white ${
            isCapturing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand-blue hover:brightness-110"
          }`}
          disabled={!ready || isCapturing || targetTotal - photos.length <= 0}
          onClick={startAutoCapture}
        >
          {targetTotal - photos.length > 0
            ? `Start ( ${targetTotal - photos.length} to go )`
            : "All set"}
        </button>
        <button
          type="button"
          className="px-3 cursor-pointer py-2 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50"
          onClick={stopAutoCapture}
          disabled={!isCapturing}
        >
          Stop
        </button>
        <button
          type="button"
          className="px-3 py-2 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50"
          onClick={switchFacing}
          disabled={!ready}
        >
          Switch Camera ({facing === "environment" ? "Rear" : "Front"})
        </button>
        <div className="text-sm text-gray-600 ml-auto">
          Captured {photos.length}/{targetTotal}
        </div>
      </div>
    </div>
  );
}
