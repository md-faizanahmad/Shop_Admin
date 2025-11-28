import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Scissors, Download, Trash2, Crop as CropIcon } from "lucide-react";
import Cropper, { type Area } from "react-easy-crop";

/*
  ⭐ NOTE:
  This is a demo version of the AI image editor.
  We can add more features anytime — such as:
  ✔ Auto-enhance
  ✔ AI upscaling (HD)
  ✔ Shadows & reflections
  ✔ Background replace
  ✔ WebP compression
  ✔ Drag & drop uploader
  ✔ Color correction
  Just tell me what you want.
*/

export default function RemoveBgAI() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Cropper states (strictly typed)
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Convert file → Base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve(
          (reader.result as string).replace(/^data:image\/\w+;base64,/, "")
        );
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // When cropping stops, store pixel area
  const onCropComplete = useCallback(
    (_: Area, croppedPixels: Area) => setCroppedAreaPixels(croppedPixels),
    []
  );

  // Generate cropped image using canvas
  const applyCrop = async () => {
    if (!preview || !croppedAreaPixels) return;

    const image = new Image();
    image.src = preview;

    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const croppedUrl = canvas.toDataURL("image/png");

    setPreview(croppedUrl);
    setCropping(false);
    toast.success("Image cropped!");
  };

  // Remove Background
  const handleProcess = async () => {
    if (!preview) return toast.warn("Upload or crop an image first.");

    setLoading(true);
    try {
      // If preview is base64 (cropped), convert to file
      let imageFile: File = file as File;

      if (!file && preview.startsWith("data:image")) {
        const res = await fetch(preview);
        const blob = await res.blob();
        imageFile = new File([blob], "cropped.png", { type: blob.type });
      }

      const base64 = await toBase64(imageFile);

      const res = await axios.post(`${API_URL}/api/ai/remove-bg`, {
        imageBase64: base64,
      });

      setResult(res.data.image);
      toast.success("Background removed!");
    } catch {
      toast.error("Processing failed.");
    } finally {
      setLoading(false);
    }
  };

  // Download final image
  const handleDownload = () => {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result;
    link.download = "processed-image.png";
    link.click();
  };

  // Reset tool
  const resetAll = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setCropping(false);
    setCroppedAreaPixels(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-2">
        <Scissors className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-lg">AI Image Background Remover</h3>
      </div>

      {/* NOTE */}
      <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md border">
        ⭐ This is a demo version — more AI features can be added anytime based
        on your requirements.
      </p>

      {/* UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const newFile = e.target.files?.[0] ?? null;
          setFile(newFile);
          if (newFile) {
            setPreview(URL.createObjectURL(newFile));
            setResult(null);
          }
        }}
        className="block w-full text-sm border rounded-lg p-2"
      />

      {/* IMAGES */}
      <div className="flex flex-wrap gap-6 mt-4 justify-center">
        {preview && (
          <div>
            <p className="text-sm font-semibold mb-1">Original</p>
            <img
              src={preview}
              className="w-48 h-48 object-cover rounded shadow border"
            />
          </div>
        )}

        {result && (
          <div>
            <p className="text-sm font-semibold mb-1">Processed</p>
            <img
              src={result}
              className="w-48 h-48 object-cover rounded shadow border"
            />
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setCropping(true)}
          disabled={!preview}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <CropIcon className="w-4 h-4" /> Crop
        </button>

        <button
          onClick={handleProcess}
          disabled={!preview || loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Remove Background"}
        </button>

        <button
          onClick={handleDownload}
          disabled={!result}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <Download className="w-4 h-4" /> Download
        </button>

        <button
          onClick={resetAll}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* CROPPER MODAL */}
      {cropping && preview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-md space-y-4">
            <h3 className="font-semibold text-lg">Crop Image</h3>

            <div className="relative w-full h-64 bg-black/10 rounded-xl overflow-hidden">
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCropping(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={applyCrop}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
