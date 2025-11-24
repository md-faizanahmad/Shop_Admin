// // import express from "express";
// // import { verifyAdminCookie } from "../middlewares/verifyAdmin.js";
// // import upload from "../middlewares/upload.js";
// // import {
// //   addProduct,
// //   getProducts,
// //   updateProduct,
// //   deleteProduct,
// // } from "../controllers/productController.js";

// // const router = express.Router();

// // router.get("/", getProducts);

// // // Option A: FE uploads to Cloudinary → send imageUrl (no multer needed)
// // router.post("/", verifyAdminCookie, addProduct);

// // // Option B: FE sends multipart with "image" → backend uploads (multer memory)
// // router.post("/upload", verifyAdminCookie, upload.single("image"), addProduct);

// // router.put("/:id", verifyAdminCookie, upload.single("image"), updateProduct);
// // router.delete("/:id", verifyAdminCookie, deleteProduct);

// // export default router;
// //////////////////////new with public products routes

// import express from "express";
// import { verifyAdminCookie } from "../middlewares/verifyAdmin.js";
// import upload from "../middlewares/upload.js";
// import {
//   addProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
//   searchProducts,
// } from "../controllers/productController.js";

// const router = express.Router();

// // PUBLIC
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.get("/search", searchProducts);
// // ADMIN ONLY
// router.post("/", verifyAdminCookie, addProduct);
// router.post("/upload", verifyAdminCookie, upload.single("image"), addProduct);
// router.put("/:id", verifyAdminCookie, upload.single("image"), updateProduct);
// router.delete("/:id", verifyAdminCookie, deleteProduct);

// export default router;

////////////////////////////////////////////// updates with reviews
// routes/productRoutes.js
import express from "express";
import { verifyAdminCookie } from "../middlewares/verifyAdmin.js";
import upload from "../middlewares/upload.js";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  addReview,
} from "../controllers/productController.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

// ADMIN ROUTES
// router.post("/", verifyAdminCookie, addProduct);
// router.post("/uploads", verifyAdminCookie, upload.any(), addProduct);
// router.put("/:id", verifyAdminCookie, upload.single("image"), updateProduct);

// Add
router.post("/create", verifyAdminCookie, upload.any(), addProduct);
router.put("/:id", verifyAdminCookie, upload.any(), updateProduct);

// Delelte
router.delete("/:id", verifyAdminCookie, deleteProduct);

// USER REVIEW (protected by auth later)
router.post("/:id/review", addReview); // Add auth middleware later

export default router;
