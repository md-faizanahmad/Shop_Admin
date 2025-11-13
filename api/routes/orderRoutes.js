import express from "express";
import { verifyAdminCookie } from "../middlewares/verifyAdmin.js";
import { getOrders, createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", verifyAdminCookie, getOrders);
router.post("/", createOrder);

export default router;
