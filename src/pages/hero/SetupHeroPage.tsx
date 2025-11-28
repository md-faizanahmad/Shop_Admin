// // SetupHeroPage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import type { HeroData } from "./HeroForm";
// import HeroForm from "./HeroForm";
// import HeroLivePreview from "./HeroLivePreview";

// export default function SetupHeroPage() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [hero, setHero] = useState<HeroData | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch hero
//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/hero`)
//       .then((res) => {
//         setHero(res.data.hero || null);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Failed to load hero");
//         setLoading(false);
//       });
//   }, [API_URL]);

//   // Submit handler
//   const handleSubmit = async (formData: FormData) => {
//     try {
//       const res = await axios.put(`${API_URL}/api/hero`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Hero Section Updated!");
//       setHero(res.data.hero);
//     } catch {
//       toast.error("Failed to update hero");
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-60 text-gray-500">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="p-4 md:p-10 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-3 text-gray-900">
//         Setup Hero Section
//       </h1>
//       <p className="text-gray-600 mb-8">
//         Customize the homepage hero banner shown to customers.
//       </p>
//       {hero && (
//         <HeroLivePreview
//           headline={hero.headline || ""}
//           gradientHeadline={hero.gradientHeadline || ""}
//           subheadline={hero.subheadline || ""}
//           liveBadge={hero.liveBadge || { enabled: false, text: "" }}
//           saleBadge={hero.saleBadge || { enabled: false, text: "" }}
//           primaryCTA={hero.primaryCTA || { text: "", link: "/" }}
//           secondaryCTA={hero.secondaryCTA || { text: "", link: "/" }}
//           backgroundImage={hero.backgroundImage || ""}
//         />
//       )}

//       <div className="h-6" />
//       <HeroForm initial={hero || undefined} onSubmit={handleSubmit} />
//     </div>
//   );
// }
/////////////////////// ReDesign
// src/pages/SetupHeroPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft, Sparkles, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroForm, { type HeroData } from "./HeroForm";
import HeroLivePreview from "./HeroLivePreview";

export default function SetupHeroPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/hero`)
      .then((res) => {
        setHero(res.data.hero || null);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load hero section");
        setLoading(false);
      });
  }, [API_URL]);

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await axios.put(`${API_URL}/api/hero`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setHero(res.data.hero);
      toast.success("Hero section updated successfully!");
    } catch {
      toast.error("Failed to save hero section");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-light text-gray-500">Loading hero...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100">
        <div className="px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all duration-300"
            >
              <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-sky-100 group-hover:text-sky-600 transition-all">
                <ArrowLeft className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-700">
                Back to Dashboard
              </span>
            </button>

            <div className="flex items-center gap-5">
              <div className="p-3 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Hero Section Editor
                </h1>
                <p className="text-sm text-gray-500">
                  Design your homepage banner
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Live Preview Card */}
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-6 flex items-center gap-4">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Live Preview</h2>
              </div>
              <div className="p-8">
                <HeroLivePreview
                  headline={hero?.headline || "Your Amazing Headline"}
                  gradientHeadline={hero?.gradientHeadline || "Goes Here"}
                  subheadline={
                    hero?.subheadline || "Add a compelling subheadline"
                  }
                  liveBadge={
                    hero?.liveBadge || { enabled: true, text: "LIVE SALE" }
                  }
                  saleBadge={hero?.saleBadge || { enabled: false, text: "" }}
                  primaryCTA={
                    hero?.primaryCTA || { text: "Shop Now", link: "/" }
                  }
                  secondaryCTA={
                    hero?.secondaryCTA || { text: "Learn More", link: "/" }
                  }
                  backgroundImage={hero?.backgroundImage || ""}
                />
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-blue-600 to-sky-600 rounded-2xl text-white shadow-lg">
                <Save className="w-6 h-6" />
              </div>
              Edit Hero Content
            </h2>

            <HeroForm initial={hero || undefined} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
