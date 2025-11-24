import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Scissors } from "lucide-react";

export default function RemoveBgAI() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleProcess = async () => {
    if (!file) return toast.warn("Upload an image first.");

    setLoading(true);
    try {
      const base64 = await toBase64(file);

      const res = await axios.post(`${API_URL}/api/ai/remove-bg`, {
        imageBase64: base64,
      });

      setResult(res.data.image);
      toast.success("Background removed!");
    } catch {
      toast.error("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Scissors className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold">AI Background Remover</h3>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setFile(file);
          if (file) setPreview(URL.createObjectURL(file));
        }}
      />

      <div className="flex gap-4 mt-4">
        {preview && (
          <img
            src={preview}
            className="w-48 h-48 object-cover rounded border"
          />
        )}
        {result && (
          <img src={result} className="w-48 h-48 object-cover rounded border" />
        )}
      </div>

      <button
        onClick={handleProcess}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Remove Background"}
      </button>
    </div>
  );
}
