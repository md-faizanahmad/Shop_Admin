// src/components/products/StepFinish.tsx
import BackButton from "@/shared/BackButton";
import LazyCard from "@/shared/LazyCard";
import StepWrapper from "@/shared/StepWrapper";
import { motion } from "framer-motion";
import { Sparkles, Zap, FileText, Tag, Package } from "lucide-react";

type Props = {
  onSubmit: (data: FormData) => Promise<void>; // <-- Now accepts FormData
  loading: boolean;
  onBack: () => void;
};

export default function StepFinish({ onSubmit, loading, onBack }: Props) {
  const handlePublish = () => {
    const formData = new FormData();
    // You can pre-fill with defaults or saved draft here
    formData.append("name", "Quick Product");
    formData.append("price", "999");
    formData.append("stock", "100");
    // Add more defaults if you want

    onSubmit(formData);
  };

  return (
    <StepWrapper
      title="Ready to launch?"
      icon={<Sparkles className="w-8 h-8 text-yellow-500" />}
    >
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-40 h-40 mx-auto bg-linear-to-br from-blue-500 to-sky-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8"
        >
          <Package className="w-20 h-20 text-white" />
        </motion.div>

        <h2 className="text-4xl font-bold mb-4">Your product is ready!</h2>
        <p className="text-xl text-gray-600 mb-12">
          Skip the boring parts and publish instantly
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <LazyCard
            title="Auto-fill highlights & specs"
            price="₹29"
            icon={<FileText />}
            gradient="from-emerald-500 to-teal-500"
          />
          <LazyCard
            title="AI SEO description"
            price="₹39"
            icon={<Tag />}
            gradient="from-purple-500 to-pink-500"
          />
          <LazyCard
            title="Do everything + publish now"
            price="₹99"
            icon={<Zap />}
            gradient="from-orange-500 to-red-500"
            popular
          />
        </div>

        <div className="flex gap-6 justify-center">
          <BackButton onClick={onBack} label="Back to Photos" />
          <button
            onClick={handlePublish}
            disabled={loading}
            className="px-12 py-6 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-blue-600/50 transform hover:-translate-y-1 transition flex items-center gap-4"
          >
            {loading ? "Publishing..." : "Publish Product Now — Free"}
          </button>
        </div>
      </div>
    </StepWrapper>
  );
}
