// src/components/hero/HeroLivePreview.tsx
type Badge = { enabled: boolean; text: string };
type CTA = { text: string; link: string };

type Props = {
  headline: string;
  gradientHeadline: string;
  subheadline: string;
  liveBadge: Badge;
  saleBadge: Badge;
  primaryCTA: CTA;
  secondaryCTA: CTA;
  backgroundImage: string;
};

export default function HeroLivePreview({
  headline,
  gradientHeadline,
  subheadline,
  liveBadge,
  saleBadge,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
}: Props) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-linear-to-br from-purple-600 to-pink-600 h-96 flex items-center justify-center text-white/80 text-4xl font-bold">
          Your Hero Background
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        {liveBadge.enabled && (
          <div className="mb-6 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm tracking-wider border border-white/30">
            {liveBadge.text}
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">
          {headline}
          {gradientHeadline && (
            <span className="block bg-linear-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              {gradientHeadline}
            </span>
          )}
        </h1>

        {subheadline && (
          <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow-lg">
            {subheadline}
          </p>
        )}

        <div className="flex gap-6 mt-10">
          <button className="px-10 py-5 bg-white text-black font-bold rounded-2xl shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition">
            {primaryCTA.text}
          </button>
          <button className="px-10 py-5 bg-white/20 backdrop-blur-md text-white border-2 border-white/50 font-bold rounded-2xl hover:bg-white/30 transition">
            {secondaryCTA.text}
          </button>
        </div>

        {saleBadge.enabled && (
          <div className="mt-8 px-8 py-3 bg-linear-to-r from-orange-500 to-red-600 text-white font-bold rounded-full shadow-2xl">
            {saleBadge.text}
          </div>
        )}
      </div>
    </div>
  );
}
