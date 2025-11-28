export default function LazyCard({
  title,
  price,
  icon,
  gradient,
  popular,
}: any) {
  return (
    <div
      className={`relative p-8 rounded-3xl bg-white border-2 ${
        popular
          ? "border-orange-400 shadow-2xl shadow-orange-400/20"
          : "border-gray-200"
      } transition hover:scale-105`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          MOST POPULAR
        </div>
      )}
      <div
        className={`w-16 h-16 mx-auto mb-5 bg-linear-to-br ${gradient} rounded-2xl flex items-center justify-center text-white shadow-xl`}
      >
        {icon}
      </div>
      <h4 className="text-lg font-bold text-center mb-3">{title}</h4>
      <p className="text-4xl font-bold text-center text-gray-900 mb-6">
        {price}
      </p>
      <button className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition">
        Use This
      </button>
    </div>
  );
}
