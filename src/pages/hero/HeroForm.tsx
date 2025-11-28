// // HeroForm.tsx
// import { useState } from "react";
// import { toast } from "react-toastify";
// import HeroTextFields from "./HeroTextFields";
// import HeroBadges from "./HeroBadges";
// import HeroCTAs from "./HeroCTAs";
// import HeroImageUpload from "./HeroImageUpload";

// export type HeroData = {
//   liveBadge: { enabled: boolean; text: string };
//   headline: string;
//   gradientHeadline: string;
//   subheadline: string;
//   primaryCTA: { text: string; link: string };
//   secondaryCTA: { text: string; link: string };
//   saleBadge: { enabled: boolean; text: string };
//   backgroundImage: string;
// };

// type Props = {
//   initial?: Partial<HeroData>;
//   onSubmit: (data: FormData) => Promise<void>;
// };

// export default function HeroForm({ initial = {}, onSubmit }: Props) {
//   // ===== STATES =====

//   const [liveBadge, setLiveBadge] = useState(
//     initial.liveBadge || { enabled: true, text: "Winter Sale Coming Soon!" }
//   );

//   const [headline, setHeadline] = useState(initial.headline || "");
//   const [gradientHeadline, setGradientHeadline] = useState(
//     initial.gradientHeadline || ""
//   );
//   const [subheadline, setSubheadline] = useState(initial.subheadline || "");

//   const [primaryCTA, setPrimaryCTA] = useState(
//     initial.primaryCTA || { text: "Shop Now", link: "/" }
//   );
//   const [secondaryCTA, setSecondaryCTA] = useState(
//     initial.secondaryCTA || { text: "View Offers", link: "/" }
//   );

//   const [saleBadge, setSaleBadge] = useState(
//     initial.saleBadge || { enabled: false, text: "Coming Soon" }
//   );

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState(initial.backgroundImage || "");

//   // ===== SUBMIT HANDLER =====

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!headline.trim()) return toast.error("Headline is required");

//     const fd = new FormData();

//     fd.append("liveBadge", JSON.stringify(liveBadge));
//     fd.append("headline", headline);
//     fd.append("gradientHeadline", gradientHeadline);
//     fd.append("subheadline", subheadline);
//     fd.append("primaryCTA", JSON.stringify(primaryCTA));
//     fd.append("secondaryCTA", JSON.stringify(secondaryCTA));
//     fd.append("saleBadge", JSON.stringify(saleBadge));

//     if (imageFile) fd.append("backgroundImage", imageFile);

//     await onSubmit(fd);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-10 pb-20">
//       {/* TEXT INPUTS */}
//       <HeroTextFields
//         headline={headline}
//         setHeadline={setHeadline}
//         gradientHeadline={gradientHeadline}
//         setGradientHeadline={setGradientHeadline}
//         subheadline={subheadline}
//         setSubheadline={setSubheadline}
//       />

//       {/* BADGES */}
//       <HeroBadges
//         liveBadge={liveBadge}
//         setLiveBadge={setLiveBadge}
//         saleBadge={saleBadge}
//         setSaleBadge={setSaleBadge}
//       />

//       {/* CTAs */}
//       <HeroCTAs
//         primaryCTA={primaryCTA}
//         setPrimaryCTA={setPrimaryCTA}
//         secondaryCTA={secondaryCTA}
//         setSecondaryCTA={setSecondaryCTA}
//       />

//       {/* IMAGE UPLOAD */}
//       <HeroImageUpload
//         preview={preview}
//         setPreview={setPreview}
//         setImageFile={setImageFile}
//       />

//       {/* SAVE BUTTON - STICKY ON MOBILE */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t md:static md:border-0 md:p-0">
//         <button
//           type="submit"
//           className="w-full py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-900 transition"
//         >
//           Save Hero Section
//         </button>
//       </div>
//     </form>
//   );
// }
/////////////////////// ReDeign
// src/components/hero/HeroForm.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import HeroTextFields from "./HeroTextFields";
import HeroBadges from "./HeroBadges";
import HeroCTAs from "./HeroCTAs";
import HeroImageUpload from "./HeroImageUpload";
import { Save } from "lucide-react";

export type HeroData = {
  liveBadge: { enabled: boolean; text: string };
  headline: string;
  gradientHeadline: string;
  subheadline: string;
  primaryCTA: { text: string; link: string };
  secondaryCTA: { text: string; link: string };
  saleBadge: { enabled: boolean; text: string };
  backgroundImage: string;
};

type Props = {
  initial?: Partial<HeroData>;
  onSubmit: (data: FormData) => Promise<void>;
};

export default function HeroForm({ initial = {}, onSubmit }: Props) {
  const [liveBadge, setLiveBadge] = useState(
    initial.liveBadge || { enabled: true, text: "LIVE SALE" }
  );
  const [headline, setHeadline] = useState(initial.headline || "");
  const [gradientHeadline, setGradientHeadline] = useState(
    initial.gradientHeadline || ""
  );
  const [subheadline, setSubheadline] = useState(initial.subheadline || "");
  const [primaryCTA, setPrimaryCTA] = useState(
    initial.primaryCTA || { text: "Shop Now", link: "/" }
  );
  const [secondaryCTA, setSecondaryCTA] = useState(
    initial.secondaryCTA || { text: "View Offers", link: "/" }
  );
  const [saleBadge, setSaleBadge] = useState(
    initial.saleBadge || { enabled: false, text: "Up to 70% Off" }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initial.backgroundImage || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) return toast.error("Headline is required");

    const fd = new FormData();
    fd.append("liveBadge", JSON.stringify(liveBadge));
    fd.append("headline", headline);
    fd.append("gradientHeadline", gradientHeadline);
    fd.append("subheadline", subheadline);
    fd.append("primaryCTA", JSON.stringify(primaryCTA));
    fd.append("secondaryCTA", JSON.stringify(secondaryCTA));
    fd.append("saleBadge", JSON.stringify(saleBadge));
    if (imageFile) fd.append("backgroundImage", imageFile);

    await onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <HeroTextFields
        headline={headline}
        setHeadline={setHeadline}
        gradientHeadline={gradientHeadline}
        setGradientHeadline={setGradientHeadline}
        subheadline={subheadline}
        setSubheadline={setSubheadline}
      />

      <HeroBadges
        liveBadge={liveBadge}
        setLiveBadge={setLiveBadge}
        saleBadge={saleBadge}
        setSaleBadge={setSaleBadge}
      />

      <HeroCTAs
        primaryCTA={primaryCTA}
        setPrimaryCTA={setPrimaryCTA}
        secondaryCTA={secondaryCTA}
        setSecondaryCTA={setSecondaryCTA}
      />

      <HeroImageUpload
        preview={preview}
        setPreview={setPreview}
        setImageFile={setImageFile}
      />

      {/* Premium Sticky Save Button */}
      <div className="sticky bottom-0 left-0 right-0 -mx-8 -mb-8 bg-linear-to-r from-blue-600 to-purple-600 p-6 shadow-2xl">
        <button
          type="submit"
          className="w-full max-w-2xl mx-auto py-5 bg-white text-black text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <Save className="w-6 h-6" />
          Save Hero Section
        </button>
      </div>
    </form>
  );
}
