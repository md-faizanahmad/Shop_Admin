import { useState } from "react";
import { Copy, MagnetIcon } from "lucide-react";
import { toast } from "react-toastify";

type Tone = "professional" | "friendly" | "concise" | "playful";

// function capitalize(s: string) {
//   return s.charAt(0).toUpperCase() + s.slice(1);
// }
function capitalize(s?: string) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sanitizeWords(input: string) {
  return input
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/** small synonyms / benefit verbs map to add variation */
const benefitVerbs: Record<string, string> = {
  durable: "built to last",
  lightweight: "ultra-light for comfort",
  premium: "premium-grade materials",
  wireless: "wireless convenience",
  water: "water-resistant design",
  washable: "easy to clean",
  eco: "eco-friendly materials",
  portable: "portable & travel-ready",
  fast: "high-performance speed",
  secure: "security-focused design",
};

function pickVerbForWord(word: string) {
  const key = word.toLowerCase();
  if (benefitVerbs[key]) return benefitVerbs[key];
  // fallback constructs
  if (key.length <= 2) return "";
  return `${key} optimized`;
}

/** generate short one-line description */
function generateShort(name: string, category: string, tone: Tone) {
  const t =
    tone === "professional"
      ? "Designed for"
      : tone === "friendly"
      ? "Perfect for"
      : tone === "concise"
      ? "Ideal for"
      : "Made for";

  const catPart = category ? `${category}` : "everyday use";
  return `${capitalize(name)} — ${t} ${catPart}.`;
}

/** generate long multi-sentence description */
function generateLong(
  name: string,
  category: string,
  hint: string,
  tone: Tone
) {
  const parts: string[] = [];
  const base = `${capitalize(name)} is a ${
    category || "product"
  } crafted to deliver great value.`;
  parts.push(base);

  const words = sanitizeWords(`${name} ${hint}`).slice(0, 6);
  const benefits = words
    .map((w) => pickVerbForWord(w))
    .filter(Boolean)
    .slice(0, 3);

  if (benefits.length) {
    parts.push(
      `Key benefits include ${benefits.join(", ")} that enhance the experience.`
    );
  } else {
    parts.push(
      "It combines thoughtful design and reliable performance to meet daily needs."
    );
  }

  // tone variations
  if (tone === "friendly") {
    parts.push(
      "Whether you're upgrading your setup or buying for the first time, it's easy to love."
    );
  } else if (tone === "playful") {
    parts.push("A joyful pick that brings convenience and a smile.");
  } else if (tone === "concise") {
    parts.push("Efficient, reliable, and value-focused.");
  } else {
    parts.push("Engineered with attention to detail and long-term durability.");
  }

  return parts.join(" ");
}

/** produce bullet features */
function generateBullets(name: string, hint: string, category: string) {
  const words = sanitizeWords(`${name} ${hint} ${category}`).slice(0, 8);
  const bullets = new Set<string>();

  // core features
  bullets.add("High quality construction for everyday use.");
  bullets.add("Thoughtful design that prioritizes user experience.");
  bullets.add("Easy to clean and maintain.");

  // produce dynamic bullets based on words
  words.forEach((w) => {
    const verb = pickVerbForWord(w);
    if (verb) bullets.add(`${capitalize(w)} — ${verb}.`);
  });

  // ensure exactly 5 bullets
  const arr = Array.from(bullets).slice(0, 5);
  while (arr.length < 5) arr.push("Reliable and backed by support.");

  return arr;
}

/** SEO keywords extraction (naive) */
function generateKeywords(name: string, category: string, hint: string) {
  const candidates = sanitizeWords(`${name} ${category} ${hint}`)
    .map((w) => w.toLowerCase())
    .filter((w) => w.length > 2);
  const unique = Array.from(new Set(candidates));
  return unique.slice(0, 8);
}

/** meta description (<= 160 chars) */
function generateMeta(shortDesc: string, longDesc: string) {
  const base = `${shortDesc} ${longDesc}`;
  if (base.length <= 150) return base;
  return base.substring(0, 147).trim() + "...";
}

export default function ProductDescriptionAI() {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const [tone, setTone] = useState<Tone>("professional");

  const [shortDesc, setShortDesc] = useState<string>("");
  const [longDesc, setLongDesc] = useState<string>("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [meta, setMeta] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = () => {
    if (!name.trim()) {
      toast.warn("Please provide a product name.");
      return;
    }
    setLoading(true);

    // simulate brief thinking delay for UX
    setTimeout(() => {
      const s = generateShort(name, category, tone);
      const l = generateLong(name, category, hint, tone);
      const b = generateBullets(name, hint, category);
      const k = generateKeywords(name, category, hint);
      const m = generateMeta(s, l);

      setShortDesc(s);
      setLongDesc(l);
      setBullets(b);
      setKeywords(k);
      setMeta(m);
      setLoading(false);
      toast.success("Generated product content — tweak as needed.");
    }, 250); // quick
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Unable to copy — please select and copy manually.");
    }
  };

  const handleCopyAll = async () => {
    const all = [
      `Short: ${shortDesc}`,
      `Long: ${longDesc}`,
      `Bullets:\n${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}`,
      `Keywords: ${keywords.join(", ")}`,
      `Meta: ${meta}`,
    ].join("\n\n");
    await handleCopy(all);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
      <div className="flex items-center gap-3 mb-4">
        <MagnetIcon className="w-5 h-5 text-black" />
        <h3 className="text-lg font-semibold">
          AI Product Description Generator
        </h3>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name (required)"
          className="p-2 border rounded"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="p-2 border rounded"
        />
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          className="p-2 border rounded"
        >
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="concise">Concise</option>
          <option value="playful">Playful</option>
        </select>
      </div>

      <textarea
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        placeholder="Short hint/keywords (optional) — e.g. 'waterproof, fast charging'"
        className="w-full p-2 border rounded mb-3"
        rows={2}
      />

      <div className="flex gap-2 items-center">
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? "Generating…" : "Generate"}
        </button>

        <button
          onClick={handleCopyAll}
          disabled={!shortDesc && !longDesc}
          className="px-3 py-2 border rounded hover:bg-gray-50"
        >
          <Copy className="w-4 h-4 inline-block mr-2" />
          Copy All
        </button>

        <span className="text-sm text-gray-500 ml-auto">
          Free — client-side only
        </span>
      </div>

      {/* Output */}
      {shortDesc && (
        <div className="mt-5 space-y-4">
          <Section
            title="Short Description"
            onCopy={() => handleCopy(shortDesc)}
            content={shortDesc}
          />

          <Section
            title="Long Description"
            onCopy={() => handleCopy(longDesc)}
            content={longDesc}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Bullet Features</h4>
              <button
                onClick={() => handleCopy(bullets.join("\n"))}
                className="text-sm text-blue-600 hover:underline"
              >
                Copy bullets
              </button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {bullets.map((b, idx) => (
                <li key={idx} className="text-sm text-gray-700">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">SEO Keywords</h4>
                <button
                  onClick={() => handleCopy(keywords.join(", "))}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Copy
                </button>
              </div>
              <div className="text-sm text-gray-700">{keywords.join(", ")}</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Meta Description</h4>
                <button
                  onClick={() => handleCopy(meta)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Copy
                </button>
              </div>
              <div className="text-sm text-gray-700">{meta}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** small section box */
function Section({
  title,
  onCopy,
  content,
}: {
  title: string;
  onCopy: () => void;
  content: string;
}) {
  return (
    <div className="bg-gray-50 p-3 rounded">
      <div className="flex items-start justify-between">
        <h4 className="font-semibold">{title}</h4>
        <button
          onClick={onCopy}
          className="text-sm text-blue-600 hover:underline"
        >
          Copy
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-800">{content}</div>
    </div>
  );
}
