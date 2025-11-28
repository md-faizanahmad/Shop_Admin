// type Props = {
//   price: string;
//   setPrice: (v: string) => void;
//   discountPrice: string;
//   setDiscountPrice: (v: string) => void;
//   stock: string;
//   setStock: (v: string) => void;
//   isDiscountInvalid: boolean;
//   savingsAmount: number;
//   savingsPercent: number;
// };

// export default function ProductPricing({
//   price,
//   setPrice,
//   discountPrice,
//   setDiscountPrice,
//   stock,
//   setStock,
//   isDiscountInvalid,
//   savingsAmount,
//   savingsPercent,
// }: Props) {
//   return (
//     <section className="bg-white rounded-2xl shadow border overflow-hidden">
//       <div className="bg-sky-700 text-white px-6 py-4 text-xl font-bold">
//         Pricing
//       </div>

//       <div className="p-6 grid sm:grid-cols-3 gap-5">
//         {/* PRICE */}
//         <div>
//           <label className="block mb-1 font-semibold">Price (₹) *</label>
//           <input
//             type="number"
//             min="0"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//         </div>

//         {/* DISCOUNT */}
//         <div>
//           <label className="block mb-1 font-semibold">Discount Price (₹)</label>
//           <input
//             type="number"
//             min="0"
//             value={discountPrice}
//             onChange={(e) => setDiscountPrice(e.target.value)}
//             className="w-full px-4 py-3 border rounded-xl"
//           />

//           {isDiscountInvalid && (
//             <p className="text-red-600 text-sm mt-1">
//               Discount must be lower than price & cannot be negative.
//             </p>
//           )}

//           {!isDiscountInvalid && Number(discountPrice) > 0 && (
//             <p className="text-green-600 text-sm mt-1 font-semibold">
//               You save ₹{savingsAmount} ({savingsPercent}%)
//             </p>
//           )}
//         </div>

//         {/* STOCK */}
//         <div>
//           <label className="block mb-1 font-semibold">Stock *</label>
//           <input
//             type="number"
//             min="0"
//             required
//             value={stock}
//             onChange={(e) => setStock(e.target.value)}
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
///////////////////////////////// update with cost price
type Props = {
  price: string;
  setPrice: (v: string) => void;

  costPrice: string;
  setCostPrice: (v: string) => void;

  discountPrice: string;
  setDiscountPrice: (v: string) => void;

  stock: string;
  setStock: (v: string) => void;

  isDiscountInvalid: boolean;
  savingsAmount: number;
  savingsPercent: number;

  unitProfit: number;
  margin: number;
};

export default function ProductPricing({
  price,
  setPrice,
  costPrice,
  setCostPrice,
  discountPrice,
  setDiscountPrice,
  stock,
  setStock,
  isDiscountInvalid,
  savingsAmount,
  savingsPercent,
  unitProfit,
  margin,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="bg-sky-700 text-white px-6 py-4 text-xl font-bold">
        Pricing & Cost Details
      </div>

      <div className="p-6 grid sm:grid-cols-3 gap-5">
        {/* COST PRICE */}
        <div>
          <label className="block mb-1 font-semibold">Cost Price (₹) *</label>
          <input
            type="number"
            min="0"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />
          {Number(costPrice) > 0 && (
            <p className="text-gray-600 text-sm mt-1">Base cost of product</p>
          )}
        </div>

        {/* SELLING PRICE */}
        <div>
          <label className="block mb-1 font-semibold">
            Selling Price (₹) *
          </label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        {/* DISCOUNT PRICE */}
        <div>
          <label className="block mb-1 font-semibold">Discount Price (₹)</label>
          <input
            type="number"
            min="0"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          {isDiscountInvalid && (
            <p className="text-red-600 text-sm mt-1">
              Discount must be lower than price & cannot be negative.
            </p>
          )}

          {!isDiscountInvalid && Number(discountPrice) > 0 && (
            <>
              <p className="text-green-600 text-sm mt-1 font-semibold">
                Customer saves ₹{savingsAmount} ({savingsPercent}%)
              </p>
            </>
          )}
        </div>

        {/* STOCK */}
        <div>
          <label className="block mb-1 font-semibold">Stock *</label>
          <input
            type="number"
            min="0"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>
      </div>

      {/* PROFIT & MARGIN BOX */}
      <div className="px-6 pb-6">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
          <h3 className="font-bold text-sky-800 mb-3">Profit Overview</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Cost Price</p>
              <p className="text-lg font-bold">₹{costPrice || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Selling Price</p>
              <p className="text-lg font-bold">₹{price || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit Profit</p>
              <p className="text-lg font-bold text-green-700">
                ₹{unitProfit > 0 ? unitProfit : 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Margin %</p>
              <p className="text-lg font-bold text-blue-700">
                {margin > 0 ? margin : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
