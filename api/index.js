// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import serverless from "serverless-http";

import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

const app = express();

// --- core middleware ---
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.set("trust proxy", 1); // Vercel proxy - required for secure cookies

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mystore-admin-xi.vercel.app", // your FE live domain (change if different)
    ],
    credentials: true,
  })
);

// --- db connect ---
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI missing in env");
}
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// --- routes base ---
app.use("/mystoreapi/admin", adminRoutes);
app.use("/mystoreapi/categories", categoryRoutes);
app.use("/mystoreapi/products", productRoutes);
app.use("/mystoreapi/orders", orderRoutes);

///Custom Backend For Api-
app.get("/mystoreapi", (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MyStore API • Powered by Vercel</title>

      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: "Poppins", Arial, sans-serif;
          background: linear-gradient(135deg, #012a3f, #000000);
          color: #f5f5f5;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .card {
          width: 100%;
          max-width: 640px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          animation: fadeIn 0.8s ease;
        }

        h1 {
          font-size: 1.9rem;
          margin-bottom: 10px;
        }

        p {
          font-size: 1rem;
          opacity: 0.9;
          margin: 8px 0;
        }

        a {
          color: #ffffff;
          font-weight: 600;
          text-decoration: underline;
        }

        .section {
          margin-top: 24px;
          background: rgba(255, 255, 255, 0.08);
          padding: 16px 20px;
          border-radius: 14px;
        }

        ul {
          list-style: none;
          margin-top: 8px;
        }

        li {
          font-size: 0.95rem;
          margin: 6px 0;
        }

        footer {
          margin-top: 24px;
          font-size: 0.85rem;
          opacity: 0.8;
          text-align: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .card { padding: 22px; }
          h1 { font-size: 1.6rem; }
        }
      </style>
    </head>

    <body>
      <div class="card">
        <h1>🚀 MyStore API</h1>
        <p>Your eCommerce Admin backend is running successfully on <strong>Vercel Serverless</strong>.</p>

        <p>
          Admin Dashboard:  
          <br />
          <a href="https://mystore-admin-xi.vercel.app" target="_blank">
            https://mystore-admin-xi.vercel.app
          </a>
        </p>

        <div class="section">
          <h3>🔐 Demo Credentials</h3>
          <ul>
            <li><strong>Email:</strong> admin@mystore.com</li>
            <li><strong>Password:</strong> admin123</li>
          </ul>
        </div>

        <div class="section">
          <h3>⚙️ Technology Stack</h3>
          <ul>
            <li>🖥️ Vercel Serverless Functions (API Hosting)</li>
            <li>🗄️ MongoDB Atlas — Free Tier</li>
            <li>☁️ Cloudinary — Free Image Hosting</li>
            <li>🔐 JWT Auth with HttpOnly Cookies</li>
            <li>🚀 Node.js + Express.js</li>
          </ul>
        </div>

        <div class="section">
          <h3>⚠️ Usage Notice</h3>
          <p>All services run on **free plans** (Vercel, MongoDB Atlas, Cloudinary).</p>
          <p>Please upload optimized images (<strong>&lt;500KB</strong>) to avoid free-tier limits.</p>
        </div>

        <footer>
          © ${new Date().getFullYear()} MyStore API • Built with ❤️ using JavaScript & Express.js
        </footer>
      </div>
    </body>
    </html>
  `);
});

// --- server (local) vs serverless (vercel) ---
const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export const handler = serverless(app);
export default app;
