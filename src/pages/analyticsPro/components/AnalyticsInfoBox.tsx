// src/components/analytics/AnalyticsInfoAccordion.tsx

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

export default function AnalyticsInfoAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Header Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 rounded-2xl cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow">
            <Info className="w-6 h-6" />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Understanding Profit & Margin
          </h2>
        </div>

        <ChevronDown
          className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5 pt-0 space-y-6">
          {/* Profit Section */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              🟩 What is Profit?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>Profit = Selling Price – Cost Price</strong>
              <br />
              Profit shows how much money your store actually earns after
              product purchase cost.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-gray-700">
                Example: Buy for <strong>₹500</strong>, sell for{" "}
                <strong>₹800</strong> → Profit <strong>₹300</strong>.
              </p>
            </div>
          </section>

          {/* Margin Section */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              🟦 What is Profit Margin?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>
                Profit Margin (%) = (Profit / Selling Price) × 100
              </strong>
              <br />
              Margin shows what percentage of your selling price becomes profit.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-gray-700">
                Example: Profit <strong>₹300</strong> on selling price{" "}
                <strong>₹800</strong> → Margin <strong>37.5%</strong>.
              </p>
            </div>
          </section>

          {/* Differences Table */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🟧 Profit vs Margin (Simple Difference)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="p-3 border">Term</th>
                    <th className="p-3 border">Meaning</th>
                    <th className="p-3 border">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700 text-sm">
                    <td className="p-3 border font-medium">Profit</td>
                    <td className="p-3 border">Money earned after cost</td>
                    <td className="p-3 border">Shows actual income</td>
                  </tr>
                  <tr className="text-gray-700 text-sm">
                    <td className="p-3 border font-medium">Margin</td>
                    <td className="p-3 border">Profit percentage</td>
                    <td className="p-3 border">Shows pricing health</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Practical Examples */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🟨 Practical Cases
            </h3>

            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>
                <strong>High profit + High margin</strong> → Best products,
                strong earnings.
              </li>
              <li>
                <strong>High profit + Low margin</strong> → Good rupee earning,
                weak % gain.
              </li>
              <li>
                <strong>Low profit + High margin</strong> → Cheap item with good
                % return.
              </li>
              <li>
                <strong>Low profit + Low margin</strong> → Needs price
                correction ASAP.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
