// HeroImageUpload.tsx
import { Upload } from "lucide-react";

type Props = {
  preview: string;
  setPreview: (v: string) => void;
  setImageFile: (v: File | null) => void;

  mobilePreview: string;
  setMobilePreview: (v: string) => void;
  setMobileImageFile: (v: File | null) => void;
};

export default function HeroImageUpload({
  preview,
  setPreview,
  setImageFile,

  mobilePreview,
  setMobilePreview,
  setMobileImageFile,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMobileImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setMobilePreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <>
      <section className="bg-white shadow-sm rounded-2xl border p-6 space-y-6">
        <h2 className="text-xl font-bold">Background Image</h2>

        {/* PREVIEW */}
        <div className="w-full">
          {preview ? (
            <img
              src={preview}
              className="w-full max-h-72 rounded-xl object-cover shadow"
            />
          ) : (
            <div className="w-full h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
              No image selected
            </div>
          )}
        </div>

        {/* UPLOAD BUTTON */}
        <label className="cursor-pointer flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl w-fit">
          <Upload className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </section>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Mobile Image</h3>
          <p className="text-xs text-slate-500">Used on mobile screens.</p>
        </div>

        <div className="w-full">
          {mobilePreview ? (
            <img
              src={mobilePreview}
              alt="Mobile hero preview"
              className="w-full max-h-72 rounded-xl object-cover shadow"
            />
          ) : (
            <div className="w-full h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
              No mobile image selected
            </div>
          )}
        </div>

        <label className="cursor-pointer flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl w-fit">
          <Upload className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Upload Mobile Image</span>

          <input
            type="file"
            accept="image/*"
            onChange={handleMobileChange}
            className="hidden"
          />
        </label>
      </div>
    </>
  );
}
