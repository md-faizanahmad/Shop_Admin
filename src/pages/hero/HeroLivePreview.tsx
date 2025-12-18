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
    <div className="relative w-full h-full aspect-video rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-slate-900">
      {/* Background */}
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-sky-600 to-sky-900 flex items-center justify-center text-white/80 text-2xl sm:text-3xl font-semibold">
          Your Hero Background
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        {liveBadge.enabled && liveBadge.text && (
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-white border border-white/30 backdrop-blur">
            {liveBadge.text}
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-xl">
          {headline}
          {gradientHeadline && (
            <span className="block bg-linear-to-r from-pink-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent mt-1">
              {gradientHeadline}
            </span>
          )}
        </h1>

        {subheadline && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/85 max-w-xl sm:max-w-2xl mx-auto drop-shadow">
            {subheadline}
          </p>
        )}

        <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button className="inline-flex items-center justify-center rounded-2xl bg-white px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-md hover:shadow-lg hover:-translate-y-px transition">
            {primaryCTA.text}
          </button>
          <button className="inline-flex items-center justify-center rounded-2xl border border-white/60 bg-white/10 px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition">
            {secondaryCTA.text}
          </button>
        </div>

        {saleBadge.enabled && saleBadge.text && (
          <div className="mt-4 sm:mt-5 inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-red-500 px-4 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-white shadow-lg">
            {saleBadge.text}
          </div>
        )}
      </div>
    </div>
  );
}
