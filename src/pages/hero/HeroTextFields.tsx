// HeroTextFields.tsx
type Props = {
  headline: string;
  setHeadline: (v: string) => void;
  gradientHeadline: string;
  setGradientHeadline: (v: string) => void;
  subheadline: string;
  setSubheadline: (v: string) => void;
};

export default function HeroTextFields({
  headline,
  setHeadline,
  gradientHeadline,
  setGradientHeadline,
  subheadline,
  setSubheadline,
}: Props) {
  return (
    <section className="bg-white shadow-sm rounded-2xl border p-6 space-y-6">
      <h2 className="text-xl font-bold">Hero Section Text</h2>

      {/* Headline */}
      <div className="space-y-2">
        <label className="font-medium text-gray-800">Headline *</label>
        <input
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Elevate Your Style"
        />
      </div>

      {/* Gradient Headline */}
      <div className="space-y-2">
        <label className="font-medium text-gray-800">Gradient Headline</label>
        <input
          value={gradientHeadline}
          onChange={(e) => setGradientHeadline(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="Without Breaking the Bank"
        />
      </div>

      {/* Subheadline */}
      <div className="space-y-2">
        <label className="font-medium text-gray-800">Subheadline</label>
        <textarea
          value={subheadline}
          onChange={(e) => setSubheadline(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none resize-none"
          rows={3}
          placeholder="Free Shipping + EMI + Secure Checkout"
        />
      </div>
    </section>
  );
}
