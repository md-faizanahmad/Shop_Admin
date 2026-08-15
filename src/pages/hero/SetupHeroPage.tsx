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
//       .get(`${API_URL}/v1/hero`)
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
//       const res = await axios.put(`${API_URL}/v1/hero`, formData, {
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
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ArrowLeft, Sparkles, Save } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import HeroForm, { type HeroData } from "./HeroForm";
// import HeroLivePreview from "./HeroLivePreview";

// export default function SetupHeroPage() {
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [hero, setHero] = useState<HeroData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/v1/hero`)
//       .then((res) => {
//         setHero(res.data.hero || null);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Failed to load hero section");
//         setLoading(false);
//       });
//   }, [API_URL]);

//   const handleSubmit = async (formData: FormData) => {
//     try {
//       const res = await axios.put(`${API_URL}/v1/hero`, formData, {
//         withCredentials: true,
//       });
//       setHero(res.data.hero);
//       toast.success("Hero section updated successfully!");
//     } catch {
//       toast.error("Failed to save hero section");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-2xl font-light text-gray-500">Loading hero...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Premium Sticky Header */}
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100">
//         <div className="px-6 py-5">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="group flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all duration-300"
//             >
//               <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-sky-100 group-hover:text-sky-600 transition-all">
//                 <ArrowLeft className="w-6 h-6" />
//               </div>
//               <span className="font-semibold text-gray-700">
//                 Back to Dashboard
//               </span>
//             </button>

//             <div className="flex items-center gap-5">
//               <div className="p-3 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Hero Section Editor
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                   Design your homepage banner
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="px-6 py-10">
//         <div className="max-w-7xl mx-auto">
//           {/* Live Preview Card */}
//           <div className="mb-12">
//             <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//               <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-6 flex items-center gap-4">
//                 <Sparkles className="w-8 h-8" />
//                 <h2 className="text-2xl font-bold">Live Preview</h2>
//               </div>
//               <div className="p-8">
//                 <HeroLivePreview
//                   headline={hero?.headline || "Your Amazing Headline"}
//                   gradientHeadline={hero?.gradientHeadline || "Goes Here"}
//                   subheadline={
//                     hero?.subheadline || "Add a compelling subheadline"
//                   }
//                   liveBadge={
//                     hero?.liveBadge || { enabled: true, text: "LIVE SALE" }
//                   }
//                   saleBadge={hero?.saleBadge || { enabled: false, text: "" }}
//                   primaryCTA={
//                     hero?.primaryCTA || { text: "Shop Now", link: "/" }
//                   }
//                   secondaryCTA={
//                     hero?.secondaryCTA || { text: "Learn More", link: "/" }
//                   }
//                   backgroundImage={hero?.backgroundImage || ""}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Form Card */}
//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8">
//             <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
//               <div className="p-3 bg-linear-to-br from-blue-600 to-sky-600 rounded-2xl text-white shadow-lg">
//                 <Save className="w-6 h-6" />
//               </div>
//               Edit Hero Content
//             </h2>

//             <HeroForm initial={hero || undefined} onSubmit={handleSubmit} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/// update
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroForm from "./HeroForm";
import HeroLivePreview from "./HeroLivePreview";
import type { HeroData } from "@/types/heroformdata";
import { api } from "@/lib/api";

export default function SetupHeroPage() {
  const navigate = useNavigate();

  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    api
      .get("/v1/hero")
      .then((res) => {
        setHero(res.data.hero || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "[Hero GET error]",
          err?.response?.status,
          err?.response?.data,
        );
        toast.error("Failed to load hero section — try hard refresh");
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      const res = await api.put("/v1/hero", formData);
      setHero(res.data.hero);

      toast.success("Hero section updated successfully!");
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save hero section");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-lg font-medium text-slate-500">Loading hero…</div>
      </div>
    );
  }

  const previewProps = {
    headline: hero?.headline || "Your Amazing Headline",
    gradientHeadline: hero?.gradientHeadline || "Goes Here",
    subheadline: hero?.subheadline || "Add a compelling subheadline",
    liveBadge: hero?.liveBadge || { enabled: true, text: "LIVE SALE" },
    saleBadge: hero?.saleBadge || { enabled: false, text: "" },
    primaryCTA: hero?.primaryCTA || { text: "Shop Now", link: "/" },
    secondaryCTA: hero?.secondaryCTA || { text: "Learn More", link: "/" },
    backgroundImage: hero?.backgroundImage || "",
    mobileBackgroundImage: hero?.mobileBackgroundImage || "",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="text-right">
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
              Hero Section (under maintaince)
            </h1>
            <p className="text-xs text-slate-500">
              Preview and edit your homepage hero
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Compact preview card */}
        <section>
          <div
            className="w-full max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden cursor-pointer group"
            onClick={() => setIsPreviewOpen(true)}
          >
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50/70">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Hero Preview
                </p>
                <p className="text-xs text-slate-500">Tap to view fullscreen</p>
              </div>
              <button
                type="button"
                className="text-xs font-medium text-slate-600 border border-slate-200 rounded-full px-3 py-1 group-hover:border-slate-400"
              >
                Open preview
              </button>
            </div>

            <div className="p-3 sm:p-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900">
                <HeroLivePreview {...previewProps} />
                <div className="pointer-events-none absolute bottom-2 right-2 text-[10px] sm:text-xs bg-black/60 text-white px-2 py-1 rounded-full">
                  Click to expand
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick edit button (optional second entrypoint) */}
        <section className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300"
          >
            <Pencil className="w-4 h-4" />
            Edit Hero Content
          </button>
        </section>
      </main>

      {/* Fullscreen Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-3 sm:px-6">
          <div className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden bg-black shadow-2xl">
            {/* Close */}
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-3 right-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Edit */}
            <button
              type="button"
              onClick={() => {
                setIsPreviewOpen(false);
                setIsEditOpen(true);
              }}
              className="absolute top-3 left-3 z-20 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white border border-white/30 hover:bg-white/20"
            >
              <Pencil className="w-3 h-3" />
              Edit Hero
            </button>

            {/* Preview */}
            <div className="w-full h-full">
              <HeroLivePreview {...previewProps} />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal with HeroForm */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-3 sm:px-6">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4 pr-10">
              <h2 className="text-lg font-semibold text-slate-900">
                Edit Hero Content
              </h2>
              <p className="text-xs text-slate-500">
                Update text, badges, CTAs and background image.
              </p>
            </div>

            <HeroForm initial={hero || undefined} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
