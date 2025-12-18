// src/pages/AITools/AITools.tsx
import { Link } from "react-router-dom";
import { Wand2, Scissors } from "lucide-react";

export default function AITools() {
  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-800">AI Tools</h1>
        <p className="text-gray-600 text-sm">
          Enhance productivity with fast, free client-side generators &
          utilities.
        </p>
      </header>

      {/* Info Section */}
      <section className="bg-white p-5 rounded-xl shadow-md border">
        <h2 className="text-lg font-semibold mb-2">How These AI Tools Work?</h2>

        <ul className="text-gray-700 text-sm space-y-2 list-disc pl-5">
          <li>
            These tools run **fully client-side** or via **secure server
            proxy**.
          </li>
          <li>No external API keys are needed for description generation.</li>
          <li>
            Background remover uses your backend → remove.bg → returns safe
            output.
          </li>
          <li>
            All tools are optimized for free plans (Vercel, Cloudinary,
            remove.bg).
          </li>
          <li>Works smoothly on mobile & desktop.</li>
        </ul>

        <div className="mt-4 text-xs text-gray-500">
          Note: No personal data is stored. Everything stays inside your
          browser.
        </div>
      </section>

      {/* Tool Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Description AI */}
        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-full bg-blue-100">
              <Wand2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Product Description Generator
            </h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Generate SEO-friendly descriptions, bullet points and keyword sets
            instantly. 100% free & local.
          </p>

          <Link
            to="/dashboard/ai-tools/description"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Open Tool
          </Link>
        </div>

        {/* Remove Background AI */}
        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-full bg-green-100">
              <Scissors className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Background Remover (AI)
            </h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Remove image backgrounds with AI using remove.bg technology via
            backend proxy.
          </p>

          <Link
            to="/dashboard/ai-tools/remove-bg"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Open Tool
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-4 text-center text-xs text-gray-500">
        Designed for productivity • Runs on Browser & Vercel Serverless
      </footer>
    </div>
  );
}
