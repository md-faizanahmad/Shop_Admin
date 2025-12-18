import type { JSX } from "react";

export default function Row({
  icon,
  label,
  desc,
  btn,
  onClick,
}: {
  icon: JSX.Element;
  label: string;
  desc: string;
  btn: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3 items-center">
        {icon}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {label}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
        </div>
      </div>
      <button onClick={onClick} className="text-sm px-4 py-2 rounded-xl border">
        {btn}
      </button>
    </div>
  );
}
