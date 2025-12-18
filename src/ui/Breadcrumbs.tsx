import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string; // if no href → it's the current page (active)
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center text-2xl mb-4 text-slate-600">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {/* Link or Active Item */}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-slate-600 hover:text-slate-900 font-medium transition"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-slate-900 font-semibold">{item.label}</span>
            )}

            {/* Separator */}
            {!isLast && (
              <ChevronRight className="mx-2 text-slate-400" size={16} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
