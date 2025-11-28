import { Upload, X } from "lucide-react";

type Props = {
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ProductImages({
  setImageFiles,
  imagePreviews,
  setImagePreviews,
}: Props) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="bg-pink-700 text-white px-6 py-4 text-xl font-bold">
        Product Images
      </div>

      <div className="p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {imagePreviews.map((src, i) => (
          <div key={i} className="relative aspect-square rounded-xl border">
            <img src={src} className="w-full h-full object-cover" />

            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        ))}

        {imagePreviews.length < 8 && (
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-xs text-gray-500">Upload</p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
    </section>
  );
}
