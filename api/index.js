// // index.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
// import serverless from "serverless-http";

// // Routes
// import adminRoutes from "./routes/adminRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// // Public Routes Import
// import userRoutes from "./routes/userRoutes.js";
// import wishlistRoutes from "./routes/wishlistRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

// // ENV
// dotenv.config();

// const app = express();

// // --- core middleware ---
// app.use(express.json({ limit: "10mb" }));
// app.use(cookieParser());

// // Vercel proxy - required for secure cookies
// app.set("trust proxy", 1);

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://myazstore.shop",
//       "https://admin.myazstore.shop",
//     ],
//     credentials: true,
//   })
// );

// // --- db connect ---
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ MONGO_URI missing in env");
// }
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// mongoose.connection.on("connected", () => {
//   console.log("Connected to DB:", mongoose.connection.name);
// });

// // Admin Routes
// app.use("/api/admin", adminRoutes);
// app.use("/api/ai", aiRoutes);

// // User and Public Routes
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/payment", paymentRoutes);

// // Payment

// ///Custom Backend For Api-
// app.get("/api", (_req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>MyAZStore API • Powered by Vercel</title>

//       <style>
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body {
//           font-family: "Poppins", Arial, sans-serif;
//           background: linear-gradient(135deg, #012a3f, #000000);
//           color: #f5f5f5;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//         }

//         .card {
//           width: 100%;
//           max-width: 640px;
//           background: rgba(255, 255, 255, 0.06);
//           border-radius: 20px;
//           padding: 32px;
//           backdrop-filter: blur(10px);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
//           animation: fadeIn 0.8s ease;
//         }

//         h1 {
//           font-size: 1.9rem;
//           margin-bottom: 10px;
//         }

//         p {
//           font-size: 1rem;
//           opacity: 0.9;
//           margin: 8px 0;
//         }

//         a {
//           color: #ffffff;
//           font-weight: 600;
//           text-decoration: underline;
//         }

//         .section {
//           margin-top: 24px;
//           background: rgba(255, 255, 255, 0.08);
//           padding: 16px 20px;
//           border-radius: 14px;
//         }

//         ul {
//           list-style: none;
//           margin-top: 8px;
//         }

//         li {
//           font-size: 0.95rem;
//           margin: 6px 0;
//         }

//         footer {
//           margin-top: 24px;
//           font-size: 0.85rem;
//           opacity: 0.8;
//           text-align: center;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @media (max-width: 480px) {
//           .card { padding: 22px; }
//           h1 { font-size: 1.6rem; }
//         }
//       </style>
//     </head>

//     <body>
//       <div class="card">
//         <h1>🚀 MyStore API</h1>
//         <p>Your eCommerce Admin backend is running successfully on <strong>Vercel Serverless</strong>.</p>

//         <p>
//           Admin Dashboard:
//           <br />

//           <ul>
//           <li>
//            Admin UI:
//           <a href="https://admin.myazstore.shop">admin.myazstore.shop</a>
//           </li>
//           <li>
//           Categories:
//          <a href="https://admin.myazstore.shop/api/categories">View</a>
//           </li>
//           <li>
//           Products:
//          <a href="https://admin.myazstore.shop/api/products">View</a>
//           </li>
//           </ul>
//         </p>

//         <div class="section">
//           <h3>🔐 Demo Credentials</h3>
//           <ul>
//             <li><strong>Email:</strong> admin@mystore.com</li>
//             <li><strong>Password:</strong></li>
//           </ul>
//         </div>

//         <div class="section">
//           <h3>⚙️ Technology Stack</h3>
//           <ul>
//             <li>🖥️ Vercel Serverless Functions (API Hosting)</li>
//             <li>🗄️ MongoDB Atlas — Free Tier</li>
//             <li>☁️ Cloudinary — Free Image Hosting</li>
//             <li>🔐 JWT Auth with HttpOnly Cookies</li>
//             <li>🚀 Node.js + Express.js</li>
//           </ul>
//         </div>

//         <div class="section">
//           <h3>⚠️ Usage Notice</h3>
//           <p>All services run on **free plans** (Vercel, MongoDB Atlas, Cloudinary).</p>
//           <p>Please upload optimized images (<strong>&lt;500KB</strong>) to avoid free-tier limits.</p>
//         </div>

//         <footer>
//           © ${new Date().getFullYear()} MyStore API • Built with ❤️ using JavaScript & Express.js
//         </footer>
//       </div>
//     </body>
//     </html>
//   `);
// });

// // --- server (local) vs serverless (vercel) ---
// const PORT = process.env.PORT || 3000;
// if (!process.env.VERCEL) {
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// }

// export const handler = serverless(app);
// export default app;
//////////////////////////////////////////////// New Index
// index.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
// import serverless from "serverless-http";

// // Routes
// import adminRoutes from "./routes/adminRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// // Public Routes
// import userRoutes from "./routes/userRoutes.js";
// import wishlistRoutes from "./routes/wishlistRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import invoiceRoutes from "./routes/invoiceRoutes.js";

// import { connectDB } from "./config/db.js";

// // Load ENV
// dotenv.config();

// const app = express();

// /* ======================================================
//    🔥 RAZORPAY WEBHOOK MUST USE RAW BODY
//    ====================================================== */
// app.use(
//   "/api/payment/verify",
//   express.raw({ type: "*/*" }) // Razorpay sends body as raw buffer
// );

// /* ======================================================
//    🚀 Standard Middleware
//    ====================================================== */

// // JSON body parser (AFTER webhook raw parser)
// app.use(express.json({ limit: "10mb" }));

// // Cookie parser
// app.use(cookieParser());

// // Required for Vercel secure cookies
// app.set("trust proxy", 1);

// // CORS setup
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://myazstore.shop",
//       "https://admin.myazstore.shop",
//     ],
//     credentials: true,
//   })
// );

// /* ======================================================
//    🗄  MongoDB Connection
//    ====================================================== */

// // const MONGO_URI = process.env.MONGO_URI;

// // if (!MONGO_URI) {
// //   console.error("❌ MONGO_URI missing in .env");
// // }

// // mongoose
// //   .connect(MONGO_URI)
// //   .then(() => console.log("✅ MongoDB connected"))
// //   .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// // mongoose.connection.on("connected", () => {
// //   console.log("Connected to DB:", mongoose.connection.name);
// // });

// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ success: false, message: "DB connect failed" });
//   }
// });

// /* ======================================================
//    📦 API Routes
//    ====================================================== */

// // Admin Routes
// app.use("/api/admin", adminRoutes);
// app.use("/api/ai", aiRoutes);

// // Public Routes
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/cart", cartRoutes);

// // Payment Routes (includes verify webhook)
// app.use("/api/payment", paymentRoutes);
// // InVoice Routes
// app.use("/api/orders", invoiceRoutes);
// /* ======================================================
//    📄 Custom API Home Page
//    ====================================================== */
// app.get("/api", (_req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>MyAZStore API • Powered by Vercel</title>

//       <style>
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body {
//           font-family: "Poppins", Arial, sans-serif;
//           background: linear-gradient(135deg, #012a3f, #000000);
//           color: #f5f5f5;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//         }

//         .card {
//           width: 100%;
//           max-width: 640px;
//           background: rgba(255, 255, 255, 0.06);
//           border-radius: 20px;
//           padding: 32px;
//           backdrop-filter: blur(10px);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
//           animation: fadeIn 0.8s ease;
//         }

//         h1 { font-size: 1.9rem; margin-bottom: 10px; }
//         p { font-size: 1rem; opacity: 0.9; margin: 8px 0; }
//         a { color: #ffffff; font-weight: 600; text-decoration: underline; }

//         .section {
//           margin-top: 24px;
//           background: rgba(255, 255, 255, 0.08);
//           padding: 16px 20px;
//           border-radius: 14px;
//         }

//         ul { list-style: none; margin-top: 8px; }
//         li { font-size: 0.95rem; margin: 6px 0; }

//         footer { margin-top: 24px; font-size: 0.85rem; opacity: 0.8; text-align: center; }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       </style>
//     </head>

//     <body>
//       <div class="card">
//         <h1>🚀 MyStore API</h1>
//         <p>Your eCommerce Admin backend is running successfully on <strong>Vercel Serverless</strong>.</p>

//         <div class="section">
//           <h3>🔗 Admin Panel</h3>
//           <ul>
//             <li><a href="https://admin.myazstore.shop">admin.myazstore.shop</a></li>
//             <li><a href="https://admin.myazstore.shop/api/categories">View Categories</a></li>
//             <li><a href="https://admin.myazstore.shop/api/products">View Products</a></li>
//           </ul>
//         </div>

//         <footer>
//           © ${new Date().getFullYear()} MyAZStore API • Built with ❤️ using Node.js & Express.js
//         </footer>
//       </div>
//     </body>
//     </html>
//   `);
// });

// /* ======================================================
//    🚀 Local Server vs Vercel Serverless
//    ====================================================== */
// const PORT = process.env.PORT || 3000;

// if (!process.env.VERCEL) {
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// }

// export const handler = serverless(app);
// export default app;
//////////////////////////////////////////////Optimaztied
// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import { connectDB } from "./config/db.js";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
// Load environment variables
dotenv.config();

const app = express();

/* ======================================================
   ⚡ Razorpay Webhook — RAW BODY REQUIRED
   ====================================================== */
app.use(
  "/api/payment/webhook",
  express.raw({ type: "*/*" }) // Razorpay sends raw buffer
);

/* ======================================================
   🧩 Standard Middleware
   ====================================================== */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// JSON body parser (important: after webhook raw parser)
app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());

// Trust Vercel reverse proxy to allow secure cookies
app.set("trust proxy", 1);

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://myazstore.shop",
      "https://admin.myazstore.shop",
    ],
    credentials: true,
  })
);

