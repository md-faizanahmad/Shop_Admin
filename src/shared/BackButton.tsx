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
      className="flex-1 py-5 rounded-2xl font-bold  transition"
    >
      {label}
    </button>
  );
}
