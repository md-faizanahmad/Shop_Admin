// src/components/analytics/InsightCard.tsx
export default function InsightCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
      <div className={color}>{icon}</div>
      <p className="text-4xl font-bold mt-4">{value}</p>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
}