/* ======================================================
   🗄 MongoDB Persistent Connection (Vercel Safe)
   ====================================================== */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "DB connect failed" });
  }
});

/* ======================================================
   📦 API ROUTES
   ====================================================== */

// Admin
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
// app.use("/", adminRoutes);

// Public & User
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);

// Payment
app.use("/api/payment", paymentRoutes);

// Invoice download
app.use("/api/invoice", invoiceRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/checkout", checkoutRoutes);
/* ======================================================
   📄 Root API Preview Page (Browser Friendly)
   ====================================================== */
app.get("/api", (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MyAZStore API • Powered by Vercel</title>

      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #012a3f, #000000);
          padding: 40px;
          color: #fff;
          text-align: center;
        }
        .card {
          max-width: 600px;
          margin: auto;
          padding: 30px;
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          backdrop-filter: blur(12px);
        }
        h1 { font-size: 2rem; }
        a { color: #fff; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 MyAZStore API</h1>
        <p>Backend running on Vercel Serverless</p>

        <h3>Admin Panel</h3>
        <a href="https://admin.myazstore.shop">admin.myazstore.shop</a>
      </div>
    </body>
    </html>
  `);
});

/* ======================================================
   🖥 Local vs Vercel Serverless
   ====================================================== */
const PORT = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export const handler = serverless(app);
export default app;
