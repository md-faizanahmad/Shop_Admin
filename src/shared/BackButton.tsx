export default function BackButton({
  onClick,
  label = "Back",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-5 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50 transition"
    >
      {label}
    </button>
  );
}
